echo "Starting application: nestjs-app"

APP_DIR="/home/ec2-user/build"
APP_NAME="nestjs-app"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

npm install -g pm2

PM2_PATH=$(which pm2)
$PM2_PATH stop $APP_NAME || echo "$APP_NAME 애플리케이션이 실행 중이지 않습니다."

# 애플리케이션 시작
$PM2_PATH start dist/main.js --name $APP_NAME

# pm2 상태 확인 (선택사항)
$PM2_PATH status