import requests
import sys
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects

try:
    base_url = 'https://cache.hugin.chat/api/v1/{}'

    # trying posts endpoints
    print('GET ' + base_url.format('posts'))
    posts = requests.get(base_url.format('posts'))
    assert posts.status_code == requests.codes.ok

    print('GET ' + base_url.format('posts/latest'))
    posts = requests.get(base_url.format('posts/latest'))
    assert posts.status_code == requests.codes.ok

    # # trying hashtag endpoints
    print('GET ' + base_url.format('hashtags'))
    posts = requests.get(base_url.format('hashtags'))
    assert posts.status_code == requests.codes.ok

    print('GET ' + base_url.format('hashtags/latest'))
    posts = requests.get(base_url.format('hashtags/latest'))
    assert posts.status_code == requests.codes.ok

    print('\nSMOKE TEST PASSED!')
except (AssertionError, ConnectionError, Timeout, TooManyRedirects):
    print('Smoke Test Failed!')
    sys.exit(1)
