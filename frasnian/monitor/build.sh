#!/bin/bash 

. ../../commons.sh

$OCI image rm -f frasnian/monitor:1

$OCI build -t frasnian/monitor:1 .

echo result $?

