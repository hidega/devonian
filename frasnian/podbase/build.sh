#!/bin/bash

. ../commons.sh

$OCI image rm -f hidand/podbase:1

$OCI build -t hidand/podbase:1 .

echo result $?

