#!/bin/bash

. ../commons.sh

$OCI image rm -f devonian/volumebase:1

$OCI build --build-arg MYSQL_UID=$MYSQL_UID --build-arg MIDDLEWARE_UID=$MIDDLEWARE_UID -t devonian/volumebase:1 .

echo result $?

