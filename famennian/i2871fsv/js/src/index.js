'use strict'

var path = require('path')
var FileServer = require('@silurian/filesrv')
var cfg = require('../cfg')

FileServer.tools.dumpPidToFile(path.resolve(__dirname, './pidfile'))

FileServer.start({
  restEndpoint: cfg,
  fileServer: {
    basedir: path.resolve(__dirname, '../files')
  }
})
