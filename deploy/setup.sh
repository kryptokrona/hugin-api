#!/bin/bash
# 
# This file is used for setting up environment variables and installing dependencies

# Edit these variables with what you prefer
POSTGRES_DB=hugin_cache_prod
POSTGRES_USER=postgres
POSTGRES_PASSWORD=test1234
DATABASE_URL=postgres://postgres:$POSTGRES_PASSWORD@127.0.0.1:5432/$POSTGRES_DB
DOMAINS=(example.org www.example.org)
EMAIL=user@user.com

# Setting environment variables as persistent
echo "export POSTGRES_DB=$POSTGRES_DB" >> ~/.bashrc
echo "export POSTGRES_USER=$POSTGRES_USER" >> ~/.bashrc
echo "export POSTGRES_PASSWORD=$POSTGRES_PASSWORD" >> ~/.bashrc
echo "export DATABASE_URL=$DATABASE_URL" >> ~/.bashrc
echo "export DOMAINS=$DOMAINS" >> ~/.bashrc
echo "export EMAIL=$EMAIL" >> ~/.bashrc
source ~/.bash_rc

# Update
sudo apt-get update

# Installing Docker
sudo apt-get -y install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
"deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
$(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose