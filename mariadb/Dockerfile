FROM docker.io/hidand/nodebase:1

RUN dnf install -y https://people.inf.elte.hu/hiaiaat/rpm/devonian-mariadb-1-1.x86_64.rpm && \
    useradd mysql --shell /sbin/nologin && \
    chown -cR mysql /opt/prg/nodejs/ > /dev/null 2>&1 && \
    chown -cR mysql /opt/prg/mariadb/ > /dev/null 2>&1  && \
    mkdir /opt/data && mkdir /opt/data/mariadb && \
    chown -cR mysql /opt/data/mariadb/ > /dev/null 2>&1 && \
    dnf clean all


