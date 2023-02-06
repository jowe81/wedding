const db = require("../db/db");
const { log } = require("../helpers")


/**
 * Create a user record
 * @param {name, email, plaintextPassword} 
 * @returns a Promise to the new user
 */
const create = async (data) => {  
  try {      
    await db._('posts').insert(data);
    return log(data);
  } catch (e) {
    return log(e.sqlMessage);
  }
};

const get = async id => {
  try {      
    const post = await db._('posts').where('id', id).first();
    return post;    
  } catch (e) {
    return log(e.sqlMessage);
  }
}

const getAll = async () => {
  try {      
    return await db._('posts')
      .orderBy('created_at', 'desc');
  } catch (e) {
    return log(e.sqlMessage);
  }
}

module.exports = {
  create,
  getAll,
  get,
};