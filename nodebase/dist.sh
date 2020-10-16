#!/bin/bash

. ../commons.sh

#$OCI save hidand/nodebase:1 | gzip > ./hidand-nodebase_1.dimg.tar.gz

echo result: $?

$OCI push hidand/nodebase:1
