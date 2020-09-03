'use strict'

const path = require('path')

module.exports = params => {
  const appDir = '/opt/prg/mariadb'
  const prgDir = appDir + '/prg'
  const dataDir = '/opt/data/mariadb'
  const certDir = appDir + '/cert'
  const cfg = {
    host: '127.0.0.1',
    port: '13306',
    serverHostname: 'localhost',
    dataDir,
    prgDir,
    configFilePath: path.resolve(prgDir, 'etc', 'mariadb.cnf'),
    appBinDir: path.resolve(prgDir, 'bin'),
    pidFilePath: path.resolve(dataDir, 'server.pid'),
    uid: params.uid,
    gid: params.gid,
    superuserName: 'root', // NE legyen mas!
    superuserPwd: params.rootpwd,
    log: {
      dir: dataDir,
      binlogExpireLogsSeconds: 2592000,
      errorLogfile: 'mariadb_error.log',
      logErrorVerbosity: 3,
      logBin: 'OFF',
      generalLogFile: 'mariadb_general.log',
      logOutput: 1
    },
    ssl: {
      serverCaFile: path.resolve(certDir, 'ca-cert.pem'),
      serverCertFile: path.resolve(certDir, 'server-cert.pem'),
      serverKeyFile: path.resolve(certDir, 'server-key.pem')
    },
    healthcheck: {
      database: 'test'
    },
    allowedClientHosts: []
  }
  return cfg
}
