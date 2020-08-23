Name:       devonian-mongodb
Version:    1
Release:    1
Summary:    MongoDB
License:    Apache

AutoReqProv: no

%description
MongoDB.

%files
/opt/prg/mongodb

%install
mkdir -p %{buildroot}/opt/prg/mongodb
cp -R /opt/prg/mongodb/* %{buildroot}/opt/prg/mongodb

