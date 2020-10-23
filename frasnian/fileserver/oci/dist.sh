#!/bin/bash

. ../../../commons.sh

$OCI save hidand/i2871fsv:1 | gzip > ./hidand-i2871fsv_1.tar.gz

echo result: $?

