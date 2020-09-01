'use strict'

const path = require('path')

module.exports = {
  target: 'node',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'main.js'
  }
}