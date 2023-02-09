const db = require("../db/db");
const { log } = require("../helpers")


const create = async (data) => {  
  try {      
    await db._('embedids').insert(data);
    return log(data);
  } catch (e) {
    return log(e.sqlMessage);
  }
};

const get = async () => {
  try {      
    const embedId = await db._('embedids').orderBy('id', 'desc').first();
    return embedId;    
  } catch (e) {
    return log(e.sqlMessage);
  }
}

const getAll = async () => {
  try {      
    return await db._('embedids')
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