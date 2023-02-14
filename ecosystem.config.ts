module.exports = {
  apps: [
    {
      name: "ufd-api",
      script: "src/index.ts",
      instances: "max",
      env: {
        NODE_ENV: "development",
      },
      env_staging: {
        NODE_ENV: "staging",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
