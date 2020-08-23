FROM hidand/nodebase:1

RUN dnf install -y wget && \
    mkdir /opt/prg/i1986hw && \
    cd /opt/prg/i1986hw && \
    wget https://people.inf.elte.hu/hiaiaat/npm/famennian-i1986hw-1.0.1.tgz && \
    tar -xf famennian-i1986hw-1.0.1.tgz && \
    cd package && \
    npm install --only=prod && \
    chown -cR middleware /opt/prg/i1986hw/ > /dev/null 2>&1

CMD su -s /bin/bash -c "/opt/prg/nodejs/bin/node /opt/prg/i1986hw/package/index.js start" middleware 
