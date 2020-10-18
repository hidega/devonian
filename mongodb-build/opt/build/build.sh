#!/bin/bash

cd /opt/build/mongo && \
pip install -r etc/pip/compile-requirements.txt  && \
python3 buildscripts/scons.py -j 2 --use-system-libunwind --disable-warnings-as-errors DESTDIR=/opt/prg/mongodb install-core
