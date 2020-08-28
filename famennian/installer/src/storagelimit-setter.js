'use strict'

const path = require('path')
const commons = require('@permian/commons')

function StorageLimitSetter(revert, deploymentPlan) {
  const self = this

  let originalCfg

  const defaultDeploymentPlan = {
    cfgFile: path.resolve('/etc/containers/storage.conf')
  }

  deploymentPlan = Object.assign(defaultDeploymentPlan, deploymentPlan)

  self.apply = () => {
    let result = self
    if (deploymentPlan.limit) {
      result = commons.lang.files.fsExtra.readFile(deploymentPlan.cfgFile)
        .then(buf => {
          originalCfg = buf.toString()
          let cfg = buf.toString().split('\n').reduce((acc, l) => l.trim().startsWith('size') ? acc : acc + l + '\n', '')
          cfg += '\nsize=' + deploymentPlan.limit
          return commons.lang.files.fsExtra.writeFile(deploymentPlan.cfgFile, cfg)
        })
        .then(() => self)
    }
    return result
  }

  self.revert = () => commons.lang.files.fsExtra.writeFile(deploymentPlan.cfgFile, originalCfg).then(revert)
}

module.exports = Object.freeze({ createInstance: (revert, cfg) => new StorageLimitSetter(revert, cfg) })
