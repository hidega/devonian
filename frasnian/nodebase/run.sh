#!/bin/bash

. ../../commons.sh

$OCI run -it --rm hidand/nodebase:1 bash

echo result: $?


