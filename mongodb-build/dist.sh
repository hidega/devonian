#!/bin/bash

$OCI save hidand/mongodb-build:1 | gzip > ./hidand-mongodb-build_1.dimg.tar.gz

echo result: $?

# $OCI push <hub user>/<repo name>:<tag>
