#!/bin/bash

echo "// generated on `date`
'use strict'

var fs = require('fs')
var path = require('path')
var deploymentIf = require('@devonian/deploymentif')
var Service = require('$1')

var terminateProcess = e => {
  console.log(e ? 'ERROR: ' + e : 'OK')
  process.exit(e ? 1 : 0)
}

var isntFunction = o => typeof o !== 'function'

if(isntFunction(Service[deploymentIf.START_FUNCTION]) || isntFunction(Service[deploymentIf.HEALTHCHECK_FUNCTION])) {
  terminateProcess('Missing service method')
}

var cfg = {}

try {
  var data = fs.readFileSync(path.resolve(deploymentIf.SERVICE_HOME, 'cfg.json'))
  cfg = JSON.parse(data)
} catch(e) {}

var cmd = process.argv[2]

if (cmd === deploymentIf.START_ARG) {
  Service[deploymentIf.START_FUNCTION](cfg)
} else if (cmd === deploymentIf.HEALTHCHECK_ARG) {
  Service[deploymentIf.HEALTHCHECK_FUNCTION](cfg, terminateProcess)
} else {
  terminateProcess('Bad command')
}
" > ./index.js
