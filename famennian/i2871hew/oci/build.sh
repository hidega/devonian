#!/bin/bash

. ../../../commons.sh

$OCI image rm -f hidand/i2871hew:1

$OCI build -t hidand/i2871hew:1 .

echo result $?
