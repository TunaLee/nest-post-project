#!/bin/bash

APP_DIR="/home/ec2-user/build"
APP_NAME="nestjs-app"

# pm2 경로 확인
PM2_PATH=$(which pm2)

# pm2 경로 확인 후 설치가 안되었으면 설치
if [ -z "$PM2_PATH" ]; then
    echo "pm2가 설치되지 않았습니다. pm2를 설치합니다."
    npm install pm2 -g
    PM2_PATH=$(which pm2)  # pm2 설치 후 경로 재확인
    if [ -z "$PM2_PATH" ]; then
        echo "pm2 설치 실패. 종료합니다."
        exit 1
    fi
fi

# 애플리케이션 시작
echo "Starting application: $APP_NAME"

cd $APP_DIR || { echo "디렉토리 변경 실패"; exit 1; }

# 기존 pm2 애플리케이션 중지
$PM2_PATH stop $APP_NAME || echo "$APP_NAME 애플리케이션이 실행 중이지 않습니다."

# 애플리케이션 시작
$PM2_PATH start dist/main.js --name $APP_NAME

# pm2 상태 확인 (선택사항)
$PM2_PATH status
