FROM docker.io/fedora:latest

COPY opt /opt

RUN dnf install -y git cmake gcc-c++ make ncurses-devel zlib-devel gnutls-devel fedora-packager rpmdevtools bison diffutils findutils binutils openssl-devel libcurl-devel && \
    useradd mysql --shell /sbin/nologin && \
    cd /opt/build && \
    git clone -b 10.5 https://github.com/MariaDB/server.git && \
    cd server && \
    echo "Version: $(git branch --show-current)  Built on $(date)" > /opt/prg/mariadb/BUILD_INFO 
