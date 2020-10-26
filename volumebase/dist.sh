#!/bin/bash

. ../commons.sh

$OCI save devonian/volumebase:1 | gzip > ./devonian-volumebase_1.tar.gz

echo result: $?

