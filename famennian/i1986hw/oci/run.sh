#!/bin/bash

podman run \
  --name=i1986hw \
  --detach=true \
  --publish=18080:54111 \
  --cpus=0.1 \
  --health-cmd="/opt/prg/nodejs/bin/node /opt/prg/i1896hw/package/index.js healthcheck" \
  --health-interval=30s \
  --health-retries=3 \
  --health-start-period=60s \
  --health-timeout=20s \
  --memory=200m \
  docker.io/hidand/i1986hw:1

echo result: $?
