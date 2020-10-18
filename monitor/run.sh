#!/bin/bash

. ../commons.sh

$OCI run -it --rm hidand/monitor:1 bash

echo result: $?


