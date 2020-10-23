#!/bin/bash

. ../commons.sh

$OCI run -it devonian/nodebase-build:1 bash

echo result: $?


