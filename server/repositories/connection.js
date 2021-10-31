const { Pool } = require("pg");
let config = {
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST ,
  database: process.env.DB_DATABASE ,
  password: process.env.DB_PASSWORD ,
  port: process.env.DB_PORT,
}

const pool = new Pool(config);

const db = () => {
  return {
    query: async (query, params) => {
      let client = await pool.connect(),
        result;
      try{
        result = await client.query(query, params);
      }
      catch(e){
        client.release();
        throw e;
      }
      client.release();
      return result;
    }
  }
};

module.exports = {connection: db()};
