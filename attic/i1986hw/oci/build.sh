#!/bin/bash

. ../../../commons.sh

$OCI image rm -f hidand/i1986hw:1

$OCI build -t hidand/i1986hw:1 .

echo result $?
