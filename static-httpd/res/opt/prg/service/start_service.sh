#!/bin/sh

. /opt/prg/service/constants.sh

$BUSYBOX su - $MIDDLEWARE_USER -c "$BUSYBOX httpd -p $HTTP_IP:$HTTP_PORT -h $DATA_DIR >/dev/null 2>&1 &"

touch $HOME_DIR/restarted


