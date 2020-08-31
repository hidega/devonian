#!/bin/bash

nohup /opt/prg/nodejs/bin/node /home/andras/filesrv/package/index.js > /dev/null 2>&1 &

/usr/bin/logger Fileserver was restarted by $(whoami)

