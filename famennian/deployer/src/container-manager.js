'use strict'

const path = require('path')
const commons = require('@permian/commons')
const fs = commons.files.fsExtra
const Mixins = require('./mixins')
const createHealthCheckScript = require('./healthcheck-script')

function ContainerManager(revert, deploymentPlan) {
  const self = this

  const defaultDeploymentPlan = {
    manager: {
      unhealthyActionFile: 'action_if_unhealthy',
      healthcheckPeriodMins: 2,
      crontabFile: '/etc/crontab'
    }
  }

  deploymentPlan = commons.lang.assignRecursive(defaultDeploymentPlan, deploymentPlan)
  const healthCheckScriptFile = path.resolve(deploymentPlan.configDir, 'healthcheck.sh')
  const unhealthyActionFile = path.resolve(deploymentPlan.configDir, deploymentPlan.manager.unhealthyActionFile)
  const healthCheckScript = createHealthCheckScript({
    unhealthyActionFile,
    containers: deploymentPlan.containers
  })

  let originalCrontab

  self.apply = () => fs.ensureDir(deploymentPlan.configDir)
    .then(() => fs.pathExists(unhealthyActionFile))
    .then(exists => exists ? Promise.resolve() : fs.writeFile(unhealthyActionFile, 'RESTART'))
    .then(data => fs.writeFile(healthCheckScriptFile, healthCheckScript))
    .then(() => self.spawnProcess('chmod', ['-c', '755', healthCheckScriptFile]))
    .then(() => fs.readFile(deploymentPlan.manager.crontabFile))
    .then(data => {
      const arr = data.toString().split('\n').filter(l => !l.includes(healthCheckScriptFile))
      arr.push(`${deploymentPlan.manager.healthcheckPeriodMins.toString().padStart(2, '0')} * * * * root ${healthCheckScriptFile} > /dev/null 2>&1`)
      return arr.join('\n')
    })
    .then(data => fs.writeFile(deploymentPlan.manager.crontabFile, data))

  self.revert = err => fs.writeFile(deploymentPlan.manager.crontabFile, originalCrontab).then(() => revert(err))

  Mixins.call(self)
}

module.exports = ContainerManager
