'use strict'

var path = require('path')
var fs = require('fs-extra')
var deploymentIf = require('@devonian/deploymentif')

var runContainer = cfg => ` chown -cR ${cfg.serviceUser} ${deploymentIf.SERVICE_HOME} && \\
   echo '${cfg.nodeBin} ${deploymentIf.SERVICE_HOME}/${cfg.serviceExecutable.split('\/').pop()} ${deploymentIf.START_ARG}' > ${deploymentIf.SERVICE_HOME}/${deploymentIf.START_CMD} && \\
   echo '${cfg.nodeBin} ${deploymentIf.SERVICE_HOME}/${cfg.serviceExecutable.split('\/').pop()} ${deploymentIf.HEALTHCHECK_ARG}' > ${deploymentIf.SERVICE_HOME}/${deploymentIf.HEALTHCHECK_CMD} && \\
   chmod -c 755 ${deploymentIf.SERVICE_HOME}/${deploymentIf.START_CMD} && \\
   chmod -c 755 ${deploymentIf.SERVICE_HOME}/${deploymentIf.HEALTHCHECK_CMD} `

var dockerfile = cfg => `# generated on ${new Date().toISOString()}

FROM ${cfg.imageFrom} 

COPY opt /opt

RUN ${runContainer(cfg)}

CMD su -s /bin/bash -c "${deploymentIf.SERVICE_HOME}/${deploymentIf.START_CMD}" ${cfg.serviceUser} && echo $? > ./start_result

${cfg.expose.reduce((acc, port) => acc + 'EXPOSE ' + port + '\n', '')}
`

var dist = cfg => `#!/bin/bash
${cfg.ociCmd} save ${cfg.imageDomain}/${cfg.imageName}:${cfg.imageTag} | gzip > ./${cfg.imageDomain}-${cfg.imageName}_${cfg.imageTag}.tar.gz && \\
echo result: $?
`

var build = cfg => `#!/bin/bash
${cfg.ociCmd} image rm -f ${cfg.imageDomain}/${cfg.imageName}:${cfg.imageTag}
${cfg.ociCmd} build -t ${cfg.imageDomain}/${cfg.imageName}:${cfg.imageTag} .
echo result $?
`
var ipFromRange = ip => ip.split('.').slice(0, 3).join('.')

var run = cfg => `#!/bin/bash
${cfg.ociCmd} container rm -af && \\
${cfg.ociCmd} network rm ${deploymentIf.NETWORK_NAME} && \\
${cfg.ociCmd} network create --subnet=${deploymentIf.NETWORK_IP} ${deploymentIf.NETWORK_NAME} && \\
${cfg.ociCmd} run --ip=${ipFromRange(deploymentIf.NETWORK_IP)}.10 --network=${deploymentIf.NETWORK_NAME} --add-host=monitor:${ipFromRange(deploymentIf.NETWORK_IP)}.11 \\
             --add-host=${cfg.imageName}:${ipFromRange(deploymentIf.NETWORK_IP)}.10 --hostname=${cfg.imageName} --name=${cfg.imageName} \\
             --detach=true ${cfg.imageDomain}/${cfg.imageName}:${cfg.imageTag} && \\
${cfg.ociCmd} run -it --ip=${ipFromRange(deploymentIf.NETWORK_IP)}.11 --network=${deploymentIf.NETWORK_NAME} --add-host=monitor:${ipFromRange(deploymentIf.NETWORK_IP)}.11 \\
             --add-host=${cfg.imageName}:${ipFromRange(deploymentIf.NETWORK_IP)}.10 --name=monitor --detach=true devonian/monitor:1 bash && \\
echo result: $?
`

var getServiceHome = () => {
  if(!deploymentIf.SERVICE_HOME.startsWith('/opt/')) {
    throw new Error('service home is expected to be in /opt')
  }
  return deploymentIf.SERVICE_HOME.substr(1)
}

var processFiles = (cfg, callback) => {
  var resolveByDest = d => path.resolve(cfg.destDir, d)
  var buildServiceHome = resolveByDest(getServiceHome()) 
  return fs.remove(cfg.destDir)
    .then(() => fs.ensureDir(cfg.destDir))
    .then(() => fs.ensureDir(buildServiceHome))
    .then(() => fs.copy(cfg.serviceExecutable, resolveByDest(getServiceHome() + '/' + cfg.serviceExecutable.split('\/').pop())))
    .then(() => fs.writeFile(resolveByDest('Dockerfile'), dockerfile(cfg)))
    .then(() => fs.writeFile(resolveByDest('build.sh'), build(cfg)))
    .then(() => fs.chmod(resolveByDest('build.sh'), 0o755))
    .then(() => fs.writeFile(resolveByDest('dist.sh'), dist(cfg)))
    .then(() => fs.chmod(resolveByDest('dist.sh'), 0o755))
    .then(() => fs.writeFile(resolveByDest('run.sh'), run(cfg)))
    .then(() => fs.chmod(resolveByDest('run.sh'), 0o755))
    .catch(e => callback(e || 2))
}

module.exports = (params, callback) => fs.readJson(params.args[0] || path.resolve('./oci-cfg.json'))
  .then(cfg => {
    cfg = Object.assign({
      imageFrom: 'devonian/nodebase:1',
      imageName: '',
      imageDomain: '',
      imageTag: '1',
      nodeBin: '/opt/prg/nodejs/bin/node',
      serviceExecutable: 'lib/index.js',
      expose: [],
      serviceUser: 'middleware', 
      destDir: 'oci-build',
      ociCmd: 'podman'
    }, cfg)
    var resolvePkgPath = p => p.startsWith('/') ? p : path.resolve(params.cwd, p) 
    cfg.destDir = resolvePkgPath(cfg.destDir)
    cfg.serviceExecutable = resolvePkgPath(cfg.serviceExecutable) 
    processFiles(cfg, callback)
  })
  .catch(e => {console.log(e);callback(e || 1)}) 

