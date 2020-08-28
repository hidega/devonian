'use strict'

const commons = require('@permian/commons')

function StarterScriptRunner(revert, cfg) {
  const self = this

  const defaultCfg = {}

  cfg = Object.assign(defaultCfg, commons.lang.isObject(revert) ? revert : cfg)

  self.apply = () => Promise.resolve(self)

  self.revert = () => revert()
}

module.exports = Object.freeze({ createInstance: (revert, cfg) => new StarterScriptRunner(revert, cfg) })
