#!/bin/bash

. ../../../commons.sh

$OCI image rm -f hidand/i2871fsv:1

$OCI build -t hidand/i2871fsv:1 .

echo result $?
