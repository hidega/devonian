'use strict'

var buildTasks = require('@permian/build-tasks')
var BuildTasks = require('@permian/build-tasks/src/build-tasks')
var oci = require('./oci')

function BuildTasksExt(p) {
  BuildTasks.call(this, p)
  this.oci = oci
}

module.exports = buildTasks({
  buildTasksCtr: BuildTasksExt,
  buildTasks: { buildTasksRoot: __dirname }
})
