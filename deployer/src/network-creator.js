'use strict'

var commons = require('./commons')

var extendDeploymentPlan = deploymentPlan => {
  deploymentPlan.network = {
    name: 'devoniannet',
    subnet: '192.168.33.0/24'
  }
  var startAddr = 10
  var hosts = deploymentPlan.containers.reduce((acc, c, i) => {
    c.network = deploymentPlan.network.name
    c.ip = deploymentPlan.network.subnet.replace('.0/', '.' + (startAddr + i) + '/')
    return acc.concat({ name: c.name, ip: c.ip })
  }, [])
  deploymentPlan.containers.forEach(c => c.hosts = (c.hosts || []).concat(hosts))
  return commons.cloneDeep(deploymentPlan)
}

function NetworkCreator(revert, deploymentPlan) {
  this.deploymentPlan = extendDeploymentPlan(deploymentPlan)
  var podman = deploymentPlan.commands.podman

  var dropNetwork = () => commons.spawnProcess(podman, [
    'network',
    'rm',
    this.deploymentPlan.network.name
  ])

  this.apply = () => commons.spawnProcess(podman, ['container', 'stop', '-a'])
    .then(() => commons.spawnProcess(podman, ['container', 'rm', '-af']))
    .then(() => dropNetwork())
    .then(() => commons.spawnProcess(podman, [
      'network',
      'create',
      '--subnet=' + this.deploymentPlan.network.subnet,
      this.deploymentPlan.network.name
    ]))
    .then(() => this)

  this.revert = err => dropNetwork().then(() => revert(err))
}

module.exports = NetworkCreator
