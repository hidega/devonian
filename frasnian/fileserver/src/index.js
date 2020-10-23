'use strict'

var commons = require('@permian/commons')
var Service = require('@silurian/filesrv')
var cfg = {}

try {
  cfg = require('../cfg')
} catch(e) {
  console.log(e)
}

var cmd = process.argv[2]

if (cmd === 'start') {
  Service.start(cfg, err => err && err !== 0 && commons.proc.terminateProcess(err))
} else if (cmd === 'healthcheck') {
  Service.ping(cfg, err => commons.proc.terminateProcess(err))
} else {
  throw Error('Bad command')
}

