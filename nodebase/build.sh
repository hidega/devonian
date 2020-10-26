#!/bin/bash

. ../commons.sh

$OCI image rm -f devonian/nodebase:1

$OCI build --build-arg MIDDLEWARE_UID=$MIDDLEWARE_UID -t devonian/nodebase:1 .

echo result $?

