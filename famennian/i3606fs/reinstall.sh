#!/bin/bash

cd /home/andras/filesrv 
rm famennian-i3606fs-1.0.1.tgz
wget https://people.inf.elte.hu/hiaiaat/npm/famennian-i3606fs-1.0.1.tgz  
rm -rf ./package  
tar -xf famennian-i3606fs-1.0.1.tgz

