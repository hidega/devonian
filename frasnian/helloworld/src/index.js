'use strict'

var commons = require('@permian/commons')
var Service = require('@silurian/helloworld')
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

