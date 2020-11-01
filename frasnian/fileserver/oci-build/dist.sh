#!/bin/bash
podman --cgroup-manager=cgroupfs save frasnian/fileserver:1 | gzip > ./frasnian-fileserver_1.tar.gz && \
echo result: $?
