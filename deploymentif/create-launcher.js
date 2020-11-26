'use strict'

var fs = require('fs')
var path = require('path')

var terminateProcess = e => {
  console.log(e ? 'ERROR: ' + e : 'OK')
  process.exit(e ? 1 : 0)
}

var isntFunction = o => typeof o !== 'function'

module.exports = deploymentIf => Service => {
  var configFile = path.resolve(deploymentIf.SERVICE_HOME, deploymentIf.CONFIG_FILE)
  var secretFile = path.resolve(deploymentIf.SERVICE_HOME, deploymentIf.SECRET_FILE)

  var startService = cfg => fs.readFile(secretFile, (err, data) => {
    cfg[deploymentIf.SECRET_FIELD] = err ? '' : data.toString() 
    Service[deploymentIf.START_FUNCTION](cfg)
    fs.rm(secretFile, { force: true })
  })

  if (isntFunction(Service[deploymentIf.START_FUNCTION]) || isntFunction(Service[deploymentIf.HEALTHCHECK_FUNCTION])) {
    terminateProcess('Missing service method')
  }

  fs.readFile(configFile, (err, data) => {
    var cfg = {}
    try {
      cfg = err ? {} : JSON.parse(data.toString())
    } catch(e) {}
    var cmd = process.argv[2]
    if (cmd === deploymentIf.START_ARG) {
      startService(cfg)
    } else if (cmd === deploymentIf.HEALTHCHECK_ARG) {
      Service[deploymentIf.HEALTHCHECK_FUNCTION](cfg, terminateProcess)
    } else {
      terminateProcess('Bad command')
    }  
  })
}

