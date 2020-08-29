'use strict'

const path = require('path')
const assert = require('assert')
const commons = require('@permian/commons')
const fs = commons.files.fsExtra
const StorageLimitSetter = require('../src/storagelimit-setter')
const ContainerDeployer = require('../src/container-deployer')
const StarterscriptCreator = require('../src/starterscript-creator') 
const Finalizer = require('../src/finalizer')

const deploymentPlan = fs.readJsonSync(path.resolve(__dirname, 'deployment-plan.json'))

const caseStoragelimit = () => { 
  const cfgFile = path.resolve(__dirname, 'storage.conf')
  deploymentPlan.storageLimit.cfgFile = cfgFile

  const cfg = `
# storage.conf is the configuration file for all tools
# that share the containers/storage libraries
# See man 5 containers-storage.conf for more information

# The "container storage" table contains all of the server options.
[storage]

# Default Storage Driver
driver = "overlay"

# Temporary storage location
runroot = "/var/run/containers/storage"

# Primary read-write location of container storage
graphroot = "/var/lib/containers/storage"

[storage.options]
# AdditionalImageStores is used to pass paths to additional read-only image stores
# Must be comma separated list.
additionalimagestores = [
]

# Size is used to set a maximum size of the container image.  Only supported by
# certain container storage drivers (currently overlay, zfs, vfs, btrfs)
size = ""

# OverrideKernelCheck tells the driver to ignore kernel checks based on kernel version
override_kernel_check = "true"
`

  return fs.remove(cfgFile)
  .then(() => fs.writeFile(cfgFile, cfg))
  .then(() => StorageLimitSetter.createInstance(assert.fail, deploymentPlan).apply())
  .then(() => console.log('StorageLimitSetter done'))
}

const caseStartscript = () => { 
  deploymentPlan.starterScript = {
    dir: __dirname,
    scriptFile: 'devonian-starter.sh'
  }
  return StarterscriptCreator.createInstance(assert.fail, deploymentPlan).apply()
  .then(() => console.log('StarterscriptCreator done'))
}

const caseContainerDeployer = () => {
  const containerDeployer = new ContainerDeployer(assert.fail, deploymentPlan)
  containerDeployer.spawnProcess = (cmd, args) => {
    console.log('CMD: ', cmd, ' ', args)
    return Promise.resolve()
  }
  return containerDeployer.apply().then(() => console.log('containerDeployer done'))
}

caseStoragelimit()
.then(() => caseStartscript())
.then(() => caseContainerDeployer())
.then(() => console.log('OK'))
.catch(console.error)
