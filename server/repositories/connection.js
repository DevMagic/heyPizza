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
        this.connection = new Pool(this.config);
        break;
    }

    console.log(`Set database on: ${database}`);
  }

  
  getConnection(){
    return this.connection;
  }

}

const connect = new Connect();

module.exports = {connection: connect.getConnection()};
