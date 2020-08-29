'use strict'

const commons = require('@permian/commons')
const fs = commons.files.fsExtra

function StorageLimitSetter(revert, deploymentPlan) {
  const self = this

  let originalCfg

  const defaultDeploymentPlan = {
    storageLimit: {
      cfgFile: '/etc/containers/storage.conf'
    }
  }

  deploymentPlan = commons.lang.assignRecursive(defaultDeploymentPlan, deploymentPlan)

  self.apply = () => {
    let result = self
    if (deploymentPlan.limit) {
      result = fs.readFile(deploymentPlan.storageLimit.cfgFile)
        .then(buf => {
          originalCfg = buf.toString()
          let cfg = buf.toString().split('\n').reduce((acc, l) => l.trim().startsWith('size') ? acc : acc + l + '\n', '')
          cfg += '\nsize="' + deploymentPlan.limit + '"'
          return fs.writeFile(deploymentPlan.storageLimit.cfgFile, cfg)
        })
        .then(() => self)
    }
    return result
  }

  self.revert = () => fs.writeFile(deploymentPlan.storageLimit.cfgFile, originalCfg).then(revert)
}

module.exports = Object.freeze({ createInstance: (revert, cfg) => new StorageLimitSetter(revert, cfg) })
