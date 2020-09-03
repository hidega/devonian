#!/bin/bash

. ../commons.sh

docker image rm -f hidand/mariadb-i5329aa:1

docker build --build-arg -t hidand/mariadb-i5329aa:1 .

echo result $?

