#!/bin/bash

docker save hidand/mariadb-i5329aa:1 | gzip > ./hidand-mariadb-i5329aa_1.dimg.tar.gz

echo result: $?

# docker push <hub user>/<repo name>:<tag>
