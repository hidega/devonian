var path = require('path')
var api = require('@permian/build-tasks/api')
var imageBuilder = require('@devonian/image-builder')

var tasks = new api.BuildTasks({ workingDir: __dirname })

var MIDDLEWARE_USER = 'mwuser'
var MIDDLEWARE_USR_ID = 1060

var runScript = 
  'apk add libstdc++ libgcc openssl && ' +
  `adduser ${MIDDLEWARE_USER} -D -u ${MIDDLEWARE_USR_ID} -G root && ` +
  `chown -cR ${MIDDLEWARE_USER} /opt/prg/nodejs/ > /dev/null 2>&1
  `

var buildOptions = {
  keepTmpData: true,
  podmanOpts: '--cgroup-manager=cgroupfs',
  imageName: 'devonian/nodebase',
  optSrcDir: path.resolve(__dirname, 'opt'),
  runScript,
  baseImage: 'alpine:3.14',
  targetPath: path.resolve(__dirname, 'devonian-nodebase.img')
}

tasks.image = (params, callback) => imageBuilder.build(buildOptions).then(() => callback()).catch(e => callback(e || -1))

module.exports = tasks

