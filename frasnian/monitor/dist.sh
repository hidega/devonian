#!/bin/bash

. ../commons.sh

$OCI save frasnian/monitor:1 | gzip > ./frasnian-monitor_1.tar.gz

echo result: $?

