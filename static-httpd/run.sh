#!/bin/bash

. ../commons.sh

$OCI run -it --rm devonian/nodebase:1 bash

echo result: $?


