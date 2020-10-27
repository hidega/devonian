'use strict'

var path = require('path')
var fs = require('fs-extra')

var optPrg = '/opt/prg'

var startCmd = cfg => cfg.packages.map(p => `cd ${optPrg}/${p.name}/package && ./start.sh && echo $? > ./start_result`).join(' && ')

var runContainer = cfg => cfg.packages.reduce((acc, p) => `${acc}    cd ${optPrg}/${p.name} && \\
    wget ${p.uri} && \\
    tar -xf ${p.pkgFile} && \\
    cp ${optPrg}/${p.name}/cfg.json ${optPrg}/${p.name}/package && \\
    chown -cR middleware ${optPrg}/${p.name}/ > /dev/null 2>&1 && \\
`, 'echo && \\\n') + (cfg.runPlus ? `    ${cfg.runPlus}\n` : '    echo\n')

var dockerfile = cfg => `# generated on ${new Date().toISOString()}

FROM ${cfg.imageFrom} 

${cfg.optDir ? 'COPY opt /opt' : ''}

RUN ${runContainer(cfg)}

CMD su -s /bin/bash -c "${startCmd(cfg)}" middleware 

${cfg.expose.reduce((acc, port) => `${acc}EXPOSE ${port}\n`, '')}
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

var run = cfg => `#!/bin/bash
${cfg.ociCmd} container rm -af && \\
${cfg.ociCmd} network rm devoniannet && \\
${cfg.ociCmd} network create --subnet=192.168.33.0/24 devoniannet && \\
${cfg.ociCmd} run --ip=192.168.33.10 --network=devoniannet --add-host=monitor:192.168.33.11 --add-host=${cfg.imageName}:192.168.33.10 --hostname=${cfg.imageName} --name=${cfg.imageName} --detach=true ${cfg.imageDomain}/${cfg.imageName}:${cfg.imageTag} && \\
${cfg.ociCmd} run -it --ip=192.168.33.11 --network=devoniannet --add-host=monitor:192.168.33.11 --add-host=${cfg.imageName}:192.168.33.10 --name=monitor --detach=true hidand/monitor:1 bash && \\
echo result: $?
`

var createPkgDirs = cfg => Promise.all(cfg.packages.map(p => fs.ensureDir(path.resolve(cfg.destDir, 'opt', 'prg', p.name))
  .then(() => fs.writeJson(path.resolve(cfg.destDir, 'opt', 'prg', p.name, 'cfg.json'), p.addCfg || {}))))

var processFiles = (cfg, callback) => fs.remove(cfg.destDir)
  .then(() => fs.ensureDir(cfg.destDir))
  .then(() => cfg.optDir && fs.ensureDir(path.resolve(cfg.destDir, 'opt')).then(() => fs.copy(cfg.optDir, path.resolve(cfg.destDir, 'opt'))))
  .then(() => createPkgDirs(cfg))
  .then(() => fs.writeFile(path.resolve(cfg.destDir, 'Dockerfile'), dockerfile(cfg)))
  .then(() => fs.writeFile(path.resolve(cfg.destDir, 'build.sh'), build(cfg)))
  .then(() => fs.chmod(path.resolve(cfg.destDir, 'build.sh'), 0o755))
  .then(() => fs.writeFile(path.resolve(cfg.destDir, 'dist.sh'), dist(cfg)))
  .then(() => fs.chmod(path.resolve(cfg.destDir, 'dist.sh'), 0o755))
  .then(() => fs.writeFile(path.resolve(cfg.destDir, 'run.sh'), run(cfg)))
  .then(() => fs.chmod(path.resolve(cfg.destDir, 'run.sh'), 0o755))
  .catch(e => callback(e || 2))

var oci = (cfg, callback) => {
  cfg = Object.assign({
    imageFrom: 'devonian/nodebase:1',
    imageName: '',
    imageDomain: 'devonian',
    imageTag: '1',
    packages: [],
    expose: [],
    optDir: false,
    destDir: '/tmp/oci',
    ociCmd: 'podman'
  }, cfg)
  cfg.destDir = path.resolve(cfg.destDir)
  cfg.packages.length ? processFiles(cfg, callback) : callback()
}

module.exports = (params, callback) => fs.readJson(params.args[0] || path.resolve('./oci-cfg.json'))
  .then(cfg => oci(cfg, callback))
  .catch(e => callback(e || 1))

