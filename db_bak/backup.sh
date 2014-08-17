#!/bin/bash
sudo -u postgres pg_dump greeny_oms | gzip -c > db_bak/greeny_oms_$(date +%F).sql.gz
