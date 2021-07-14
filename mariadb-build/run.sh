#!/bin/bash

. ../commons.sh

$OCI run --name mariadb-build -it devonian/mariadb-build:1 --rm /bin/sh

echo result: $?


