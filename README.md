<p align="center">
  <img src="https://github.com/kryptokrona/hugin-cache/blob/main/public/img/hugin_512x512.png?raw=true" alt="Hugin Logo"/>
</p>

<p>
<a href="https://chat.kryptokrona.se">
    <img src="https://img.shields.io/discord/562673808582901793?label=Discord&logo=Discord&logoColor=white&style=flat">
</a> 
<a href="https://github.com/kryptokrona/hugin-cache/actions">
    <img src="https://img.shields.io/github/workflow/status/kryptokrona/hugin-cache/Hugin%20Cache%20Main%20Pipeline">
</a>
<a href="https://github.com/kryptokrona/hugin-cache/issues">
    <img src="https://img.shields.io/github/issues/kryptokrona/hugin-cache">
</a>
<a href="https://github.com/kryptokrona/hugin-cache/pulls">
    <img src="https://img.shields.io/github/issues-pr/kryptokrona/hugin-chat">
</a>
<a href="https://github.com/kryptokrona/hugin-cache/commits/main">
    <img src="https://img.shields.io/github/commit-activity/m/kryptokrona/hugin-cache">
</a>
<a href="https://github.com/kryptokrona/hugin-cache/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/kryptokrona/hugin-cache">
</a>
<a href="https://github.com/kryptokrona/hugin-cache/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/kryptokrona/hugin-cache">
</a>
<a href="https://twitter.com/kryptokrona">
    <img src="https://img.shields.io/twitter/follow/kryptokrona">
</a>
</p>

# About

To be able to get data more easily from Hugin Messenger this RESTful API called Hugin Cache was created. It provides useful endpoints for within the Kryptokrona project as well as other external 3rd party interests. 

# Technologies

- Node.js
- ExpressJS
- Pug
- PostgreSQL

And a lot of other packages/libraries which can seen in **package.json**.

# API Endpoints

All available API endpoints can be seen here on our Postman: https://www.postman.com/kryptokrona?tab=collections

## Examples

Below are some code examples in JavaScript and Python how to use the Hugin Cache to get data. To just try out the API and check out what kind of data that we expect to get back we recommend you check out our Postman.

### JavaScript

**POSTS**

Get all posts:

```javascript
import axios from 'axios'

axios.get('http://localhost:3000/api/v1/posts')
  .then(response => {
    console.log(response)
  })
  .catch(err => {
    console.log('ERROR: Could not get all posts from Hugin Cache.')
  })
```

**HASHTAGS**

Get trending hashtags:

```javascript
import axios from 'axios'

axios.get('http://localhost:3000/api/v1/hashtags/trending')
  .then(response => {
    console.log(response)
  })
  .catch(err => {
    console.log('ERROR: Could not get all trending hashtags from Hugin Cache.')
  })
```

### Python

**POSTS**

Get all posts:

```python
import requests
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects

API_URL = 'http://localhost:3000/api/v1/posts'

try:
    headers = {'Content-Type': 'application/json'}
    response = requests.get(API_URL, headers=headers)
    print(response.json())
except (ConnectionError, Timeout, TooManyRedirects):
    print('ERROR: Could not get all posts from Hugin Cache.')
```


**HASHTAGS**

Get trending hashtags:

```python
import requests
from requests.exceptions import ConnectionError, Timeout, TooManyRedirects

API_URL = 'http://localhost:3000/api/v1/hashtags/trending'

try:
    headers = {'Content-Type': 'application/json'}
    response = requests.get(API_URL, headers=headers)
    print(response.json())
except (ConnectionError, Timeout, TooManyRedirects):
    print('ERROR: Could not get all trending hashtags from Hugin Cache.')
```

# Database Diagram

This Database Diagram demonstrates how we store the data:

![Hugin Cache Database Diagram](./diagrams/database-diagram.jpg)

To edit the diagram open up the file inside the directory **diagrams** called **database-diagram.drawio**.

# Usage

- `npm install nodemon -g`

- `npm install`

