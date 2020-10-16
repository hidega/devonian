#!/bin/bash

strip /opt/prg/mongodb/bin/*
echo '#!/bin/bash' > /usr/lib/rpm/redhat/brp-mangle-shebangs && \
rpmbuild --nodeps --undefine __arch_install_post -bb devonian-mongodb-build.spec && \
cp /root/rpmbuild/RPMS/x86_64/devonian-mongodb-1-1.x86_64.rpm .

