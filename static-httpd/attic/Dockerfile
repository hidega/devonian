FROM busybox:1.33.1

COPY opt /opt

RUN /bin/busybox adduser middleware -D -H -s /bin/nologin && \
    /bin/busybox chown -cfR middleware /opt/data > /dev/null 2>&1 && \
    /bin/busybox chown -cfR middleware /opt/prg > /dev/null 2>&1 && \
    /bin/busybox echo " * *    * * *   middleware  /opt/prg/service/healthcheck.sh" >> /etc/crontab


