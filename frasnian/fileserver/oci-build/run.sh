#!/bin/bash
podman container rm -af && \
podman network rm devoniannet && \
podman network create --subnet=192.168.33.0/24 devoniannet && \
podman run --ip=192.168.33.10 --network=devoniannet --add-host=monitor:192.168.33.11 \
             --add-host=fileserver:192.168.33.10 --hostname=fileserver --name=fileserver \
             --detach=true frasnian/fileserver:1 && \
podman run -it --ip=192.168.33.11 --network=devoniannet --add-host=monitor:192.168.33.11 \
             --add-host=fileserver:192.168.33.10 --name=monitor --detach=true devonian/monitor:1 bash && \
echo result: $?
