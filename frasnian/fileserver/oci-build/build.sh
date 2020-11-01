#!/bin/bash
podman --cgroup-manager=cgroupfs image rm -f frasnian/fileserver:1
podman --cgroup-manager=cgroupfs build -t frasnian/fileserver:1 .
echo result $?
