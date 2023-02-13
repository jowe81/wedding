const db = require("../db/db");
const { log, getDateBoundaries } = require("../helpers")

const table = 'viewerStats';

const pushId = async (req) => {    
  try {      
    const viewerId = req.body.viewerId;
    const userAgent = req.header('user-agent');
    const clientIp = req.socket.remoteAddress;
    console.log('Pushing viewerId: ', viewerId, clientIp);
    await db._(table).insert({
      viewerId,      
      userAgent,
      clientIp
    });
    return log('Inserted!');
  } catch (e) {
    return log(e.sqlMessage);
  }
};

const getByViewerId = async (viewerId) => {
  try {      
    console.log('Getting', viewerId);
    const records = await db
      ._(table)
      .where('viewerId', viewerId)
      .orderBy('created_at', 'desc');
    console.log('got records', records);
    return records;    
  } catch (e) {
    return log(e.sqlMessage);
  }
}

const getByClientIp = async (clientIp) => {
  try {      
    const records = await db
      ._(table)
      .where('clientIp', clientIp)
      .orderBy('created_at', 'desc');
    return records;    
  } catch (e) {
    return log(e.sqlMessage);
  }
}

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

const getUniqueIds = async (date) => {
  try {
    const records = await db
      ._(table)
      .distinct('viewerId');
    return records;
  } catch (e) {
    return log(e.sqlMessage);
  }
}

const getAll = async (date) => {
  try {
    let query = db._(table);

    if (date) {
      const { start, end } = getDateBoundaries(date);

      query = query
        .where('created_at', '>', new Date(start))
        .andWhere('created_at', '<', new Date(end));
    }

    return await query.orderBy('created_at', 'desc');
  } catch (e) {
    return log(e.sqlMessage);
  }
}

module.exports = {
  pushId,
  getAll,
  getByViewerId,
  getByClientIp,    
  getUnique,
};