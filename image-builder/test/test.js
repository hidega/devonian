var imageBuilder = require('..')

imageBuilder.build({
  imageName: 'teststuff:1',
  podmanOpts: ' --cgroup-manager=cgroupfs',
  runScript: 'touch /opt/tempfile',
  baseImage: 'busybox:1.33.1',
  dataDir: './data',
  serviceDir: './service',
  targetPath: './teststuff_image'
}).then(() => console.log('OK')).catch(e => console.error(e))

