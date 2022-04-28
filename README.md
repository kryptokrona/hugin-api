![Hugin Neon](./public/img/hugin-neon.png)

<p>
<a href="https://chat.kryptokrona.se"><img src="https://img.shields.io/discord/562673808582901793?label=Discord&logo=Discord&logoColor=white&style=plastic"></a> 
<a href="https://github.com/kryptokrona/hugin-cache/releases"><img src="https://img.shields.io/github/v/release/kryptokrona/hugin-cache?label=Release&style=plastic"></a>
<a href="https://github.com/kryptokrona/hugin-cache/releases"><img src="https://img.shields.io/github/downloads/kryptokrona/hugin-cache/total?label=Downloads&style=plastic"></a>
<a href="https://twitter.com/kryptokrona"><img src="https://img.shields.io/twitter/follow/kryptokrona"></a>
</p>

## About

To be able to get data more easily from Hugin Messenger this RESTful API called Hugin Cache was created. It provides useful endpoints for within the Kryptokrona project as well as other external 3rd party interests. 

## Technologies

- Node.js
- ExpressJS
- Pug
- PostgreSQL

And a lot of other packages/libraries which can seen in **package.json**.

## Usage

- `npm install nodemon -g`

- `npm install`

- `npm run dev`

## Test environment

To just test the code, the easiest way is to use Docker Compose to orchestrate up the environment since we then don't have to install and configure the PostgreSQL database. 

Run the following to start orchestrating:

- `docker-compose up`

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

## Unit testing

Unit tests are conducted using Mocha and Chai. All unit tests can be found under the **tests** directory in the root of
this repository.

To run the tests:

- `npm run test`

## Code Coverage

We are using C8 as the tool to execute the code coverage. This is not currently implemented. An issue exists to do this: https://github.com/kryptokrona/hugin-cache/issues/4

## Build, Test and Deployment

This project is automatically built, tested and deployed using GitHub Actions. We have two pipelines:

- **Main Pipeline** - This is the pipeline that runs the code merged into our main branch.
- **Pull Request Pipeline** - This is the pipeline that runs each time a pull request come in so the reviewer has some help evaluating the code health.

The Main Pipeline do everything the Pull Request Pipeline does in addition to building and publishing a Docker Image to
the project tagged by the project name, owner, repository and short form of commit SHA value. We also setup continuous deployment
so if all the steps succeed the server will update its currently running docker container with a new image. 

## Contribute

### Pull request

We appreciate all contributions whether it be small changes such as documentation of source code to major improvement of code. The easiest way is to make a fork and then make a pull request into our main branch. To make the PR go through make sure to include this information:

```
What does this PR do?

Why are these changes required?

This PR has been tested using (e.g. Unit Tests, Manual Testing):

Extra details?
```

A pull request is approved if the GitHub Actions pipeline is marked green. Otherwise it will be closed directly. Always make sure to run the unit tests before creating a pull request.

## Contributors


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

## License

The license is GPL-3.0 License.