FROM alpine:3.14

COPY opt /opt

RUN adduser service -D -s /bin/sh && \
    chown -cfR service /opt/data > /dev/null 2>&1 && \
    chown -cfR service /opt/prg > /dev/null 2>&1 && \
    chmod -cfR 755 /opt/prg/service/
