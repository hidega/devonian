var support = module.require('./support')

var Constants = {
  MOUNTED_VOLUME_ROOT: '/opt/data/mounted-volume',
  SERVICE_HOME: '/opt/prg/service',
  SERVICE_EXECUTABLE: 'main.js',
  STOP_SIGNAL: 'SIGTERM',
  START_SCRIPT: 'start.sh',
  STOP_SCRIPT: 'stop.sh',
  HEALTHCHECK_SCRIPT: 'healthcheck.sh',
  START_CMD: 'start',
  STOP_CMD: 'stop',
  HEALTHCHECK_CMD: 'healthcheck'
}

module.exports = Object.freeze(Object.assign(Constants, { support }))
