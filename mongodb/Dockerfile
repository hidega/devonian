FROM hidand/nodebase:1

RUN dnf install -y libunwind https://people.inf.elte.hu/hiaiaat/rpm/devonian-mongodb-1-1.x86_64.rpm && \
    chown middleware -cR /opt/prg/mongodb/ > /dev/null 2>&1  && \
    mkdir /opt/data && mkdir /opt/data/mongodb && \
    chown middleware -c /opt/data/mongodb > /dev/null 2>&1 && \
    dnf clean all

