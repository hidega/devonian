#!/bin/bash

. ../commons.sh

$OCI run -it --rm frasnian/monitor:1 bash

echo result: $?


