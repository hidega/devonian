FROM alpine:3.14

COPY opt /opt

RUN apk add git cmake make ncurses-dev bison curl-dev readline-dev openssl-dev && \
    cd /opt/build && \
    git clone -b 10.6 https://github.com/MariaDB/server.git && \
    /opt/build/build.sh
    
