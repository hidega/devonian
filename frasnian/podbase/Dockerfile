FROM fedora:latest 

RUN dnf -y install podman busybox && \
    useradd middleware --shell /sbin/nologin && \
    mkdir /opt/podbase && \
    chown -c middleware /opt/podbase
