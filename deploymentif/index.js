'use strict'

module.exports = Object.freeze({
  SECRET_ENV: 'DEVONIAN_SECRET',
  SERVICE_HOME: '/opt/prg/service',
  CONFIG_FILE: 'cfg.json',
  STOP_SIGNAL: 'SIGTERM',
  START_CMD: 'start.sh',
  HEALTHCHECK_CMD: 'healthcheck.sh',
  NETWORK_IP: '192.168.33.0/24',
  NETWORK_NAME: 'devoniannet'
})
