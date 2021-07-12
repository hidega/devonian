var path = require('path')
var api = require('@permian/build-tasks/api')
var imageBuilder = require('@devonian/image-builder')

var tasks = new api.BuildTasks({ workingDir: __dirname })

var MIDDLEWARE_USER = 'mwuser'
var MIDDLEWARE_USR_ID = 1060

var runScript = 
  `adduser ${MIDDLEWARE_USER} -D -u ${MIDDLEWARE_USR_ID} -G root && ` +
  `chown -cfR ${MIDDLEWARE_USER} /opt/data > /dev/null 2>&1 && ` +
  `chown -cfR ${MIDDLEWARE_USER} /opt/prg > /dev/null 2>&1 && ` +
  `chmod -cfR 755 /opt/prg/service/
  `

var buildOptions = {
  keepTmpData: true,
  podmanOpts: '--cgroup-manager=cgroupfs',
  imageName: 'devonian/static-httpd',
  serviceDir: path.resolve(__dirname, 'res', 'opt', 'prg', 'service'),
  dataDir,
  runScript,
  baseImage: 'alpine:3.14',
  targetPath: path.resolve(__dirname, 'devonian-static-httpd.img')
}

tasks.image = (params, callback) => imageBuilder.build(buildOptions).then(() => callback()).catch(e => callback(e || -1))

module.exports = tasks

