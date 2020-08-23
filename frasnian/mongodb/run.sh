#!/bin/bash

. ../commons.sh

$OCI run -it  hidand/mongodb:1 bash

echo result: $?


