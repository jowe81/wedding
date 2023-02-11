const db = require("../db/db");
const { log } = require("../helpers")


/**
 * Create a user record
 * @param {name, email, plaintextPassword} 
 * @returns a Promise to the new user
 */
const create = async (data) => {  
  try {      
    return await db._('posts')
      .insert(data)
      .returning('id')
      .then(([id]) => get(id));
  } catch (e) {
    return log(e.sqlMessage);
  }
};

const attachImage = async (postId, file) => {
  try {
    const { filename } = file;

    return await db._('posts')
      .where('id', postId)
      .update({ 'image': filename })
      .then(() => filename);
  } catch (e) {
    return log(e);
  } 
}

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
  attachImage,
  getAll,
  get,
  //upload,
};