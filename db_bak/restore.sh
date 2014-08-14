#!/bin/bash
if [ $# -ne 2 ]; then
    echo "Usage: ./restore.sh DATABASE ARCHIVE-FILE.zip.gz"
    echo "DATABASE should be an existing and empty database."
else
    gunzip -c $2 | sudo -u postgres psql $1
fi
