FROM hidand/mariadb:1

COPY opt/prg/mariadb-i5329aa /opt/prg/mariadb-i5329aa

COPY opt/prg/mariadb/cert /opt/prg/mariadb/cert

RUN dnf install -y wget && cd /opt/prg/mariadb-i5329aa && \
    wget https://people.inf.elte.hu/hiaiaat/npm/frasnian-i5329aa.tgz && \
    tar -xf frasnian-i5329aa.tgz && \
    chown -cR mysql /opt/prg/mariadb-i5329aa/ > /dev/null 2>&1 &&\
    /bin/su -s /bin/sh -c '/opt/prg/mariadb-i5329aa/setup-db.sh' mysql 
    