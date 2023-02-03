require('dotenv').config();

const development = {
  username: process.env.MYSQL_AWS_USERNAME,
  password: process.env.MYSQL_AWS_PASSWORD,
  database: process.env.MYSQL_AWS_DATABASE,
  host: process.env.MYSQL_AWS_HOST,
  dialect: 'mysql',
};

const test = {
  username: 'root',
  password: null,
  database: 'database_test',
  host: '127.0.0.1',
  dialect: 'mysql',
};

const production = {
  username: 'root',
  password: null,
  database: 'database_production',
  host: '127.0.0.1',
  dialect: 'mysql',
};

module.exports = { development, test, production };