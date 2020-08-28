'use strict'

const commons = require('@permian/commons')
const Action = require('./action')

module.exports = () => {
  const action = new Action()
  let result
  if (commons.platform.isLinux()) {
    result = action.spawnProcess('node', ['-v']).then(() => action.spawnProcess('podman'))
  } else {
    result = Promise.reject()
  }
  return result
}
