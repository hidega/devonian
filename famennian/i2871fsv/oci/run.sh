#!/bin/bash

. ../../../commons.sh

$OCI run --hostname=i2871fsv --name=i2871fsv --detach=true hidand/i2871fsv:1 

echo result: $?

# podman load < ../../../nodebase/hidand-nodebase_1.dimg.tar.gz
# podman exec -it  i2871fsv bash
