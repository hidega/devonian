#!/bin/bash

. ../commons.sh

$OCI run -it --rm hidand/podbase:1 bash

echo result: $?