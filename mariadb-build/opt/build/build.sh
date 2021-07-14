#!/bin/sh

MARIADB_DIR=/opt/prg/mariadb

cd /opt/build/mariadb && \
cmake -DCMAKE_INSTALL_PREFIX=$MARIADB_DIR \
  -DWITHOUT_MROONGA:bool=1 -DWITHOUT_TOKUDB:bool=1 -DWITHOUT_COLUMNSTORE:bool=1 \
  -DWITHOUT_MYISAM:bool=1 -DWITHOUT_SPIDER:bool=1 -DWITHOUT_FEDERATED:bool=1 -DWITHOUT_BLACKHOLE:bool=1 \
  -DWITHOUT_ARCHIVE:bool=1 -DWITHOUT_CSV:bool=1 -DWITHOUT_OQGRAPH:bool=1 -DWITHOUT_ROCKSDB:bool=1 \
  -DWITHOUT_SPHINX:bool=1 \
  ../server && \
make -j4 && make install -j4 && \
strip $MARIADB_DIR/bin/* 
strip $MARIADB_DIR/lib/* 
strip $MARIADB_DIR/lib/plugin/* 
rm -rf $MARIADB_DIR/man 
rm -rf $MARIADB_DIR/mysql-test 
rm -rf $MARIADB_DIR/sql-bench 
rm -rf $MARIADB_DIR/include 
rm -rf $MARIADB_DIR/cert 
rm -rf $MARIADB_DIR/etc 
mkdir $MARIADB_DIR/cert 
mkdir $MARIADB_DIR/etc 
cp $MARIADB_DIR/scripts/mariadb-install-db $MARIADB_DIR/bin
cd /opt/build/server
echo "{ \"name\":\"devonian-mariadb\", \"buildParametersHash\":\"$(md5sum /opt/build/build.sh)\", \"mariaDbVersion\":\"$(git branch --show-current)\", \"buildDate\":\"$(date -uIseconds)\", \"alpineVersion\":\"$(cat /etc/alpine-release)\" }" > /opt/prg/mariadb/PKG_INFO   
cd /opt/build
tar -czf /opt/build/alpine-mariadb.tar.gz $MARIADB_DIR/

