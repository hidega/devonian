#!/bin/bash

. ../commons.sh

docker image rm -f hidand/i1986hw:1

docker build -t hidand/i1986hw:1 .

echo result $?
