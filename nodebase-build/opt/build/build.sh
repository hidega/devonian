#!/bin/bash

cd /opt/build/node && ./configure --prefix=/opt/prg/nodejs && make -j4 && make install && /opt/build/build-rpm.sh
