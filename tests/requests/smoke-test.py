import requests
import sys
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects

try:
    base_url = 'https://cache.hugin.chat/api/v1/{0}'

    # trying posts endpoints
    posts = requests.get(base_url.format('/posts'))
    assert(posts.status_code == requests.codes.ok)

    posts = requests.get(base_url.format('/latest'))
    assert(posts.status_code == requests.codes.ok)

    # trying hashtag endpoints
    posts = requests.get(base_url.format('/hashtags'))
    assert(posts.status_code == requests.codes.ok)

    posts = requests.get(base_url.format('/latest'))
    assert(posts.status_code == requests.codes.ok)

except (AssertionError, ConnectionError, Timeout, TooManyRedirects):
    print('Smoke Test Failed!')
    sys.exit(1)
