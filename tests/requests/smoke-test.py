import requests
import sys
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects

try:
    base_url = 'https://cache.hugin.chat/{}'

    # trying posts endpoints
    print('GET ' + base_url.format('api/v1/posts'))
    posts = requests.get(base_url.format('api/v1/posts'))
    assert posts.status_code == requests.codes.ok

    print('GET ' + base_url.format('api/v1/posts/latest'))
    posts = requests.get(base_url.format('api/v1/posts/latest'))
    assert posts.status_code == requests.codes.ok

    # trying hashtag endpoints
    print('GET ' + base_url.format('api/v1/hashtags'))
    posts = requests.get(base_url.format('api/v1/hashtags'))
    assert posts.status_code == requests.codes.ok

    print('GET ' + base_url.format('api/v1/hashtags/latest'))
    posts = requests.get(base_url.format('api/v1/hashtags/latest'))
    assert posts.status_code == requests.codes.ok

    # trying prometheus metrics
    print('GET ' + base_url.format('metrics'))
    prometheus_metrics = requests.get(base_url.format('metrics'))
    assert prometheus_metrics.status_code == requests.codes.ok

    # trying hugin cache dashboard
    print('GET ' + base_url.format('dashboard'))
    dashboard = requests.get(base_url.format('dashboard'))
    assert dashboard.status_code == requests.codes.ok

    print('\nSMOKE TEST PASSED!')
except (AssertionError, ConnectionError, Timeout, TooManyRedirects):
    print('Smoke Test Failed!')
    sys.exit(1)
