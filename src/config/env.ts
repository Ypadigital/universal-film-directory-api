require("dotenv").config();
const envName = process.env.NODE_ENV || "development";

interface Ienv {
  NODE_ENV: string;
  DB_URI: string;
  PORT: number | string;
  APP_NAME: string;
  USDT_ADDRESS: string;
  JWT_SECRET_KEY: string;
  WALLET_PRIVATE_KEY: string;
  WALLET_ADDRESS: string;
  RPC_URL: string;
  VAULT_CONTRACT_ADDRESS: string;
  PROVIDER_CONTRACT_ADDRESS: string;
  CLOUDINARY_CONFIG: {
    cloud_name: string;
    api_key: string;
    api_secret: string;
  };
  CLOUDINARY_FOLDER: string;
  [key: string]: any;
}

interface IenvMap {
  [key: string]: Ienv;
}

interface IcommonEnv {
  PORT: number | string;
  APP_NAME: string;
  USDT_ADDRESS: string;
  JWT_SECRET_KEY: string;
  WALLET_PRIVATE_KEY: string;
  WALLET_ADDRESS: string;
  RPC_URL: string;
  VAULT_CONTRACT_ADDRESS: string;
  PROVIDER_CONTRACT_ADDRESS: string;
  CLOUDINARY_CONFIG: {
    cloud_name: string;
    api_key: string;
    api_secret: string;
  };
  CLOUDINARY_FOLDER: string;
  [key: string]: any;
}

//acommon environmental variables for all environments
const common: IcommonEnv = {
  USDT_ADDRESS: process.env.USDT_ADDRESS,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  WALLET_PRIVATE_KEY: process.env.WALLET_PRIVATE_KEY,
  WALLET_ADDRESS: process.env.WALLET_ADDRESS,
  RPC_URL: process.env.RPC_URL,
  VAULT_CONTRACT_ADDRESS: process.env.VAULT_CONTRACT_ADDRESS,
  PROVIDER_CONTRACT_ADDRESS: process.env.PROVIDER_CONTRACT_ADDRESS,
  APP_NAME: process.env.APP_NAME || "mservices",
  OFFICE_ADDRESS: process.env.OFFICE_ADDRESS,
  EMAILER: process.env.EMAILER,
  BASE_URL: process.env.BASE_URL,
  NODEMAILER_CONFIG: {
    host: process.env.MAILER_HOST,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASSWORD,
    },
    secure: true,
  },
  MAILER_DOMAIN: process.env.MAILER_DOMAIN,
  PORT: process.env.PORT || 4140,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SMS_USERNAME: process.env.SMS_USERNAME,
  SMS_API_KEY: process.env.SMS_API_KEY,
  SMS_SENDER: process.env.SMS_SENDER,
  CLOUDINARY_CONFIG: {
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  },
  CLOUDINARY_FOLDER: (() =>
    envName === "development" ? "mservices_dev" : "mservices")(),
};
const development: Ienv = {
  NODE_ENV: "development",
  DB_URI: `mongodb://localhost:27017/${common.APP_NAME}`,
  ...common,
};

const production: Ienv = {
  NODE_ENV: "production",
  DB_URI: process.env.DB_URI,
  ...common,
};

const test: Ienv = {
  NODE_ENV: "test",
  DB_URI: `mongodb://localhost:27017/${common.APP_NAME}_test`,
  ...common,
};

const config: IenvMap = {
  development,
  production,
  test,
};

export default config[envName];
