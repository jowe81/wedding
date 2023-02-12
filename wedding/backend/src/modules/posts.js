const db = require("../db/db");
const { log, verifyDirectory } = require("../helpers")
const sharp = require('sharp');


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

const generateThumb = async (file) => {
  try {
    verifyDirectory(`/uploads/thumbs/`);

    let inputPath = `/uploads/fullres/`;
    let outputPath = `/uploads/thumbs/`
    
    const { filename } = file;
    
    return sharp(inputPath + filename)
        .resize({ width: 250 })
        .toFile(outputPath + filename)
        .then(function(newFileInfo) {
            console.log("Successfully resized", newFileInfo);
        })
        .catch(function(err) {
            console.log("Error occured", err);
        });    
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
  generateThumb,
  getAll,
  get,
  //upload,
};