FROM fedora:latest

COPY opt /opt

RUN dnf install -y git gcc-c++ fedora-packager rpmdevtools make ncurses-devel python gnutls-devel bison diffutils findutils binutils openssl-devel libcurl-devel && \
    cd /opt/build && \
    git clone https://github.com/nodejs/node.git && \
    cd node && git checkout v14.x && \
    echo "devonian-nodebase -- Fedora version: $(cat /etc/fedora-release) -- NodeJS version: $(git branch --show-current) -- Built on: $(date)" > /opt/prg/nodejs/BUILD_INFO && \
    cp /opt/prg/nodejs/BUILD_INFO /opt/IMAGE_INFO

