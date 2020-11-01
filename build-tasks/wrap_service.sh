#!/bin/bash

echo "// generated on `date`
'use strict'

var commons = require('@permian/commons')
var deploymentIf = require('@devonian/deploymentif')
var Service = require('$1')

if(commons.lang.isntFunction(Service[deploymentIf.START_FUNCTION]) || commons.lang.isntFunction(Service[deploymentIf.HEALTHCHECK_FUNCTION])) {
  commons.proc.terminateProcess('Missing service method')
}

var cfg = {}
try {
  cfg = commons.files.fsExtra.readJsonSync(commons.files.resolvePath(deploymentIf.SERVICE_HOME, 'cfg.json'))
} catch(e) {}

var cmd = process.argv[2]

if (cmd === deploymentIf.START_ARG) {
  Service[deploymentIf.START_FUNCTION](cfg)
} else if (cmd === deploymentIf.HEALTHCHECK_ARG) {
  Service[deploymentIf.HEALTHCHECK_FUNCTION](cfg, commons.proc.terminateProcess)
} else {
  commons.proc.terminateProcess('Bad command')
}
" > ./index.js
