#!/bin/bash

PACKAGE_NAME=($(md5sum /opt/IMAGE_INFO))
PACKAGE_NAME=prj$PACKAGE_NAME
NODEJS_DIR=/opt/prg/nodejs

echo "
Name:       $PACKAGE_NAME
Version:    1
Release:    1
Summary:    Base NodeJS
License:    Apache

AutoReqProv: no

%description
Nodebase.

%files
$NODEJS_DIR
/opt/IMAGE_INFO

%install
mkdir -p %{buildroot}$NODEJS_DIR
cp -R $NODEJS_DIR/* %{buildroot}$NODEJS_DIR
cp /opt/IMAGE_INFO %{buildroot}/opt/IMAGE_INFO
" > ./project.spec && \
echo $(cat /opt/IMAGE_INFO) > $PACKAGE_NAME.txt && \
rm -rf $NODEJS_DIR/include && \
rm -rf $NODEJS_DIR/share/man && \
rm -rf $NODEJS_DIR/share/doc && \
strip $NODEJS_DIR/bin/node && \
echo '#!/bin/bash' > /usr/lib/rpm/redhat/brp-mangle-shebangs && \
rpmbuild --nodeps --undefine __arch_install_post -bb project.spec && \
cp /root/rpmbuild/RPMS/x86_64/$PACKAGE_NAME-1-1.x86_64.rpm .  

