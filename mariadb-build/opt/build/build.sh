#!/bin/bash

cd /opt/build/mariadb && \
cmake -DCMAKE_INSTALL_PREFIX=/opt/prg/mariadb ../server && \
make -j4 && make install -j4

