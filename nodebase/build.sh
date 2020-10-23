#!/bin/bash

. ../commons.sh

$OCI image rm -f devonian/nodebase:1

$OCI build -t devonian/nodebase:1 .

echo result $?

