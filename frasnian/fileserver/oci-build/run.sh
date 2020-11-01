#!/bin/bash
podman --cgroup-manager=cgroupfs container rm -af && \
podman --cgroup-manager=cgroupfs network rm devoniannet && \
podman --cgroup-manager=cgroupfs network create --subnet=192.168.33.0/24 devoniannet && \
podman --cgroup-manager=cgroupfs run --ip=192.168.33.10 --network=devoniannet --add-host=monitor:192.168.33.11 \
             --add-host=fileserver:192.168.33.10 --hostname=fileserver --name=fileserver \
             --detach=true frasnian/fileserver:1 && \
podman --cgroup-manager=cgroupfs run -it --ip=192.168.33.11 --network=devoniannet --add-host=monitor:192.168.33.11 \
             --add-host=fileserver:192.168.33.10 --name=monitor --detach=true devonian/monitor:1 bash && \
echo result: $?
