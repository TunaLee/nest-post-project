#!/bin/bash
APP_NAME="nestjs-app"

echo "🛑 Stopping application: $APP_NAME"

# PM2를 사용하여 애플리케이션 중지
pm2 stop $APP_NAME
pm2 delete $APP_NAME

echo "✅ Application stopped successfully!"
