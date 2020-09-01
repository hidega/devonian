#!/bin/bash

SCRIPT=$(readlink -f "$0")
DIR=$(dirname "$SCRIPT")

nohup /opt/prg/nodejs/bin/node $DIR/lib/main.js > /dev/null 2>&1 &

/usr/bin/logger Fileserver was restarted by $(whoami)

