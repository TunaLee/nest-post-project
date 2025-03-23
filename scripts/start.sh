#!/bin/bash
# 기존 애플리케이션 종료
PID=$(pgrep -f 'node /home/ec2-user/build/main.js')
if [ -n "$PID" ]; then
    sudo kill -9 $PID
fi

# 새 애플리케이션 시작
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
cd /home/ec2-user/build
npm install --production
nohup node /home/ec2-user/build/main.js > /dev/null 2>&1 &
