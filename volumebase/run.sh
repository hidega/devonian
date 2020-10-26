#!/bin/bash

. ../commons.sh

$OCI run -d -it -v /opt/data --name=volumebase devonian/volumebase:1 

echo result: $?

# podman run -it --volumes-from volumebase devonian/nodebase:1 bash
