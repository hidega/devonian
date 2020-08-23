FROM fedora:latest

COPY opt /opt

RUN dnf install -y gcc-c++ git libunwind-devel openssl-devel fedora-packager rpmdevtools python39.x86_64 python3-devel.x86_64 libcurl-devel xz-devel diffutils findutils binutils && \
cd /opt/build && \
mkdir /opt/prg/mongodb && \
echo "Built on $(date)" > /opt/prg/mongodb/BUILD_INFO && \
git clone https://github.com/mongodb/mongo 
    
