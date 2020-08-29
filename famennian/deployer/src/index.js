'use strict'

const commons = require('@permian/commons')
const checkSystem = require('./check-system')
const StorageLimitSetter = require('./storagelimit-setter')
const StarterscriptCreator = require('./starterscript-creator')
const ContainerDeployer = require('./container-deployer')
const Finalizer = require('./finalizer')

const deploymentPlanFile = process.argv[2] || './deployment-plan.json'

let deploymentPlan

const exit = () => commons.proc.terminateProcess('An error occured and changes were reverted')

checkSystem()
  .catch(() => commons.proc.terminateProcess('Unsupported platform'))
  .then(() => commons.files.fsExtra.readJson(deploymentPlanFile))
  .catch(() => commons.proc.terminateProcess('Deployment plan was not found: ' + deploymentPlan))
  .then(p => {
    deploymentPlan = p
    return StorageLimitSetter.createInstance(exit, deploymentPlan).apply()
  })
  .catch(storageLimitSetter => storageLimitSetter.revert())
  .then(storageLimitSetter => StarterscriptCreator.createInstance(storageLimitSetter.revert, deploymentPlan).apply())
  .catch(starterscriptCreator => starterscriptCreator.revert())
  .then(starterscriptCreator => ContainerDeployer.createInstance(starterscriptCreator.revert, deploymentPlan).apply())
  .catch(containerDeployer => containerDeployer.revert())
  .then(containerDeployer => Finalizer.createInstance(containerDeployer.revert, deploymentPlan).apply())
  .catch(finalizer => finalizer.revert())
  .catch(err => commons.proc.terminateProcess('Could not revert changes:\n' + err))
  .then(() => console.log('Deployment was successful :)'))
