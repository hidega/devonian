'use strict'

var { proc } = require('@permian/commons')
var HelloWorld = require('@silurian/helloworld')
var cfg = require('./cfg')

var cmd = process.argv[2]

if (cmd === 'start') {
  HelloWorld.start(cfg, err => err && err !== '0' && proc.terminateProcess(err))
} else if (cmd === 'healthcheck') {
  HelloWorld.ping(cfg, err => proc.terminateProcess(err))
} else {
  throw Error('Bad command')
}
