FROM fedora:34

COPY opt /opt

RUN dnf install -y git gcc-c++ fedora-packager rpmdevtools make ncurses-devel python gnutls-devel bison diffutils findutils binutils openssl-devel libcurl-devel && \
    cd /opt/build && \
    git clone https://github.com/nodejs/node.git && \
    cd node && git checkout v14.x && \
    echo "{ \"package\":\"@devonian/nodebase-build\", \"fedoraVersion\": \"$(cat /etc/fedora-release)\", \"nodeJsVersion\": \"$(git branch --show-current)\", \"buildDate\": \"$(date -u)\" }" > /opt/prg/nodejs/BUILD_INFO && \
    cp /opt/prg/nodejs/BUILD_INFO /opt/IMAGE_INFO
