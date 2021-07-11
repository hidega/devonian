var path = require('path')
var os = require('os')
var fsPromises = require('fs/promises')
var {execCmd} = require('@permian/runner')
 
var commons = { 
  tmpDir: os.tmpdir(),
  execCmd,
  cwd: process.cwd(),
  throwError: e => { throw new Error(e) },
  resolvePath: path.resolve,
  pathSeparator: path.sep,
  createDir: fsPromises.mkdir,
  writeFile: fsPromises.writeFile,
  mkDir: fsPromises.mkdir,
  rmDir: d => fsPromises.rm(d, { recursive: true, force: true })
}

module.exports = commons

