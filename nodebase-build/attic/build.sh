#!/bin/bash

. ../commons.sh

$OCI image rm -f devonian/nodebase-build:1

$OCI build -t devonian/nodebase-build:1 .

echo result $?

