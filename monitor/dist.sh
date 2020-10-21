#!/bin/bash

. ../commons.sh

$OCI save hidand/monitor:1 | gzip > ./hidand-monitor_1.tar.gz

echo result: $?

