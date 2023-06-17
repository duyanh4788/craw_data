#!/bin/bash

# waiting Redis start up
./scripts/wait-for-it.sh -t 0 redis:6380 -- echo "Redis have start up!"

# waiting MySQL start up
./scripts/wait-for-it.sh -t 0 mysql:3307 -- echo "MySQL have start up!"

# waiting RabbitMQ start up
./scripts/wait-for-it.sh -t 0 rabbitmq:5673 -- echo "RabbitMQ have start up!"

# run server
function start_server {
    node build/server.js
}

# waiting services start up
wait_for_services() {
    echo "Waiting Redis, MySQL && RabbitMQ start up..."
    ./scripts/wait-for-it.sh -t 0 redis:6380 -- \
    ./scripts/wait-for-it.sh -t 0 mysql:3307 -- \
    ./scripts/wait-for-it.sh -t 0 rabbitmq:5673 -- \
    start_server
}

# process services start up
wait_for_services
