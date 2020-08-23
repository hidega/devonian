#!/bin/bash

. ../comons.sh

$OCI save hidand/mariadb-build:1 | gzip > ./hidand-mariadb-build_1.dimg.tar.gz

echo result: $?

# docker push <hub user>/<repo name>:<tag>
