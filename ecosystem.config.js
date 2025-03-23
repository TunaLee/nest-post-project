module.exports = {
    apps: [
      {
        name: 'nestjs-app',
        script: 'dist/main.js',
        env: {
          NODE_ENV: 'production',
          PORT: 3000,
        },
      },
    ],
  };
  