'use strict'

var path = require('path')
var fs = require('fs-extra')
var deploymentIf = require('@devonian/deploymentif')

var timestamp = `# generated on ${new Date().toISOString()}\n`

var runContainer = cfg => ` echo '${cfg.nodeBin} ${deploymentIf.SERVICE_HOME}/${cfg.serviceExecutable.split('\/').pop()} ${deploymentIf.START_ARG}' > ${deploymentIf.SERVICE_HOME}/${deploymentIf.START_CMD} && \\
   echo '${cfg.nodeBin} ${deploymentIf.SERVICE_HOME}/${cfg.serviceExecutable.split('\/').pop()} ${deploymentIf.HEALTHCHECK_ARG}' > ${deploymentIf.SERVICE_HOME}/${deploymentIf.HEALTHCHECK_CMD} && \\
   chmod -c 755 ${deploymentIf.SERVICE_HOME}/${deploymentIf.START_CMD} && \\
   chmod -c 755 ${deploymentIf.SERVICE_HOME}/${deploymentIf.HEALTHCHECK_CMD} && \\
   chown -cR ${cfg.serviceUser} ${deploymentIf.SERVICE_HOME}/ `

var dockerfile = cfg => `${timestamp}

FROM ${cfg.imageFrom} 

COPY opt /opt

RUN ${runContainer(cfg)}

CMD su -s /bin/bash -c "cd ${deploymentIf.SERVICE_HOME} && ${deploymentIf.SERVICE_HOME}/${deploymentIf.START_CMD} && echo $? > ${deploymentIf.SERVICE_HOME}/start_result" ${cfg.serviceUser} 

${cfg.expose.reduce((acc, port) => acc + 'EXPOSE ' + port + '\n', '')}
`

var dist = cfg => `#!/bin/bash
${timestamp}
${cfg.ociCmd} save ${cfg.imageDomain}/${cfg.imageName}:${cfg.imageTag} | gzip > ./${cfg.imageDomain}-${cfg.imageName}_${cfg.imageTag}.tar.gz && \\
echo result: $?
`

var build = cfg => `#!/bin/bash
${timestamp}
${cfg.ociCmd} image rm -f ${cfg.imageDomain}/${cfg.imageName}:${cfg.imageTag}
${cfg.ociCmd} build -t ${cfg.imageDomain}/${cfg.imageName}:${cfg.imageTag} .
echo result $?
`
var ipFromRange = ip => ip.split('.').slice(0, 3).join('.')

var run = cfg => `#!/bin/bash
${timestamp}
${cfg.ociCmd} container rm -af && \\
${cfg.ociCmd} network rm ${deploymentIf.NETWORK_NAME} && \\
${cfg.ociCmd} network create --subnet=${deploymentIf.NETWORK_IP} ${deploymentIf.NETWORK_NAME} && \\
${cfg.ociCmd} run --ip=${ipFromRange(deploymentIf.NETWORK_IP)}.10 --network=${deploymentIf.NETWORK_NAME} --add-host=monitor:${ipFromRange(deploymentIf.NETWORK_IP)}.11 \\
             --add-host=${cfg.imageName}:${ipFromRange(deploymentIf.NETWORK_IP)}.10 --hostname=${cfg.imageName} --name=${cfg.imageName} \\
             --detach=true ${cfg.imageDomain}/${cfg.imageName}:${cfg.imageTag} && \\
${cfg.ociCmd} run -it --ip=${ipFromRange(deploymentIf.NETWORK_IP)}.11 --network=${deploymentIf.NETWORK_NAME} --add-host=monitor:${ipFromRange(deploymentIf.NETWORK_IP)}.11 \\
             --add-host=${cfg.imageName}:${ipFromRange(deploymentIf.NETWORK_IP)}.10 --name=monitor --detach=true frasnian/monitor:1 bash && \\
echo result: $?
`

var getServiceHome = () => deploymentIf.SERVICE_HOME.substr(1)

var processFiles = (cfg, callback) => {
  var resolveByDest = d => path.resolve(cfg.destDir, d)
  var buildServiceHome = resolveByDest(getServiceHome()) 
  var resourcesDir = path.resolve(buildServiceHome, deploymentIf.SERVICE_RESOURCES_DIR)
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
    .then(() => cfg.resourcesDir && fs.ensureDir(resourcesDir).then(() => fs.copy(path.resolve(cfg.resourcesDir), resourcesDir)))
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
      resourcesDir: false,
      ociCmd: 'podman'
    }, cfg)
    var resolvePkgPath = p => p.startsWith('/') ? p : path.resolve(params.cwd, p) 
    cfg.destDir = resolvePkgPath(cfg.destDir)
    cfg.serviceExecutable = resolvePkgPath(cfg.serviceExecutable)
    processFiles(cfg, callback)
  })
  .catch(e => callback(e || 1)) 

