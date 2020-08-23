#!/bin/bash

. ../commons.sh

$OCI save hidand/mariadb:1 | gzip > ./hidand-mariadb_1.dimg.tar.gz

echo result: $?

# docker push <hub user>/<repo name>:<tag>
