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
        table.string('city');
        table.string('country');
        table.string('email');
        table.text('text', 'mediumtext');
        table.timestamp('created_at')
          .defaultTo(db.fn.now());
      });    

    await db.schema
      .createTable('embedids', table => {
        table.increments('id');
        table.string('embedid');
        table.timestamp('created_at')
          .defaultTo(db.fn.now());
      });    

      console.log('Inserting default id: PogK0wZLFiQ');
      await db('embedids').insert({ embedid: 'PogK0wZLFiQ' });
      
    return log('Created tables posts, embedid; inserted default id.');
  } catch(e) {
    console.log(e);
    return log(e.sqlMessage);
  };  

}

dropTables = async () => {

  console.log("Dropping tables...");

  try {
    await db.schema.dropTable('posts');
    await db.schema.dropTable('embedids');
    return log('Dropped tables post, embedids.');
  } catch (e) {
    return log(e.sqlMessage);
  }

}

module.exports = { 
  createTables,
  dropTables,
  _ : db,
};

