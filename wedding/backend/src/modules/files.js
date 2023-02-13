const db = require("../db/db");
const { log, getDateBoundaries } = require("../helpers")

const table = 'files';

const add = async (data) => {  
  try {      
    return await db._(table)
      .insert(data)
      .returning('id')
      .then(([id]) => get(id));
  } catch (e) {
    return log(e.sqlMessage);
  }
};

const getUnique = async (field, date) => {

  try {
    let query = db._(table);

    if (date) {
      const { start, end } = getDateBoundaries(date);

      query = query
        .where('created_at', '>', new Date(start))
        .andWhere('created_at', '<', new Date(end));
    }

    return await query.distinct(field);
  } catch (e) {
    return log(e.sqlMessage);
  }
}



const getAll = async (date, { column, value }) => {
  try {
    let query = db._(table);
    
    if (date) {
      
      const { start, end } = getDateBoundaries(date);

      query = query
        .where('created_at', '>', new Date(start))
        .andWhere('created_at', '<', new Date(end));
    }

    if (column) {
      
      if (date) {
        query = query
          .andWhere(column, '=', value);
      } else {
        query = query
          .where(column, '=', value);
      }
    }

    return await query.orderBy('created_at', 'desc');
  } catch (e) {
    return log(e.sqlMessage);
  }
}

module.exports = {
  add,
  getAll,
  getUnique,
};