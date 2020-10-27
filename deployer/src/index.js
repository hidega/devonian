'use strict'

var commons = require('./commons')
var checkSystem = require('./check-system')
var StorageLimitSetter = require('./storagelimit-setter')
var NetworkCreator = require('./network-creator')
var ContainerDeployer = require('./container-deployer')
var ContainerManager = require('./container-manager')
var planProvider = require('./plan-provider')
var Finalizer = require('./finalizer')
var ImageLoader = require('./image-loader')

var deploymentPlanFile = process.argv[2] || './deployment-plan.json'

var makeStep = (previousStep, Ctr, msg) => {
  console.log(msg)
  var step = new Ctr(previousStep.revert, previousStep.deploymentPlan)
  return step.apply().catch(err => step.revert(err)).catch(err => commons.terminateProcess('Could not revert changes: - ' + err))
}

module.exports = () => checkSystem()
  .catch(() => commons.terminateProcess('Unsupported platform'))
  .then(commands => planProvider(commands, deploymentPlanFile))
  .catch(err => commons.terminateProcess('Could not prepare deployment plan - ' + err))
  .then(deploymentPlan => {
    var zeroStep = {
      deploymentPlan,
      revert: err => commons.terminateProcess('An error occured and changes were reverted - ' + err)
    }
    return makeStep(zeroStep, ImageLoader, 'Host system was checked\nDeployment plan was found')
  })
  .then(imageLoader => makeStep(imageLoader, StorageLimitSetter, 'Images are loaded'))
  .then(storageLimitSetter => makeStep(storageLimitSetter, NetworkCreator, 'Storage limit is set')) 
  .then(networkCreator => makeStep(networkCreator, ContainerDeployer, 'Network is created'))
  .then(containerDeployer => makeStep(containerDeployer, ContainerManager, 'Containers are deployed'))
  .then(containerManager => makeStep(containerManager, Finalizer, 'Healthchecks are scheduled'))
  .then(() => console.log('Deployment was successful :)'))
