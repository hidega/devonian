#!/bin/bash

. ../commons.sh

$OCI run --name nodejs_build -it devonian/nodebase-build:1 bash

echo result: $?


