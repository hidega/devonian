'use strict'

const commons = require('@permian/commons')
const sleep = commons.lang.sleep
const Mixins = require('./mixins')

function ContainerDeployer(revert, deploymentPlan) {
  const self = this

  const delayMs = 2000

  const removeAllContainers = () => self.spawnProcess('podman', ['container', 'stop', '-a'], true)
    .then(() => self.spawnProcess('podman', ['container', 'rm', '-af'], true))

  const createRunCmd = (acc, container) => {
    let cmd = 'podman run --detach=true '
    cmd += ` --name=${container.name}`
    cmd += container.publish ? ` --publish=${container.publish.onHost}:${container.publish.onContainer}` : ''
    cmd += container.cpus ? ` --cpus=${container.cpus}` : ''
    cmd += ` --health-cmd=\"${container.healthCmd}\"`
    cmd += container.healthInterval ? ` --health-interval=${container.healthInterval}` : ''
    cmd += container.healthRetries ? ` --health-retries=${container.healthRetries}` : ''
    cmd += container.healthStartPeriod ? ` --health-start-period=${container.healthStartPeriod}` : ''
    cmd += container.healthTimeout ? ` --health-timeout=${container.healthTimeout}` : ''
    cmd += container.memory ? ` --memory=${container.memory}` : ''
    return acc + cmd + ' && '
  }

  self.apply = () => removeAllContainers()
    .then(() => sleep(delayMs))
    .then(() => {
      const runCmd = deploymentPlan.containers.reduce(createRunCmd, '')
      return self.spawnProcess('bash', ['-c', `"${runCmd + ' echo'}"`]).then(() => sleep(delayMs))
    })

  self.revert = () => removeAllContainers().then(revert)

  Mixins.call(self)
}

ContainerDeployer.createInstance = (revert, cfg) => new ContainerDeployer(revert, cfg)

module.exports = Object.freeze(ContainerDeployer)
