FROM alpine:3.14

COPY opt /opt

RUN apk add git g++ cmake make ncurses-dev bison linux-headers curl-dev readline-dev openssl-dev && \
    cd /opt/build && \
    git clone -b 10.6 https://github.com/MariaDB/server.git && \
    /opt/build/build.sh
    
