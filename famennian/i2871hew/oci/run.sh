#!/bin/bash

podman run \
  --name=i2871hew \
  --detach=true \
  --publish=18080:54111 \
  --cpus=0.1 \
  --health-cmd="/opt/prg/nodejs/bin/node /opt/prg/i2871hw/package/index.js healthcheck" \
  --health-interval=30s \
  --health-retries=3 \
  --health-start-period=60s \
  --health-timeout=20s \
  --memory=200m \
  docker.io/hidand/i2871hew:1

echo result: $?