FROM devonian/nodebase:1

COPY opt /opt

RUN dnf install -y git libunwind diffutils findutils binutils iputils curl iproute net-tools && dnf clean all
