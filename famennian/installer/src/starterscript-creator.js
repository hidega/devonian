'use strict'

const commons = require('@permian/commons')

function StarterScriptCreator(revert, cfg) {
  const self = this

  const defaultCfg = {}

  cfg = Object.assign(defaultCfg, commons.lang.isObject(revert) ? revert : cfg)

  self.apply = () => Promise.resolve(self)

  self.revert = () => revert()
}

module.exports = Object.freeze({ createInstance: (revert, cfg) => new StarterScriptCreator(revert, cfg) })
