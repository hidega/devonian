#!/bin/bash
podman image rm -f frasnian/fileserver:1
podman build -t frasnian/fileserver:1 .
echo result $?
