![Ansible](ansible.png)

This document will describe how to work with Ansible to either deploy to your
own custom Hugin Cache VPS locally or how it simply works while running it through our
continous deployment procedure when pushing to main.

## Setup

### Installation

First install Ansible locally.

On Mac using brew package manager:

- `brew install ansible`
- `brew install esolitos/ipa/sshpass`

On Ubuntu/Debian:

```sh
sudo apt update
sudo apt install software-properties-common
sudo add-apt-repository --yes --update ppa:ansible/ansible
sudo apt install ansible
sudo apt install sshpass
```

Then we need to run the following to verify that our installation was successful:

`ansible --version`

### Configuration

Now open up `hosts.inventory` and add the IP of the VPS we want to provision to:

```
[vps]
<ip address/hostname here>
```

We can add multiple lines with IP/hostname addresses if we want to deploy it to many servers.
## Provisioning

Before we start with the provisioning we need to generate one vault file:

- `ansible-vault create ./group_vars/vps.yml`

Now enter a password for the file itself when prompted and then it will automatically open up Vi/Vim and we enter the following:

```yml
ansible_user: <username>
ansible_password: <passsword>
vault_vps_user: ansible
vault_vps_password: <ansible-password>
vault_postgres_db_user: <postgres-username>
vault_postgres_db_password: <postgres-password>
vault_postgres_db_name: <postgres-db-name>
```

Then save and exit:

- `:wq`

Then we need to use that password we set for the file itself and save that in a file on our host system. Do that by:

- `vim ~/hugin.cache.pwd`

Then add that same password inside this file and we will use this file to run the playbook.

Then save and exit:

- `:wq`

Now we need to permanently add our SSH key. Open up our bash rc file (depending on OS you might have a different file name for this in your home directory). Open up ~/.bashrc or ~/.bash_profile and add this:

```sh
eval $(ssh-agent)
ssh-add ~/.ssh/id_hugin_cache
```

Then run to update:

- `source ~/.bashrc`

Or:

- `source ~/.bash_profile`

Open up **provision_vps.yml** and github_actions to false.

So now we can start provisioning by running our shell script:

- `sudo chmod +x ansible.sh`
- `./ansible.sh`

If we add multiple VPS instances in our inventory, we need to copy our public key to new one manually otherwise we will not be able to connect to it later. It will give us a permission denied error. So copy the public key by running:

- `ssh-copy-id -i ~/.ssh/id_hugin_cache.pub root@new-vps`


## Common issues

### NGINX configuration breaks

**Problem:** If you made some change in NGINX configuration and it breaks during setup, the next time it will not always be able to update it so it works again.
**Solution:** SSH into the machine and change the configuration manually and restart the NGINX server. Check the logs with `journalctl -xe` if you don't find the issue right away.