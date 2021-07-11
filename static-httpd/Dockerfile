FROM busybox:1.33.1

COPY opt /opt

RUN useradd middleware --shell /sbin/nologin && \
    chown -cfR middleware /opt/data > /dev/null 2>&1 && \
    chown -cfR middleware /opt/prg > /dev/null 2>&1 && \
    dnf clean all


