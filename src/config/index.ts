import * as env from 'dotenv';
env.config();

export default {
  port: parseInt(process.env.PORT!, 10),
  address: process.env.ADDRESS!,
  database: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    name: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    runMigrations: process.env.DB_RUN_MIGRATIONS,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  hashSalt: parseInt(process.env.HASH_SALT!, 10),
};
