#!/bin/bash

docker save hidand/i1986hw:1 | gzip > ./hidand-i1986hw_1.dimg.tar.gz

echo result: $?

# docker push <hub user>/<repo name>:<tag>
