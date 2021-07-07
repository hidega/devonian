import support from './support'

var Constants = {
  HOST_CONTAINER_NAME: 'devonianhost',
  MOUNTED_VOLUME_ROOT: '/opt/mounted-volume',
  SERVICE_HOME: '/opt/prg/service',
  SECRET_FILE: '/opt/secret.json',
  SERVICE_EXECUTABLE: 'main.js',
  STOP_SIGNAL: 'SIGTERM',
  START_SCRIPT: 'start.sh',
  STOP_SCRIPT: 'stop.sh',
  HEALTHCHECK_SCRIPT: 'healthcheck.sh',
  START_CMD: 'start',
  STOP_CMD: 'stop',
  HEALTHCHECK_CMD: 'healthcheck'
}

export default Object.freeze(Object.assign(Constants, { support }))
