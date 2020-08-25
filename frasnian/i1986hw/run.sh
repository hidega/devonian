#!/bin/bash

podman run --name=i1986hw -d -p 54111:54111 && \
hidand/i1986hw:1

echo result: $?
