#!/bin/bash

. ./constants.sh

$OCI save devonian/static-httpd:1 | gzip > ./devonian-static-httpd_1.tar.gz

echo result: $?

