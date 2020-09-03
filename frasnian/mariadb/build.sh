#!/bin/bash

. ../../commons.sh

$OCI image rm -f hidand/mariadb:1

$OCI build -t hidand/mariadb:1 .

echo result $?

