const db = require("./connect");
const { log } = require("../helpers")

createTables = async () => {

  console.log("Creating tables...");

  try {

    // Create a table
    await db.schema
      .createTable('posts', table => {
        table.increments('id');
        table.string('name');
        table.string('location');
        table.string('email');
        table.string('text');
        table.timestamp('created_at')
          .defaultTo(db.fn.now());
      });    
    return log('Created table posts.');
  } catch(e) {
    return log(e.sqlMessage);
  };  

}

dropTables = async () => {

  console.log("Dropping tables...");

  try {
    await db.schema.dropTable('posts');
    return log('Dropped table posts.');
  } catch (e) {
    return log(e.sqlMessage);
  }

}

module.exports = { 
  createTables,
  dropTables,
  _ : db,
};

