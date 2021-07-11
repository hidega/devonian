#!/bin/sh

HTTPD_PID=`$BUSYBOX ps -A | $BUSYBOX grep 'busybox httpd -p' | $BUSYBOX grep -v 'grep' | $BUSYBOX awk '{print $1;}'`
[[ ! -z $HTTPD_PID ]] && $BUSYBOX kill -s SIGKILL $HTTPD_PID

