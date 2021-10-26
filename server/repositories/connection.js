require('dotenv').config();
const { Pool } = require("pg");
let config = {
  user: process.env.USERNAMEPOSTGRES,
  host: process.env.HOST ,
  database: process.env.DATABASE ,
  password: process.env.PASSWORD ,
  port: process.env.PORT,
}

console.log('>>> config', config);

module.exports = {connection: new Pool(config)};