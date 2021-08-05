const { connection } = require('./connection');
const camelcaseKeys = require("camelcase-keys");
const snakecaseKeys = require('snakecase-keys');

module.exports.create = async (feedback) => {
  try {
    const params = [feedback.user_praised_id, feedback.user_id, feedback.message, feedback.pizza, feedback.createdAt];

    const queryResult = await connection.query(`
      INSERT INTO public.feedbacks 
        (user_praised_id, user_id, message, pizza, created_at, updated_at) 
      VALUES
        ($1, $2, $3, $4, $5, $5)
      returning *;
    `, params);

    if (queryResult.rows.length == 0) {
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
    const queryResult = await connection.query("select * from feedbacks");

    return camelcaseKeys(queryResult.rows);
  } catch (error) {
    console.log('>>> error', error);
    throw { databaseError: true, error };
  }
}

module.exports.getOne = async (feedbackId) => {
  try {
    const queryResult = await connection.query("select * from feedbacks where id = $1", [feedbackId]);

    if (queryResult.rows.length == 0) {
      return {};
    }

    return camelcaseKeys(queryResult.rows[0]);

  } catch (error) {
    console.log('>>> error', error);
    throw { databaseError: true, error };
  }
}

module.exports.update = async (feedback) => {
  try {

    feedback.updatedAt = new Date();
    feedback = snakecaseKeys(feedback);

    const fields = ['user_praised_id', 'user_id', 'message', 'pizza', 'updated_at', 'deleted_at'];

    let setFieldsQuery = '';

    const params = [feedback.id];

    for (const key of fields) {
      if (feedback[key]) {
        params.push(feedback[key]);
        setFieldsQuery += `${key} = $${params.length}, `;
      }
    }

    setFieldsQuery = setFieldsQuery.substring(0, setFieldsQuery.length - 2);

    const query = `UPDATE public.feedbacks SET ${setFieldsQuery} where id = $1 returning *;`;

    const queryResult = await connection.query(query, params);

    if (queryResult.rows.length == 0) {
      return {};
    }

    return camelcaseKeys(queryResult.rows[0]);

  } catch (error) {
    console.log('>>> error', error);
    throw { databaseError: true, error };
  }
}

module.exports.delete = async (feedbackId) => {
  try {

    const queryResult = await connection.query("DELETE FROM feedbacks WHERE id = $1 returning *;", [feedbackId]);

    if (queryResult.rows.length == 0) {
      return {};
    }

    return camelcaseKeys(queryResult.rows[0]);

  } catch (error) {
    console.log('>>> error', error);
    throw { databaseError: true, error };
  }
}

module.exports.getFeedbacksByUserId = async (userId) => {
  try {

    let params = [
      userId
    ];

    const queryResult = await connection.query(`
      SELECT  
        x.*,
        array (
          select 
          jsonb_build_object('message', f.message, 'id', f.id, 'created_at', f.created_at)
          from 
            ( select * from ( select distinct on (message) message, id, created_at  from feedbacks where user_id::text = x.id::text ) ff order by created_at desc) f order by created_at desc
        ) "gives",
        array (
          select 
          jsonb_build_object('id', f.id, 'message', f.message, 'created_at', f.created_at )
          from feedbacks f where f.user_praised_id::text = x.id::text order by f.created_at desc
        ) "receiveds"
      FROM 
        users x
      WHERE
        x.id = $1;
    `, params);

    return camelcaseKeys(queryResult.rows);

  } catch (error) {
    throw { databaseError: true, error };
  }
}

// array(
//   select 
//     jsonb_build_object('email', u.email , 'name', u.name, 'activeAccount', cc.active_account)
//   from collaborator_document cd
//   left join collaborator_company cc on cc.id = cd.collaborator_company_id 
//   left join users u on u.id::text = cc.user_id::text
//   where cd.document_id::text = c.source_id::text  
// ) as collaborators,