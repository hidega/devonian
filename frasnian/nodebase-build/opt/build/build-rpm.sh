#!/bin/bash

rm -rf /opt/prg/nodejs/include 
rm -rf /opt/prg/nodejs/share/man 
rm -rf /opt/prg/nodejs/share/doc
strip /opt/prg/nodejs/bin/node 
echo '#!/bin/bash' > /usr/lib/rpm/redhat/brp-mangle-shebangs && \
rpmbuild --nodeps --undefine __arch_install_post -bb devonian-nodebase.spec && \
cp /root/rpmbuild/RPMS/x86_64/devonian-nodebase-1-1.x86_64.rpm .


