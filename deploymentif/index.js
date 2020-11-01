'use strict'

module.exports = Object.freeze({
  SECRET_ENV: 'DEVONIAN_SECRET',
  SERVICE_HOME: '/opt/prg/service',
  CONFIG_FILE: 'cfg.json',
  START_ARG: 'start',
  START_FUNCTION: 'start',
  HEALTHCHECK_FUNCTION: 'ping',
  HEALTHCHECK_ARG: 'healthcheck',
  STOP_SIGNAL: 'SIGTERM',
  START_CMD: 'start.sh',
  HEALTHCHECK_CMD: 'healthcheck.sh',
  NETWORK_IP: '192.168.33.0/24',
  NETWORK_NAME: 'devoniannet'
})
