#!/bin/bash

strip /opt/prg/mariadb/bin/* 
strip /opt/prg/mariadb/lib/* 
strip /opt/prg/mariadb/lib/plugin/* 
rm -rf /opt/prg/mariadb/man
rm -rf /opt/prg/mariadb/mysql-test 
rm -rf /opt/prg/mariadb/sql-bench 
rm -rf /opt/prg/mariadb/include 
echo '#!/bin/bash' > /usr/lib/rpm/redhat/brp-mangle-shebangs && \
rpmbuild --nodeps --undefine __arch_install_post -bb devonian-mariadb.spec && \
cp /root/rpmbuild/RPMS/x86_64/devonian-mariadb-1-1.x86_64.rpm .

