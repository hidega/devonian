FROM busybox:1.33.1

COPY opt /opt

RUN /bin/busybox adduser service -D -s /bin/sh && \
    /bin/busybox chown -cfR service /opt/data > /dev/null 2>&1 && \
    /bin/busybox chown -cfR service /opt/prg > /dev/null 2>&1 && \
    /bin/busybox chmod -cfR 755 /opt/prg/service/

