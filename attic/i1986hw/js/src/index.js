'use strict'

const { proc } = require('@permian/commons')
const HelloWorld = require('@silurian/helloworld')
const cfg = require('./cfg')

const cmd = process.argv[2]

if (cmd === 'start') {
  HelloWorld.start(cfg, err => err && err !== '0' && proc.terminateProcess(err))
} else if (cmd === 'healthcheck') {
  HelloWorld.ping(cfg, err => proc.terminateProcess(err))
} else {
  throw Error('Bad command')
}
