#!/bin/bash
APP_DIR="/home/ec2-user/build"
APP_NAME="nestjs-app"
PM2_PATH=$(which pm2)

echo "Starting application: $APP_NAME"

cd $APP_DIR


$PM2_PATH stop $APP_NAME
$PM2_PATH start dist/main.js --name $APP_NAME