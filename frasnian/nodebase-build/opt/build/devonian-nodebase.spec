Name:       devonian-nodebase
Version:    1
Release:    1
Summary:    Base NodeJS 
License:    Apache

AutoReqProv: no

%description
Nodebase.

%files
/opt/prg/nodejs

%install
mkdir -p %{buildroot}/opt/prg/nodejs
cp -R /opt/prg/nodejs/* %{buildroot}/opt/prg/nodejs

