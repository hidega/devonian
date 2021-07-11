#!/bin/bash

. ./node_modules/bash-constants/constants.sh

$OCI container rm -f static-httpd

echo result: $?

