#!/bin/bash

SERVICE=$1

echo '#/bin/bash 
DIR="$(dirname "$(readlink -f "$0")")"
node $DIR start
' > ./start.sh && \
chmod -c 755 start.sh && \
echo '#/bin/bash 
DIR="$(dirname "$(readlink -f "$0")")"
echo `date` > $DIR/last_healthcheck
node $DIR healthcheck
' > ./healthcheck.sh && \
chmod -c 755 healthcheck.sh && \
echo '"use strict"; module.exports = require("./lib/index.js");' > ./index.js && \
echo "'use strict'

var commons = require('@permian/commons')
var Service = require('$SERVICE')
var cfg = {}

try {
  cfg = commons.files.fsExtra.readJsonSync(commons.files.resolvePath(commons.files.packageRoot, 'cfg.json'))
} catch(e) { 
  console.log(e) 
}  

var cmd = process.argv[2]

if (cmd === 'start') {
  Service.start(cfg, err => err && err !== '0' && commons.proc.terminateProcess(err))
} else if (cmd === 'healthcheck') {
  Service.ping(cfg, err => commons.proc.terminateProcess(err))
} else {
  throw Error('Bad command')
}
" > ./src/index.js

