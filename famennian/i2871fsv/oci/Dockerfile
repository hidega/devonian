FROM hidand/nodebase:1

RUN mkdir /opt/prg/i2871fsv && \
    cd /opt/prg/i2871fsv && \
    wget https://people.inf.elte.hu/hiaiaat/npm/famennian-i2871fsv-1.0.1.tgz && \
    tar -xf famennian-i2871fsv-1.0.1.tgz && \
    chown -cR middleware /opt/prg/i2871fsv/ > /dev/null 2>&1

CMD su -s /bin/bash -c "cd /opt/prg/i2871fsv/package && ./start.sh ; echo $? > ./start_result" middleware 

EXPOSE 9000
