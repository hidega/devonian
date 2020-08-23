#!/bin/bash

. ../commons.sh

$OCI image rm -f hidand/nodebase:1

$OCI build -t hidand/nodebase:1 .

echo result $?

