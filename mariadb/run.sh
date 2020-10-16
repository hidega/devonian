#!/bin/bash

. ../commons.sh

$OCI run -it  hidand/mariadb:1 bash

echo result: $?


