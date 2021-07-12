#!/bin/bash

. ../commons.sh

$OCI run --name nodejs-build -it devonian/nodebase-build:1 bash

echo result: $?


