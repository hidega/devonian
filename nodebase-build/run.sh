#!/bin/bash

. ../../commons.sh

$OCI run -it hidand/nodebase-build:1 bash

echo result: $?