- `npm run dev`

# Test environment

To just test the code, the easiest way is to use Docker Compose to orchestrate up the environment since we then don't have to install and configure the PostgreSQL database. 

Run the following to start orchestrating (note the -f flag for specifying the dev Docker Compose file):

- `docker-compose -f docker-compose.dev.yml up`

If we have done some changes to our code we need to run `docker-compose up --build` to force rebuilding the images.

We can also run `docker-compose up --scale postgres=0` to just run the Hugin Cache Docker container without the PostgreSQL database.

If we already have a database up and configured we can run the following to build and start the Hugin Cache docker image:

```
docker run -p 3000:3000 \
    --name hugin-cache \
    -e POSTGRESQL_HOSTNAME=postgres \
    -e POSTGRESQL_PORT=5432 \
    -e POSTGRESQL_DB_NAME=hugin_cache_dev \
    -e POSTGRESQL_DB_USER=postgres \
    -e POSTGRESQL_DB_PASSWORD=test1234 \
    -e NODE_ENV=development
```

# Unit testing

Unit tests are conducted using Mocha and Chai. All unit tests can be found under the **tests** directory in the root of
this repository.

To run the tests:

- `npm run test`

# Code Coverage

We are using C8 as the tool to execute the code coverage. This is not currently implemented. An issue exists to do this: https://github.com/kryptokrona/hugin-cache/issues/4

# Build, Test and Deployment

This project is automatically built, tested and deployed using GitHub Actions. We have two pipelines:

- **Main Pipeline** - This is the pipeline that runs the code merged into our main branch.
- **Pull Request Pipeline** - This is the pipeline that runs each time a pull request come in so the reviewer has some help evaluating the code health.

The Main Pipeline do everything the Pull Request Pipeline does in addition to building and publishing a Docker Image to
the project tagged by the project name, owner, repository and short form of commit SHA value. We also setup continuous deployment
so if all the steps succeed the server will update its currently running docker container with a new image.

To learn how we deploy to our VPS read the documentation here: [Ansible Documentation](ansible/README.md)

# Deploy to your own VPS

To deploy this application we have two files in the **deploy** directory of this repository called `setup.sh` and `deploy.sh`. To deploy, simply just copy these files 
to your VPS then modify these environment variables in the file `setup.sh`:

```
POSTGRES_DB=hugin_cache_prod
POSTGRES_USER=postgres
POSTGRES_PASSWORD=test1234
DATABASE_URL=postgres://postgres:$POSTGRES_PASSWORD@127.0.0.1:5432/$POSTGRES_DB
DOMAINS=(example.org www.example.org)
EMAIL=user@user.com
```

Then we need to update the nginx.conf with the domain you want to use.

Then make the files executable and run it:

- `sudo chmod +x setup.sh`
- `sudo chmod +x deploy.sh`
- `./setup.sh`
- `./deploy.sh`

# Contribute

## Pull request

We appreciate all contributions whether it be small changes such as documentation of source code to major improvement of code. The easiest way is to make a fork and then make a pull request into our main branch. To make the PR go through make sure to include this information:

```
What does this PR do?

Why are these changes required?

This PR has been tested using (e.g. Unit Tests, Manual Testing):

Extra details?
```

A pull request is approved if the GitHub Actions pipeline is marked green. Otherwise it will be closed directly. Always make sure to run the unit tests before creating a pull request.

# Help and Support

For questions and support please use the channel #support in Kryptokrona Discord server. The issue tracker is for bug reports and feature discussions only.

# FAQ

Will come later.

# Contributors


<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/mjovanc"><img src="https://avatars.githubusercontent.com/u/33717111?v=4" width="100px;" alt=""/><br /><sub><b>Marcus Cvjeticanin</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/Swepool"><img src="https://avatars.githubusercontent.com/u/36674091?v=4" width="100px;" alt=""/><br /><sub><b>Lukas (Swepool)</b></sub></a><br /></td>
  </tr>
    
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

# License

The license is GPL-3.0 License.