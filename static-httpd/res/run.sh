#!/bin/bash

. ./constants.sh

$OCI run -d --name=static-httpd \
            --health-cmd=/opt/prg/service/healthcheck.sh \
            --health-timeout=10s 
     devonian/static-httpd:1 /opt/prg/service/start.sh

echo result: $?

