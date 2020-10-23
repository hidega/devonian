#/bin/bash 
DIR="$(dirname "$(readlink -f "$0")")"
echo `date` > $DIR/last_healthcheck
node $DIR healthcheck

