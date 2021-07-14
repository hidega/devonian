var commons = require('./commons')

module.exports = opts => {
  var options = Object.assign({}, opts)
  options.podmanOpts || (options.podmanOpts = '')
  options.imageName || commons.throwError('missing image name')
  options.runScript || commons.throwError('missing run script')
  options.baseImage || commons.throwError('missing base image name')
  options.dataDir && (options.dataDir = commons.resolvePath(options.dataDir))
  options.optSrcDir && (options.optSrcDir = commons.resolvePath(options.optSrcDir))
  options.serviceDir && (options.serviceDir = commons.resolvePath(options.serviceDir))
  options.targetPath = options.targetPath ? commons.resolvePath(options.targetPath) : commons.resolvePath(commons.tmpDir, 'image')
  options.buildDir = commons.resolvePath(commons.tmpDir, 'cb_' + parseInt(Math.random()*1000000) + '_' + Date.now())
  return options
}

