#! /bin/bash

ansible-playbook provision_vps.yml -i hosts.inventory --vault-password-file=~/hugin.cache.vault