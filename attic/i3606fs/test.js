'use strict'

const FileServer = require('@silurian/filesrv')
const commons = require('@permian/commons')

commons.files.dumpPidToFile()

FileServer.start({
  restEndpoint: {
    port: 9000,
    urlBasePath: 'web'
  },
  fileServer: {
    basedir: __dirname + '/files'

  }
})
