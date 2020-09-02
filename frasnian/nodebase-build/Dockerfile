FROM docker.io/fedora:latest

COPY opt /opt

RUN dnf install -y git gcc-c++ fedora-packager rpmdevtools make ncurses-devel python gnutls-devel bison diffutils findutils binutils openssl-devel libcurl-devel && \
    cd /opt/build && \
    git clone https://github.com/nodejs/node.git && \
    cd node && git checkout v14.x && \
    echo "Version $(git branch --show-current)    Built on $(date)" > /opt/prg/nodejs/BUILD_INFO 

