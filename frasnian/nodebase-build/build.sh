#!/bin/bash

. ../../commons.sh

$OCI image rm -f hidand/nodebase-build:1

$OCI build -t hidand/nodebase-build:1 .

echo result $?

