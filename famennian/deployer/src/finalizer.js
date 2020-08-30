'use strict'

const Mixins = require('./mixins')

function Finalizer(revert, deploymentPlan) {
  const self = this

  const textIncludesAll = (text, arr) => !arr.find(e => !text.includes(e))

  self.apply = () =>
    self.spawnProcess('update-rc.d', ['devonian-starter.sh', 'defaults'], true)
    .then(() => self.spawnProcess('podman', ['container', 'ls', '-a']))
    .then(result => {
      const containerNames = deploymentPlan.containers.map(c => c.name)
      return textIncludesAll('' + result.output.info + result.output.error, containerNames) ? Promise.resolve(self) : Promise.reject(self)
    })

  self.revert = err => revert(err)

  Mixins.call(self)
}

module.exports = Finalizer
