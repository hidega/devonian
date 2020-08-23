#!/bin/bash

. ../commons.sh

$OCI save hidand/nodebase-build:1 | gzip > ./hidand-nodebase-build_1.dimg.tar.gz

echo result: $?

docker push hidand/nodebase-build:1
