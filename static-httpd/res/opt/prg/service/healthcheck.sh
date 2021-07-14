#!/bin/sh

. /opt/prg/service/constants.sh

PING_RESULT=`$BUSYBOX sleep 2 | $BUSYBOX telnet $HTTP_IP $HTTP_PORT | $BUSYBOX grep -e 'Connected' | $BUSYBOX wc -l`

[ "$PING_RESULT" -eq "0" ] && exit 1

exit 0

