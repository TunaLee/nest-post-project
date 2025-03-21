APP_DIR="/home/ec2-user/nest-app"
echo " Running database migrations..."

cd $APP_DIR

export $(grep -v '^#' .env | xargs)

npm run migration:run

echo "Database migration completed!"