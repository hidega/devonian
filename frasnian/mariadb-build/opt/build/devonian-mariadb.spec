Name:       devonian-mariadb
Version:    1
Release:    1
Summary:    Base MariaDB
License:    Apache

AutoReqProv: no

%description
MariaDB.

%files
/opt/prg/mariadb

%install
mkdir -p %{buildroot}/opt/prg/mariadb
cp -R /opt/prg/mariadb/* %{buildroot}/opt/prg/mariadb

