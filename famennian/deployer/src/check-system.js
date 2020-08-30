'use strict'

const commons = require('@permian/commons')
const Mixins = require('./mixins')

module.exports = () => {
  const mixins = new Mixins()
  let result
  if (commons.platform.isLinux()) {
    result = mixins.spawnProcess('podman', ['-v'])
      .then(() => mixins.spawnProcess('bash', ['--version']))
      .then(() => mixins.spawnProcess('chmod', ['--version']))
  } else {
    result = Promise.reject()
  }
  return result
}
