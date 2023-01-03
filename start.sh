#!/bin/sh

npm run db:migrate

# checking if we have set the alert environment variables or if they are empty strings
if [[ ! -v DEPLOY_ENV ]]; then
    echo "-- Using alert is OFF"
    npm start
elif [[ -z "$DEPLOY_ENV" ]]; then
    echo "-- Using alert is OFF"
    npm start
else
    echo "-- Using alert is ON"
    npm start_alert
fi
