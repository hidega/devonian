# generated on 2020-11-01T12:42:12.883Z

FROM devonian/nodebase:1 

COPY opt /opt

RUN  chown -cR middleware /opt/prg/service && \
   echo '/opt/prg/nodejs/bin/node /opt/prg/service/index.js start' > /opt/prg/service/start.sh && \
   echo '/opt/prg/nodejs/bin/node /opt/prg/service/index.js healthcheck' > /opt/prg/service/healthcheck.sh && \
   chmod -c 755 /opt/prg/service/start.sh && \
   chmod -c 755 /opt/prg/service/healthcheck.sh 

CMD su -s /bin/bash -c "/opt/prg/service/start.sh" middleware && echo $? > ./start_result


