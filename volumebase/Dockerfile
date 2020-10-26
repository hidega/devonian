FROM busybox:latest

ARG MIDDLEWARE_UID

ARG MYSQL_UID

RUN mkdir /opt && mkdir /opt/data && \
    adduser middleware -D --uid $MIDDLEWARE_UID --shell /sbin/nologin && \
    mkdir /opt/data/middleware && \
    chown -c middleware /opt/data && \
    chown -c middleware /opt/data/middleware && \
    adduser mysql -D --uid $MYSQL_UID --shell /sbin/nologin && \
    mkdir /opt/data/mariadb && \
    chown -c mysql /opt/data/mariadb && \ 
    mkdir /opt/data/mongodb && \
    chown -c middleware /opt/data/mongodb

