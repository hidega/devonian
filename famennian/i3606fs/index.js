'use strict'

const FileServer = require('@silurian/filesrv')

FileServer.start({
  restEndpoint: {
    urlBasePath: 'web',
    logToStdout: false
  },
  fileServer: {
    basedir: __dirname + '/files'
  }
})
