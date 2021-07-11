var commons = require('./commons')
var parseOptions = require('./parse-options')

var createDockerfile = options => `
FROM ${options.baseImage}

COPY opt /opt

RUN ${options.runScript}
`

var createBuildScript = options => `#!/bin/bash
  mkdir ${options.buildDir}/opt ${options.buildDir}/opt/prg ${options.buildDir}/opt/data ${options.buildDir}/opt/prg/service
  cp -r ${options.serviceDir}/* ${options.buildDir}/opt/prg/service
  ` +
  (options.dataDir ? `cp -r ${options.dataDir}/* ${options.buildDir}/opt/data` : '')  +
  `
  podman ${options.podmanOpts} image rm -f ${options.imageName}
  podman ${options.podmanOpts} build -t ${options.imageName} ${options.buildDir}
  podman ${options.podmanOpts} save -o ${options.targetPath} ${options.imageName} `

var build = (opts, options = parseOptions(opts)) => commons.rmDir(options.buildDir)
  .then(() => commons.createDir(options.buildDir))
  .then(() => commons.writeFile(commons.resolvePath(options.buildDir, 'Dockerfile'), createDockerfile(options)))
  .then(() => commons.writeFile(commons.resolvePath(options.buildDir, 'build.sh'), createBuildScript(options)))
  .then(() => commons.execCmd('bash', [commons.resolvePath(options.buildDir, 'build.sh'), '>', commons.resolvePath(options.buildDir, 'build.out')]))
  //.finally(() => commons.rmDir(options.buildDir))

module.exports = { build }

