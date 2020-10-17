#!/bin/bash

. ../commons.sh

$OCI image rm -f hidand/mongodb:1

$OCI build -t hidand/mongodb:1 .

echo result $?

