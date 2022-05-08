#!/bin/bash
# 
# This file is used for setting up environment variables and installing dependencies

# General configs
SYS_HUGIN_NODE_ENV=production # do not change this
SYS_HUGIN_NODE_SERVER=blocksum.org:11898
SYS_HUGIN_DOCKER_IMAGE=ghcr.io/kryptokrona/hugin-cache:latest
SYS_HUGIN_PORT=3000

# NGINX
SYS_NGINX_DOMAINS=(example.org www.example.org)
SYS_NGINX_EMAIL=user@user.com

# Database configs
SYS_POSTGRES_DB=hugin_cache_prod
SYS_POSTGRES_USER=postgres
SYS_POSTGRES_PASSWORD=test1234
SYS_POSTGRES_PORT=5432
SYS_POSTGRES_URL=postgres://$SYS_POSTGRES_USER:$SYS_POSTGRES_PASSWORD@127.0.0.1:$SYS_POSTGRES_PORT/$SYS_POSTGRES_DB

# Setting environment variables as persistent
echo "export SYS_HUGIN_NODE_ENV=$SYS_HUGIN_NODE_ENV" >> ~/.bashrc
echo "export SYS_HUGIN_NODE_SERVER=$SYS_HUGIN_NODE_SERVER" >> ~/.bashrc
echo "export SYS_HUGIN_DOCKER_IMAGE=$SYS_HUGIN_DOCKER_IMAGE" >> ~/.bashrc
echo "export SYS_HUGIN_PORT=$SYS_HUGIN_PORT" >> ~/.bashrc
echo "export SYS_NGINX_DOMAINS=$SYS_NGINX_DOMAINS" >> ~/.bashrc
echo "export SYS_NGINX_EMAIL=$SYS_NGINX_EMAIL" >> ~/.bashrc
echo "export SYS_POSTGRES_DB=$SYS_POSTGRES_DB" >> ~/.bashrc
echo "export SYS_POSTGRES_USER=$SYS_POSTGRES_USER" >> ~/.bashrc
echo "export SYS_POSTGRES_PASSWORD=$SYS_POSTGRES_PASSWORD" >> ~/.bashrc
echo "export SYS_POSTGRES_PORT=$SYS_POSTGRES_PORT" >> ~/.bashrc
echo "export SYS_POSTGRES_URL=$SYS_POSTGRES_URL" >> ~/.bashrc
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