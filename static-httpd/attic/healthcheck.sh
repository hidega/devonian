#!/bin/sh

. /opt/prg/service/constants.sh

PING_RESULT=`$BUSYBOX sleep 2 | $BUSYBOX telnet $HTTP_IP $HTTP_PORT | $BUSYBOX grep -e 'Connected' | $BUSYBOX wc -l`

if [ "$PING_RESULT" -eq "0" ]; then
  $HOME_DIR/stop.sh
  $BUSYBOX sleep 2
  $HOME_DIR/start_httpd.sh
fi

