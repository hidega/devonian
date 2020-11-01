FROM fedora:latest

ARG MIDDLEWARE_UID

RUN dnf install -y https://people.inf.elte.hu/hiaiaat/rpm/devonian-nodebase-1-1.x86_64.rpm  && \
    useradd middleware --uid $MIDDLEWARE_UID --shell /sbin/nologin && \
    chown -cfR middleware /opt/prg/nodejs/ > /dev/null 2>&1 && \
    ln -s /opt/prg/nodejs/bin/node /usr/bin/node && \
    ln -s /opt/prg/nodejs/bin/npm /usr/bin/npm && \
    dnf clean all


