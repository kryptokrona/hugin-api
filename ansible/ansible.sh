#! /bin/bash
# this file is intended for manually deploy from your local computer and not in the GitHub Actions workflow

# checks if keypair doesn't exist
if [ ! -f ~/.ssh/id_hugin_cache ]; then
    ssh-keygen -t rsa -N "" -f ~/.ssh/id_hugin_cache
    eval "$(ssh-agent -s)" &>/dev/null
    ssh-add ~/.ssh/id_hugin_cache &>/dev/null
    ssh-copy-id -i ~/.ssh/id_hugin_cache.pub root@cache.hugin.chat
fi

ansible-playbook provision_vps.yml -i prod.inventory --ask-vault-pass