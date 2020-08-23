FROM fedora:latest

COPY opt /opt

RUN dnf install -y git gcc-c++ fedora-packager rpmdevtools make ncurses-devel python gnutls-devel bison diffutils findutils binutils openssl-devel libcurl-devel && \
    echo "Built on $(date)" > /opt/prg/nodejs/BUILD_INFO && \
    cd /opt/build && \
    git clone https://github.com/nodejs/node.git 
