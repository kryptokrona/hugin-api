#!/bin/bash
# 
# This file is used for setting up the production environment of Hugin Cache

# Download docker-compose file
curl -L https://raw.githubusercontent.com/kryptokrona/hugin-cache/main/docker-compose.yml > docker-compose.yml

# Download NGINX configuration file
mkdir -p ./data/nginx
curl -L https://raw.githubusercontent.com/kryptokrona/hugin-cache/main/deploy/nginx.conf > data/nginx/app.conf

# Creating a dummy certificate so we can actually start NGINX
curl -L https://raw.githubusercontent.com/kryptokrona/hugin-cache/main/deploy/init-letsencrypt.sh > init-letsencrypt.sh
sudo chmod +x init-letsencrypt.sh
./init-letsencrypt.sh

# Orchestrate production environment with Docker Compose
docker-compose up -d

# Setting up service for docker-compose on system if restart of server is needed so we dont have to think about starting the process manually
# Create a systemd service that autostarts & manages a docker-compose instance in the current directory
SERVICENAME=hugin-cache
echo "Creating systemd service... /etc/systemd/system/${SERVICENAME}.service"

# Create systemd service file
sudo cat >/etc/systemd/system/$SERVICENAME.service <<EOF
[Unit]
Description=$SERVICENAME
Requires=docker.service
After=docker.service
[Service]
Restart=always
User=$USER
Group=docker
WorkingDirectory=$(pwd)
# Shutdown container (if running) when unit is started
ExecStartPre=$(which docker-compose) -f docker-compose.yml down
# Start container when unit is started
ExecStart=$(which docker-compose) -f docker-compose.yml up
# Stop container when unit is stopped
ExecStop=$(which docker-compose) -f docker-compose.yml down
[Install]
WantedBy=multi-user.target
EOF

echo "Enabling & starting $SERVICENAME"

# Autostart systemd service
sudo systemctl enable $SERVICENAME.service

# Start systemd service now
sudo systemctl start $SERVICENAME.service
