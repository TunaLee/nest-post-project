#!/bin/bash
APP_DIR="/home/ec2-user/nest-app"
APP_NAME="nestjs-app"

echo "🚀 Starting application: $APP_NAME"

cd $APP_DIR

# PM2를 사용하여 실행
pm2 stop $APP_NAME
pm2 start dist/main.js --name $APP_NAME

echo "✅ Application started successfully!"
