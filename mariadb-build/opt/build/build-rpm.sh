#!/bin/bash

MARIADB_DIR=/opt/prg/mariadb

strip $(MARIADB_DIR)/bin/* 
strip $(MARIADB_DIR)/lib/* 
strip $(MARIADB_DIR)/lib/plugin/* 
rm -rf $(MARIADB_DIR)/man
rm -rf $(MARIADB_DIR)/mysql-test 
rm -rf $(MARIADB_DIR)/sql-bench 
rm -rf $(MARIADB_DIR)/include 
mkdir $(MARIADB_DIR)/cert
mkdir $(MARIADB_DIR)/etc
cp $(MARIADB_DIR)/scripts/mariadb-install-db $(MARIADB_DIR)/bin
echo '#!/bin/bash' > /usr/lib/rpm/redhat/brp-mangle-shebangs && \
rpmbuild --nodeps --undefine __arch_install_post -bb devonian-mariadb.spec && \
cp /root/rpmbuild/RPMS/x86_64/devonian-mariadb-1-1.x86_64.rpm .

