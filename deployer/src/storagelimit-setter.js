'use strict'

var commons = require('./commons')

function StorageLimitSetter(revert, deploymentPlan) {
  var originalCfg

  var defaultDeploymentPlan = {
    storageLimit: {
      cfgFile: '/etc/containers/storage.conf'
    }
  }

  this.deploymentPlan = Object.freeze(commons.assignRecursive(defaultDeploymentPlan, deploymentPlan))

  this.apply = () => {
    var result = this
    if (this.deploymentPlan.storageLimit.limit) {
      result = commons.fs.readFile(this.deploymentPlan.storageLimit.cfgFile)
        .then(buf => {
          originalCfg = buf.toString()
          var cfg = buf.toString().split('\n').reduce((acc, l) => l.trim().startsWith('size') ? acc : acc + l + '\n', '')
          cfg += 'size="' + this.deploymentPlan.storageLimit.limit + '"'
          return commons.fs.writeFile(this.deploymentPlan.storageLimit.cfgFile, cfg)
        })
        .then(() => this)
    }
    return result
  }

  this.revert = err => commons.when(this.deploymentPlan.storageLimit.limit)
    .then(() => commons.fs.writeFile(this.deploymentPlan.storageLimit.cfgFile, originalCfg).then(() => revert(err)))
    .otherwise(() => revert(err))
}

module.exports = StorageLimitSetter
