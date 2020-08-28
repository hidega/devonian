'use strict'

const path = require('path')
const commons = require('@permian/commons')

function StorageLimitSetter(revert, cfg) {
  const self = this

  const defaultCfg = {
    cfgFile: path.resolve('/etc/containers/storage.conf')
  }

  cfg = Object.assign(defaultCfg, commons.lang.isObject(revert) ? revert : cfg)

  self.apply = () => Promise.resolve(self)

  self.revert = () => revert()
}

module.exports = Object.freeze({ createInstance: (revert, cfg) => new StorageLimitSetter(revert, cfg) })
