'use strict'

const Mixins = require('./mixins')

function Finalizer(revert, deploymentPlan) {
  const self = this

  const textIncludesAll = (text, arr) => !arr.find(e => !text.inculdes(e))

  self.apply = () => self.spawnProcess('podman', ['container', 'ls', '-a'])
    .then(result => {
      const containerNames = deploymentPlan.containers.map(c => c.name)
      return textIncludesAll('' + result.output.info + result.output.error, containerNames) ? Promise.resolve() : Promise.reject()
    })

  self.revert = () => revert()

  Mixins.call(self)
}

module.exports = Object.freeze({ createInstance: (revert, cfg) => new Finalizer(revert, cfg) })
