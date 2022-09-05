import requests
import sys
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects

try:
    domain = str(sys.argv[1])
    base_url = 'https://{}/{}'

    # trying v1 posts endpoints
    print('GET ' + base_url.format(domain ,'api/v1/posts'))
    posts = requests.get(base_url.format(domain, 'api/v1/posts'))
    assert posts.status_code == requests.codes.ok

    print('GET ' + base_url.format(domain, 'api/v1/posts/latest'))
    posts = requests.get(base_url.format(domain, 'api/v1/posts/latest'))
    assert posts.status_code == requests.codes.ok

    # trying v2 posts endpoints
    print('GET ' + base_url.format(domain ,'api/v2/posts'))
    posts = requests.get(base_url.format(domain, 'api/v2/posts'))
    assert posts.status_code == requests.codes.ok

    print('GET ' + base_url.format(domain, 'api/v2/posts/latest'))
    posts = requests.get(base_url.format(domain, 'api/v2/posts/latest'))
    assert posts.status_code == requests.codes.ok

    # trying hashtag endpoints
    print('GET ' + base_url.format(domain, 'api/v1/hashtags'))
    posts = requests.get(base_url.format(domain, 'api/v1/hashtags'))
    assert posts.status_code == requests.codes.ok

    print('GET ' + base_url.format(domain, 'api/v1/hashtags/latest'))
    posts = requests.get(base_url.format(domain, 'api/v1/hashtags/latest'))
    assert posts.status_code == requests.codes.ok

    # trying v1 encrypted posts endpoints
    print('GET ' + base_url.format(domain ,'api/v1/posts-encrypted'))
    posts = requests.get(base_url.format(domain, 'api/v1/posts-encrypted'))
    assert posts.status_code == requests.codes.ok

    print('GET ' + base_url.format(domain, 'api/v1/posts-encrypted/latest'))
    posts = requests.get(base_url.format(domain, 'api/v1/posts-encrypted/latest'))
    assert posts.status_code == requests.codes.ok

    # trying v2 encrypted posts endpoints
    print('GET ' + base_url.format(domain ,'api/v2/posts-encrypted'))
    posts = requests.get(base_url.format(domain, 'api/v2/posts-encrypted'))
    assert posts.status_code == requests.codes.ok

    print('GET ' + base_url.format(domain, 'api/v2/posts-encrypted/latest'))
    posts = requests.get(base_url.format(domain, 'api/v2/posts-encrypted/latest'))
    assert posts.status_code == requests.codes.ok

    # trying v1 hashtag endpoints
    print('GET ' + base_url.format(domain, 'api/v1/hashtags'))
    posts = requests.get(base_url.format(domain, 'api/v1/hashtags'))
    assert posts.status_code == requests.codes.ok

    print('GET ' + base_url.format(domain, 'api/v1/hashtags/latest'))
    posts = requests.get(base_url.format(domain, 'api/v1/hashtags/latest'))
    assert posts.status_code == requests.codes.ok

    # trying v2 hashtag endpoints
    print('GET ' + base_url.format(domain, 'api/v2/hashtags'))
    posts = requests.get(base_url.format(domain, 'api/v2/hashtags'))
    assert posts.status_code == requests.codes.ok

    print('GET ' + base_url.format(domain, 'api/v2/hashtags/latest'))
    posts = requests.get(base_url.format(domain, 'api/v2/hashtags/latest'))
    assert posts.status_code == requests.codes.ok

    # trying prometheus metrics
    print('GET ' + base_url.format(domain, 'metrics'))
    prometheus_metrics = requests.get(base_url.format(domain, 'metrics'))
    assert prometheus_metrics.status_code == requests.codes.ok

    # trying hugin api dashboard
    print('GET ' + base_url.format(domain, 'dashboard'))
    dashboard = requests.get(base_url.format(domain, 'dashboard'))
    assert dashboard.status_code == requests.codes.ok

    # trying hugin api api docs
    print('GET ' + base_url.format(domain, 'api/docs'))
    api_docs = requests.get(base_url.format(domain, 'api/docs'))
    assert api_docs.status_code == requests.codes.ok

    print('\nSMOKE TEST PASSED!')
except (AssertionError, ConnectionError, Timeout, TooManyRedirects):
    print('Smoke Test Failed!')
    sys.exit(1)
