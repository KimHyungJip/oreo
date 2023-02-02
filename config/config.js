require("dotenv").config();

const development = {//.env git 허브에 올라가는데 보안상
  "username": process.env.MYSQL_AWS_USERNAME,
  "password": process.env.MYSQL_AWS_PASSWORD,
  "database": process.env.MYSQL_AWS_DATABASE,
  "host": process.env.MYSQL_AWS_HOST,
  "dialect": "mysql"
};
const test = {
  "username": "root",
  "password": null,
  "database": "database_test",
  "host": "127.0.0.1",
  "dialect": "mysql"
};
const production = {
  "username": "root",
  "password": null,
  "database": "database_production",
  "host": "127.0.0.1",
  "dialect": "mysql"
};
// {
//   "development": {
//     "username": "root",
//     "password": "Abcd!234",
//     "database": "oreo_bakery",
//     "host": "express-database.cfuxjnpy21qr.ap-northeast-2.rds.amazonaws.com",
//     "dialect": "mysql"
//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
// }

module.exports = { development, test, production }