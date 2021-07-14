#!/bin/bash

. ./constants.sh

$OCI container rm -f static-httpd

echo result: $?

