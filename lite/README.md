# <img src="https://raw.githubusercontent.com/kryptokrona/kryptokrona-python-sdk/master/kryptokrona.png" alt="XKR" height="36" /> Hugin API Lite

Hugin API Lite is a smaller API mostly for usage in your local area network to save messages.

## How to setup

Prerequisites:

- Download and install Docker, check this guide out if you are unsure how Docker works: https://medium.com/dev-genius/get-started-with-docker-and-docker-compose-cddcb5a3f3b9

To set up Hugin API Lite we will be using Docker Compose to orchestrate up the environment.

1. Clone this repo https://github.com/kryptokrona/hugin-api.git
2. Open up your terminal and navigate to the repo and go to /lite directory
3. Run `docker-compose up` to get both the database up and Hugin API Lite up and running.

Now you should be able to get data from the endpoints at:

- `http://localhost:3000/posts`
- `http://localhost:3000/posts-encrypted`
- `http://localhost:3000/posts-encrypted-group`

You can put request params as well, but please look into the controllers to see which one exists.
