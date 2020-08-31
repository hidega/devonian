#!/bin/bash

BASEDIR=$(dirname "$0")

nohup node $BASEDIR/index.js  > /dev/null 2>&1 &
