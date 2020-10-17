#!/bin/bash

. ../commons.sh

$OCI run -it hidand/mongodb-build:1 bash

echo result: $?


