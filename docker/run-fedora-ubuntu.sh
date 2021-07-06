#!/bin/bash

FEDORA_CONTAINER_NAME=devonian-fedora
FEDORA_IMAGE_NAME=devonian-fedora-img
FEDORA_VERSION=34
DOCKER=podman

function terminate() {
  echo $2
  exit $1
}

function terminate_if_abnormal_exit() {
  (( $? != 0 )) && terminate $1 $2
}

function terminate_if_normal_exit() {
  (( $? == 0 )) && terminate $1 $2
}

function check_docker() {
  $DOCKER --version i
  terminate_if_abnormal_exit 65 "Command not found: $DOCKER"
  return 0
}

function create_dockerfile() {
  return "
FROM fedora:34
  "
}

function check_container_exists() {
  $DOCKER container ls -a | grep -q $FEDORA_CONTAINER_NAME 
  terminate_if_normal_exit 66 "Container exists: $FEDORA_CONTAINER_NAME"
  echo "Container does not exist: $FEDORA_CONTAINER_NAME" 
  return 0
}

function check_image_exists() {
  $DOCKER image ls -a | grep -q $FEDORA_IMAGE_NAME 
  terminate_if_normal_exit 67 "Image exists: $FEDORA_IMAGE_NAME"
  echo "Image does not exist: $FEDORA_IMAGE_NAME" 
  return 0
}

function create_image {
  echo "Creating image: $FEDORA_IMAGE_NAME"
  create_dockerfile | $DOCKER build -t $FEDORA_IMAGE_NAME -f -
  terminate_if_abnormal_exit 68 "Could not build image: $FEDORA_IMAGE_NAME"
  return 0
}

function run_container {
  echo "Running container: $FEDORA_CONTAINER_NAME"
  return 0
}

check_docker && check_container_exists && check_image_exists && create_image && run_container && exit 0

