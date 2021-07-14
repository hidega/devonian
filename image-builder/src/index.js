var commons = require('./commons')
var parseOptions = require('./parse-options')

var createDockerfile = options => `
FROM ${options.baseImage}

COPY opt /opt

RUN ${options.runScript}
`

var createBuildScript = options => `#!/bin/bash
  mkdir -p ${options.buildDir}/opt\n` +
  (options.optSrcDir ? `cp -r ${options.optSrcDir}/* ${options.buildDir}/opt` : '') + `
  mkdir -p ${options.buildDir}/opt/data ${options.buildDir}/opt/prg/service\n` +
  (options.serviceDir ? `cp -r ${options.serviceDir}/* ${options.buildDir}/opt/prg/service\n` : '') +
  (options.dataDir ? `cp -r ${options.dataDir}/* ${options.buildDir}/opt/data` : '')  + `
  podman ${options.podmanOpts} image rm -f ${options.imageName}
  podman ${options.podmanOpts} build -t ${options.imageName} ${options.buildDir}
  rm -f ${options.targetPath}
  podman ${options.podmanOpts} save -o ${options.targetPath} ${options.imageName} `

var build = opts => {
  var options = parseOptions(opts)
  var resolveInBuildDir = path => commons.resolvePath(options.buildDir, path)
  return commons.rmDir(options.buildDir)
    .then(() => commons.createDir(options.buildDir))
    .then(() => commons.writeFile(resolveInBuildDir('Dockerfile'), createDockerfile(options)))
    .then(() => commons.writeFile(resolveInBuildDir('build.sh'), createBuildScript(options)))
    .then(() => commons.execCmd('bash', [resolveInBuildDir('build.sh'), '>', resolveInBuildDir('build.out')]))
    .finally(() => options.keepTmpData ? Promise.resolve() : commons.rmDir(options.buildDir).catch(console.error))
  }

module.exports = { build }
