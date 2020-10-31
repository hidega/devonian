'use strict'

var commons = require('./commons')

module.exports = (commands, deploymentPlanFile) => commons.fs.readJson(deploymentPlanFile)
  .then(deploymentPlan => {
    deploymentPlan = Object.assign(deploymentPlan, { commands })
    deploymentPlan.dir = commons.dirname(commons.resolvePath(deploymentPlanFile))
    deploymentPlan.podmanOpts && (deploymentPlan.commands.podman += ' ' + deploymentPlan.podmanOpts)
    deploymentPlan.configDir = deploymentPlan.configDir || '/etc/devonian-containers'
    deploymentPlan.hasOwnProperty('id') || (deploymentPlan.id = commons.uuid())
    return deploymentPlan
  })
