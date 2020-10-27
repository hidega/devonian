'use strict'

var createBuildTasks = require('@permian/build-tasks')
var oci = require('./oci')

var buildTasks = createBuildTasks({
  buildTasks: { buildTasksRoot: __dirname }
})

buildTasks.oci = oci

module.exports = buildTasks
