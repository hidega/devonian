#!/bin/bash

. ../commons.sh

$OCI save hidand/nodebase:1 | gzip > ./hidand-nodebase_1.tar.gz

echo result: $?

