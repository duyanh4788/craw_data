import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT || '0'),
  dialect: 'mysql',
  models: [__dirname + '/model'],
  logging: false
});
