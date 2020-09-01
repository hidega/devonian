'use strict'

const path = require('path')
const webpack = require('webpack')

webpack({
  target: 'node',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'main.js'
  }
}, (err, stats) => { // Stats Object
  if (err || stats.hasErrors()) {
    console.log('ERROR ', err)
  }
  // Done processing
})