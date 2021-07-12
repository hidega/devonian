FROM alpine:3.14

COPY opt /opt

RUN NODEJS_DIR=/opt/prg/nodejs && \
    apk add git g++ make python3 openssl openssl-dev linux-headers && \
    mkdir -p /opt/build && mkdir -p $NODEJS_DIR && \
    cd /opt/build && \
    git clone https://github.com/nodejs/node.git && git checkout v16.x && \
    cd /opt/build/node && \
    ./configure --shared-openssl --prefix=$NODEJS_DIR && \
    make -j4 && make install && \
    rm -rf $NODEJS_DIR/include && \
    rm -rf $NODEJS_DIR/share/man && \
    rm -rf $NODEJS_DIR/share/doc && \
    strip $NODEJS_DIR/bin/node && \
    echo "{\"name\":\"devonian/nodebase-build\",\"alpineVersion\":\"$(cat /etc/alpine-release)\",\"nodeJsVersion\": \"$(git branch --show-current)\",\"buildDate\":\"$(date -u)\"}" > $NODEJS_DIR/PKG_INFO && \
    tar -cvzf /opt/build/nodejs.tar.gz $NODEJS_DIR/

