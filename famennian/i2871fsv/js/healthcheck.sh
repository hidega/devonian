#!/bin/bash

RPATH=$(cat ./cfg.json | jq .host -r)
PORT=$(cat ./cfg.json | jq .port -r)
URL_BASE_PATH=$(cat ./cfg.json | jq .urlBasePath -r)

curl -G http://$RPATH:$PORT/$URL_BASE_PATH/ping
