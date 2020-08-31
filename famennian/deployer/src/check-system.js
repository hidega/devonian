'use strict'

const Mixins = require('./mixins')

module.exports = () => {
  const mixins = new Mixins()

  const findCommand = command => mixins.spawnProcess('whereis', [command]).then(result => {
    const locations = ['/bin', '/sbin', '/usr/bin', '/usr/sbin', 'usr/local/bin', 'usr/local/sbin']
    const txt = result.output.error + result.output.info
    const location = locations.find(l => txt.includes(l + '/' + command))
    return location ? Promise.resolve([command, location + '/' + command]) : Promise.reject('Unsupported platform')
  })

  const f = (commands, r) => commands.length ? findCommand(commands.pop()).then(cmd => f(commands, (r[cmd[0]] = cmd[1]) && r)) : Promise.resolve(r)

  return f(['podman', 'bash', 'logger', 'cat', 'touch', 'mkdir', 'crontab'], {})
}
