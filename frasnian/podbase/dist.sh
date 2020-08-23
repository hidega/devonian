#!/bin/bash

. ../commons.sh

$OCI save hidand/podbase:1 | gzip > ./hidand-podbase_1.dimg.tar.gz

echo result: $?

# docker push <hub user>/<repo name>:<tag>
