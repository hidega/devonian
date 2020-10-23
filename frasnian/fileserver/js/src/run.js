'use strict'

var commons = require('@permian/commons')
var FileServer = require('@silurian/filesrv')
var defaultCfg = require('./cfg')

module.exports = (basedir, cfg, pidDir) => {
  var params = {
    restEndpoint: cfg || defaultCfg,
    fileServer: {
      basedir: basedir || commons.files.resolvePath.resolve(__dirname, '../files')
    }
  }

  var cmd = process.argv[2]

  if (cmd === 'start') {
    FileServer.start(params, () => FileServer.tools.dumpPidToFile(commons.files.resolvePath(pidDir || __dirname, './pidfile')))
  } else if (cmd === 'healthcheck') {
    FileServer.healthcheck(params, err => commons.proc.terminateProcess(err))
  } else {
    console.log('Bad command')
    commons.proc.terminateProcess(-1)
  }
}
