'use strict'

module.exports = params => `#! /bin/sh
### BEGIN INIT INFO
# Provides:          Inistscript
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Initscript ${params.shortDescription}
### END INIT INFO

case "$1" in
  start)
       ${params.startScript}
       ;;
  stop)
       ${params.stopScript}
       ;;
  status)
       exit 0
       ;;
  kill)
       exit 0
       ;;
  restart|force-reload)
       exit 0
       ;;
  *)
       exit 3
       ;;
esac
`
