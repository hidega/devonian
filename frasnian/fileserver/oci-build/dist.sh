#!/bin/bash
podman save frasnian/fileserver:1 | gzip > ./frasnian-fileserver_1.tar.gz && \
echo result: $?
