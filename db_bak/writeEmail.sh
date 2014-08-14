#!/bin/bash
IP=$(curl -s checkip.dyndns.org|sed -e 's/.*Current IP Address: //' -e 's/<.*$//')
echo "A new backup is available for the Greeny OMS database."
echo "Please ssh copy it from the server at IP $IP with user 'ubuntu' at the path '~/greeny-oms/db_bak/greeny_oms_$(date +%F).sql.gz'"
