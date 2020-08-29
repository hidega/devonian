'use strict'

const commons = require('@permian/commons')

function Mixins() {
  const self = this

  const timeoutMs = 120000
  const isUbuntu = commons.platform.isUbuntu()
  const isRedhat = commons.platform.isRedhat()

  self.spawnProcess = (cmd, args, ignoreRetval) => {
    const toHandle = setTimeout(() => commons.lang.throwError(cmd + ' timeout'), timeoutMs)
    return commons.proc.spawnProcess(cmd, args).then(result => {
      clearTimeout(toHandle)
      return (result.code === 0) || ignoreRetval ? result : Promise.reject(cmd + ':' + result.code)
    })
  }

  self.isUbuntu = () => isUbuntu

  self.isRedhat = () => isRedhat
}

module.exports = Mixins
