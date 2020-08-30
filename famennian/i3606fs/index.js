'use strict'

const FileServer = require('@silurian/filesrv')
const commons = require('@permian/commons')

commons.files.dumpPidToFile()

FileServer.start({
  restEndpoint: {
    port: 9000,
    //host: '95.140.42.5',
    urlBasePath: 'web'
  },
  fileServer: {
    basedir: __dirname + '/files'
  }
})
