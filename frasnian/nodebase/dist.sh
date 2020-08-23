#!/bin/bash

. ../commons.sh

$OCI save hidand/nodebase:1 | gzip > ./hidand-nodebase_1.dimg.tar.gz

echo result: $?

# docker push <hub user>/<repo name>:<tag>
