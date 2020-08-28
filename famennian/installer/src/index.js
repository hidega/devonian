'use strict'

const commons = require('@permian/commons')
const AutostartSetter = require('./autostart-setter')
const StorageLimitSetter = require('./storagelimit-setter')
const StarterscriptCreator = require('./starterscript-creator')
const StarterscriptRunner = require('./starterscript-runner')
const Finalizer = require('./finalizer')

const cfgFile = process.argv[3]
const deploymentPlan = process.argv[2] || './deployment-plan.json'
const defaultCfg = {}

const exit = () => commons.proc.terminateProcess('An error occured and changes were reverted')

commons.files.fsExtra.readJson(deploymentPlan)
  .catch(() => commons.proc.terminateProcess('deployment plan was not found: ' + deploymentPlan))
  .then(() => commons.files.fsExtra.readJson(cfgFile))
  .then(cfg => Object.assign(defaultCfg, cfg))
  .catch(() => defaultCfg)
  .then(cfg => AutostartSetter.createInstance(exit).apply())
  .catch(autostartSetter => autostartSetter.revert())
  .then(autostartSetter => StorageLimitSetter.createInstance(autostartSetter.revert).apply())
  .catch(storageLimitSetter => storageLimitSetter.revert())
  .then(storageLimitSetter => StarterscriptCreator.createInstance(storageLimitSetter.revert).apply())
  .catch(starterscriptCreator => starterscriptCreator.revert())
  .then(starterscriptCreator => StarterscriptRunner.createInstance(starterscriptCreator.revert).apply())
  .catch(starterscriptRunner => starterscriptRunner.revert())
  .then(starterscriptRunner => Finalizer.createInstance(starterscriptRunner.revert).apply())
  .catch(finalizer => finalizer.revert())
  .catch(err => commons.proc.terminateProcess('could not revert changes:\n' + err))
  .then(() => console.log('Deployment was successful :)'))
