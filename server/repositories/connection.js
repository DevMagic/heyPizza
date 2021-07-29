require('dotenv').config();
const { Pool } = require("pg");

class Connect {

  config = {
    user: process.env.USER ,
    host: process.env.HOST ,
    database: process.env.DATABASE ,
    password: process.env.PASSWORD ,
    port: process.env.PORT,
  }

  connection = null;

  constructor(database = 'postgres'){
    switch (database) {
      case  'postgres':
        this.connection = new Pool(config);
        break;
    }
  }

  
  getConnection(){
    return connection;
  }

}

const connect = new Connect();

module.exports = {connection: connect.getConnection()};
