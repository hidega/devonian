#!/bin/bash

. ./node_modules/bash-constants/constants.sh

$OCI image rm -f devonian/static-httpd:1

$OCI build -t devonian/static-httpd:1 .

echo result $?

