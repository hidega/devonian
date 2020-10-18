#!/bin/bash

. ../commons.sh

$OCI save hidand/monitor:1 | gzip > ./hidand-monitor_1.dimg.tar.gz

echo result: $?

