#!/bin/bash

podman run --name=i1986hw -d -p 18080:54111 --privileged=true \
docker.io/hidand/i1986hw:1

echo result: $?
