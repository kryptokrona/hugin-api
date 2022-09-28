# <img src="https://raw.githubusercontent.com/kryptokrona/kryptokrona-python-sdk/master/kryptokrona.png" alt="XKR" height="36" /> Hugin ML

Hugin ML aims to process data from a Hugin API using Machine Learning algorithms to perform classifications and translations.

## Technologies

Hugin ML is built using:

- Python 3
- Flask
- Tensorflow
- Keras

## How to start the app

```shell
python3 app.py
```

We should now get a similar output:

```shell
* Serving Flask app 'app' (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: on
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 316-584-348
```

## How to run Hugin ML with Hugin API

The easiest to test this application along with Hugin API is to use Docker Compose. First go to
the root of this repository and run:

```shell
docker-compose up
```

Another option is to run this app as standalone as we saw in previous section and then run Hugin API also using the
available run configuration. 