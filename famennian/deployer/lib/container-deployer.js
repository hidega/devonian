"use strict";var commons=require("@permian/commons"),sleep=commons.lang.sleep,Mixins=require("./mixins");function ContainerDeployer(e,n){function t(){return a.spawnProcess("podman",["container","stop","-a"],!0).then(function(){return a.spawnProcess("podman",["container","rm","-af"],!0)})}function r(e,n){var t="podman run --detach=true ";return t+=" --name=".concat(n.name),t+=n.publish?" --publish=".concat(n.publish.onHost,":").concat(n.publish.onContainer):"",t+=n.cpus?" --cpus=".concat(n.cpus):"",t+=' --health-cmd="'.concat(n.healthCmd,'"'),t+=n.healthInterval?" --health-interval=".concat(n.healthInterval):"",t+=n.healthRetries?" --health-retries=".concat(n.healthRetries):"",t+=n.healthStartPeriod?" --health-start-period=".concat(n.healthStartPeriod):"",t+=n.healthTimeout?" --health-timeout=".concat(n.healthTimeout):"",e+(t+=n.memory?" --memory=".concat(n.memory):"")+" && "}var a=this;a.apply=function(){return t().then(function(){return sleep(2e3)}).then(function(){var e=n.containers.reduce(r,"");return a.spawnProcess("bash",["-c",'"'.concat(e+" echo",'"')]).then(function(){return sleep(2e3)})})},a.revert=function(){return t().then(e)},Mixins.call(a)}ContainerDeployer.createInstance=function(e,n){return new ContainerDeployer(e,n)},module.exports=Object.freeze(ContainerDeployer);