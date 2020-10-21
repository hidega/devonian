#!/bin/bash

. ../../../commons.sh

$OCI container rm -af
$OCI network rm devoniannet
$OCI network create --subnet=192.168.33.0/24 devoniannet 
$OCI run --ip=192.168.33.10 --network=devoniannet --add-host=monitor:192.168.33.11 --add-host=i2871fsv:192.168.33.10 --hostname=i2871fsv --name=i2871fsv --detach=true hidand/i2871fsv:1 
$OCI run -it --ip=192.168.33.11 --network=devoniannet --add-host=monitor:192.168.33.11 --add-host=i2871fsv:192.168.33.10 --name=monitor --detach=true hidand/monitor:1 bash

echo result: $?

# podman load < ../../../nodebase/hidand-nodebase_1.dimg.tar.gz
# podman --cgroup-manager=cgroupfs -it  exec monitor bash 
