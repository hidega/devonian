#!/bin/bash

. ../commons.sh

$OCI save hidand/mongodb:1 | gzip > ./hidand-mongodb_1.dimg.tar.gz

echo result: $?

# docker push <hub user>/<repo name>:<tag>
