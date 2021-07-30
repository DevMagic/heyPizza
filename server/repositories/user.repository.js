const { connection } = require('./connection');
const camelcaseKeys = require("camelcase-keys");
const snakecaseKeys = require('snakecase-keys');

module.exports.create = async (user) => {

  try {
  
    const params = [user.name, user.profileImageUrl, user.externalId];
    
    const queryResult = await connection.query(`
      INSERT INTO public.users 
        ("name", profile_image_url, external_id, created_at, updated_at) 
      VALUES
        ($1, $2, $3, now(), now())
      returning *;
    `, params );

    if(queryResult.rows.length == 0){
      return {};
    }

    return camelcaseKeys(queryResult.rows[0]);

  } catch (error) {
    console.log('>>> error', error);
    throw { databaseError: true, error };    
  }
}

module.exports.getAll = async () => {
  try {
    
    const queryResult = await connection.query("select * from users");

    return camelcaseKeys(queryResult.rows);

  } catch (error) {    
    throw { databaseError:true, error };    
  }
}

module.exports.getOne = async (userId) => {
  try {
    
    const queryResult = await connection.query("select * from users where id = $1", [userId]);

    if(queryResult.rows.length == 0){
      return {};
    }

    return camelcaseKeys(queryResult.rows[0]);

  } catch (error) {
    throw { databaseError:true, error };    
  }
}

module.exports.update = async (user) => {
  try {
    user.updatedAt = new Date();
    user = snakecaseKeys(user);
    
    const fields = ['name', 'profile_image_url', 'external_id', 'updated_at', 'deleted_at']
    let setFieldsQuery = '';
    const params = [user.id];
    for (const key of fields) {
      if(user[key]){
        params.push(user[key]);
        setFieldsQuery += `${key} = $${params.length}, `;
      }
    }

    setFieldsQuery = setFieldsQuery.substring(0, setFieldsQuery.length - 2);

    const query = `UPDATE public.users SET ${setFieldsQuery} where id = $1 returning *;`;
    
    const queryResult = await connection.query(query, params);

    if(queryResult.rows.length == 0){
      return {};
    }

    return camelcaseKeys(queryResult.rows[0]);

  } catch (error) {
    console.log('>>> error', error);
    throw { databaseError: true, error };    
  }
}

module.exports.delete = async (userId) => {
  try {
    
    const queryResult = await connection.query("DELETE FROM users WHERE id = $1 returning *;", [userId]);

    if(queryResult.rows.length == 0){
      return {};
    }

    return camelcaseKeys(queryResult.rows[0]);

  } catch (error) {
    throw { databaseError:true, error };    
  }
}