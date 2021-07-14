#!/bin/bash

. ../commons.sh

$OCI save devonian/nodebase:1 | gzip > ./devonian-nodebase_1.tar.gz

echo result: $?

