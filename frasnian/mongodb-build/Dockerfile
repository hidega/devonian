FROM docker.io/fedora:latest

COPY opt /opt

RUN dnf install -y gcc-c++ git libunwind-devel openssl-devel fedora-packager rpmdevtools python39.x86_64 python3-devel.x86_64 libcurl-devel xz-devel diffutils findutils binutils && \
    cd /opt/build && git clone https://github.com/mongodb/mongo.git -b v4.4 && cd mongo && \
    echo "Version $(git branch --show-current)   built on $(date)" > /opt/prg/mongodb/BUILD_INFO 
    
