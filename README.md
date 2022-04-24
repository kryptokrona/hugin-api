![Tux, the Linux mascot](/public/img/hugin-neon.png)

## About

To be able to get data more easily from Hugin Messenger this RESTful API called Hugin Cache was created. It provides useful endpoints for within the Kryptokrona project as well as other external 3rd party interests. 

## Technologies

- Node.js
- ExpressJS
- Pug
- PostgreSQL (node-postgres)

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

## Build Hugin Cache image for production

To build the project ready for production with Docker:

- `docker build -t hugin-cache:0.0.1 .`

This has then to be published on a container registry. More information about it will come later.

## Unit testing

Coming soon...
## Contribute

### Pull request

We appreciate all contributions whether it be small changes such as documentation of source code to major improvement of code. The easiest way is to make a fork and then make a pull request into our main branch. To make the PR go through make sure to include this information:

```
What does this PR do?

Why are these changes required?

This PR has been tested using (e.g. Unit Tests, Manual Testing):

Extra details?
```

## Contributors


<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/mjovanc"><img src="https://avatars.githubusercontent.com/u/33717111?v=4" width="100px;" alt=""/><br /><sub><b>Marcus Cvjeticanin</b></sub></a><br /></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

The license is GPL-3.0 License.