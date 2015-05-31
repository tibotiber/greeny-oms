#!/bin/sh
# This script:
# - installs postgresql along with common tools on ubuntu
# - sets up a database for greeny oms

# Install PostgreSQL and tools
sudo apt-get install -y postgresql postgresql-contrib
sudo /etc/init.d/postgresql restart
echo "NOTA: You will be prompted to choose a PostgreSQL user password for the default user 'postgres', please key it in twice!"
sudo -u postgres psql postgres -c "\password postgres"
sudo -u postgres psql -c "CREATE EXTENSION adminpack;"

# Create sails user
sudo -u postgres createuser --superuser sails
echo "NOTA: You will be prompted to choose a PostgreSQL user password for the user 'sails', please key it in twice!"
echo "----: This password should be identical to the one in ~/ubismart/config/local.js. A helpful grep is tempted below:"
grep 'postgresql:' ~/greeny-oms/config/local.js -A 4
sudo -u postgres psql -c "\password sails"

# Create database for greeny oms
sudo -u postgres createdb greeny_oms
