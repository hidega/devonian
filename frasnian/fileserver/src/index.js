// generated on Sun  1 Nov 13:12:26 CET 2020
'use strict'

var commons = require('@permian/commons')
var deploymentIf = require('@devonian/deploymentif')
var Service = require('@silurian/filesrv')

commons.lang.isFunction(Service[deploymentIf.START_FUNCTION]) || commons.lang.isFunction(Service[deploymentIf.HEALTHCHECK_FUNCTION]) || commons.proc.terminateProcess('Missing service method', 2) 

var cfg = {}
try {
  cfg = commons.fs.readJsonSync('./cfg.json')
} catch(e) {}

var cmd = process.argv[2]

if (cmd === deploymentIf.START_ARG) {
  Service[deploymentIf.START_FUNCTION](cfg)
} else if (cmd === deploymentIf.HEALTHCHECK_ARG) {
  Service[deploymentIf.HEALTHCHECK_FUNCTION](cfg)
} else {
  commons.proc.terminateProcess('Bad command', 1)
}

