#!/bin/bash

echo "// generated on `date`
'use strict'

var commons = require('@permian/commons')
var deploymentIf = require('@devonian/deploymentif')
var Service = require('$1')

commons.lang.isFunction(Service[deploymentIf.START_FUNCTION]) || commons.lang.isFunction(Service[deploymentIf.HEALTHCHECK_FUNCTION]) || commons.proc.terminateProcess('Missing service method', 2) 

var cfg = {}
try {
  cfg = commons.files.fsExtra.readJsonSync(commons.files.resolvePath(deploymentIf.SERVICE_HOME, 'cfg.json'))
} catch(e) {}

var cmd = process.argv[2]

if (cmd === deploymentIf.START_ARG) {
  Service[deploymentIf.START_FUNCTION](cfg)
} else if (cmd === deploymentIf.HEALTHCHECK_ARG) {
  Service[deploymentIf.HEALTHCHECK_FUNCTION](cfg)
} else {
  commons.proc.terminateProcess('Bad command', 1)
}
" > ./index.js
