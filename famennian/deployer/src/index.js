'use strict'

const commons = require('@permian/commons')
const checkSystem = require('./check-system')
const StorageLimitSetter = require('./storagelimit-setter')
const StarterscriptCreator = require('./starterscript-creator')
const ContainerDeployer = require('./container-deployer')
const ContainerManager = require('./container-manager')
const Finalizer = require('./finalizer')

const deploymentPlanFile = process.argv[2] || './deployment-plan.json'

let storageLimitSetter
let starterscriptCreator
let containerDeployer
let containerManager
let finalizer

const exit = err => commons.proc.terminateProcess('An error occured and changes were reverted - ' + err)

const terminate = err => commons.proc.terminateProcess('Could not revert changes: - ' + err)

checkSystem()
  .catch(() => commons.proc.terminateProcess('Unsupported platform'))
  .then(commands => commons.files.fsExtra.readJson(deploymentPlanFile).then(deploymentPlan => Object.assign(deploymentPlan, { commands })))
  .catch(() => commons.proc.terminateProcess('Deployment plan was not found: ' + deploymentPlanFile))
  .then(deploymentPlan => {
    deploymentPlan.configDir = deploymentPlan.configDir || '/etc/devonian-containers'
    console.log('Host system checked\nDeployment plan was found')
    storageLimitSetter = new StorageLimitSetter(exit, deploymentPlan)
    starterscriptCreator = new StarterscriptCreator(storageLimitSetter.revert, deploymentPlan)
    containerDeployer = new ContainerDeployer(starterscriptCreator.revert, deploymentPlan)
    containerManager = new ContainerManager(containerDeployer.revert, deploymentPlan)
    finalizer = new Finalizer(containerManager.revert, deploymentPlan)
    return storageLimitSetter.apply()
  })
  .then(() => console.log('Storage limit is set'))
  .catch(err => storageLimitSetter.revert(err)).catch(terminate)
  .then(() => starterscriptCreator.apply())
  .then(() => console.log('Starter script is created'))
  .catch(err => starterscriptCreator.revert(err)).catch(terminate)
  .then(() => containerDeployer.apply())
  .then(() => console.log('Containers are deployed'))
  .catch(err => containerDeployer.revert(err)).catch(terminate)
  .then(() => containerManager.apply())
  .then(() => console.log('Healthchecks are scheduled'))
  .catch(err => containerManager.revert(err)).catch(terminate)
  .then(() => finalizer.apply())
  .catch(err => finalizer.revert(err)).catch(terminate)
  .then(() => console.log('Deployment was successful :)'))
