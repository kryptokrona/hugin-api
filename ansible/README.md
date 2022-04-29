![Ansible](ansible.png)

This document will describe how to work with Ansible to either deploy to your
own custom Hugin Cache VPS locally or how it simply works while running it through our
continous deployment procedure when pushing to main.

## Setup

### Installation

First install Ansible locally.

On Mac using brew package manager:

`brew install ansible`

On Ubuntu/Debian:

```
sudo apt update
sudo apt install software-properties-common
sudo add-apt-repository --yes --update ppa:ansible/ansible
sudo apt install ansible
```

Then we need to run the following to verify that our installation was successful:

`ansible --version`

### Configuration

Now open up `/etc/ansible/hosts` and add the domain to our machine that we want to provision to:

```
[ssdnodes]
cache.hugin.chat
```

We now need to generate a keypair so we can use that to communicate to the server. Run the command:

`ssh-keygen -t rsa -b 4096`

You will be promoted to enter a name of the key and if you want to add a password, but just leave the password blank.

Add the newly created key to the keychain (not the .pub):

`ssh-add ~/.ssh/<your-private-key>`

Now we need to transfer the public key to the server so we are able to connect to it in a secure way:

`ssh-copy-id root@cache.hugin.chat`

You will need to provide the root password, but it will be the only time we should enter the password. We will disable the
root login later, we will only authenticate with our key.

## Provisioning

To get started with the actual provisioning we need to create an Ansible vault that we will store our secrets. To do that
run the command:

`ansible-vault create hugin-cache.yml`

You will be promoted to enter password after you will be able to add the secret content