FROM docker.io/hidand/nodebase:1

RUN mkdir /opt/prg/i2871hew && \
    cd /opt/prg/i2871hew && \
    wget https://people.inf.elte.hu/hiaiaat/npm/famennian-i2871hew-1.0.1.tgz && \
    tar -xf famennian-i2871hew-1.0.1.tgz && \
    chown -cR middleware /opt/prg/i2871hew/ > /dev/null 2>&1

CMD su -s /bin/bash -c "/opt/prg/nodejs/bin/node /opt/prg/i2871hew/package/lib/index.js start" middleware 

EXPOSE 54111
