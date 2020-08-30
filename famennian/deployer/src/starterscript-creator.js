'use strict'

const path = require('path')
const commons = require('@permian/commons')
const fs = commons.files.fsExtra
const createInitdScript = require('./initd-script')
const Mixins = require('./mixins')

let originalFile = false

const createScriptFile = deploymentPlan => {
  const params = {
    shortDescription: deploymentPlan.shortDescription,
    stopScript: '',
    startScript: ''
  }
  deploymentPlan.containers.forEach(container => {
    params.startScript += `podman start ${container.name} &&`
    params.stopScript += `podman stop ${container.name} &&`
  })
  params.startScript += ' exit 0'
  params.stopScript += ' exit 0'
  return createInitdScript(params)
}

function StarterScriptCreator(revert, deploymentPlan) {
  const self = this

  const defaultDeploymentPlan = {
    starterScript: {
      dir: '/etc/init.d',
      scriptFile: 'devonian-starter.sh'
    }
  }

  deploymentPlan = commons.lang.assignRecursive(defaultDeploymentPlan, deploymentPlan)

  const scriptFilePath = path.resolve(defaultDeploymentPlan.starterScript.dir, defaultDeploymentPlan.starterScript.scriptFile)

  self.apply = () => fs.readFile(scriptFilePath)
    .then(data => originalFile = data)
    .catch(() => {})
    .then(() => fs.writeFile(scriptFilePath, createScriptFile(deploymentPlan)))
    .then(() => self.spawnProcess('bash', ['-c', `chmod -c 777 ${scriptFilePath}`]))

  self.revert = err => originalFile ? fs.writeFile(scriptFilePath, originalFile).then(() => revert(err)) : revert(err)

  Mixins.call(self)
}

module.exports = StarterScriptCreator
