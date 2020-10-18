#!/bin/bash 

. ../commons.sh

$OCI image rm -f hidand/monitor:1

$OCI build -t hidand/monitor:1 .

echo result $?

