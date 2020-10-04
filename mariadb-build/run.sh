#!/bin/bash

. ../../commons.sh

$OCI run -it hidand/mariadb-build:1 bash

echo result: $?


