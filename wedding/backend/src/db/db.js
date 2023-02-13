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
        table.string('image');
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

      await db.schema
      .createTable('viewerStats', table => {
        table.increments('id');
        table.string('viewerId');
        table.string('userAgent');
        table.string('clientIp');
        table.timestamp('created_at')
          .defaultTo(db.fn.now());
      });    

      await db.schema
      .createTable('files', table => {
        table.increments('id');
        table.string('uploaderName');
        table.string('originalName');
        table.string('extension');
        table.string('type');
        table.string('name');
        table.timestamp('created_at')
          .defaultTo(db.fn.now());
      });    

      

    return log('Created tables posts, viewerStats, files, embedid; inserted default id.');
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
    await db.schema.dropTable('viewerStats');
    await db.schema.dropTable('files');
    return log('Dropped tables post, embedids, viewerStats, files.');
  } catch (e) {
    return log(e.sqlMessage);
  }

}

module.exports = { 
  createTables,
  dropTables,
  _ : db,
};

