const express = require('express');
const router = express.Router();
const db = require("./db/db");
const posts = require("./modules/posts");
// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  console.log('Data: ', req.params, req.query, req.body);
  next()
})


// Get single entry
router.get('/posts/:id', (req, res) => {  
  posts
    .get(req.params.id)
    .then(post => res.send(post));
})


// Get all entries
router.get('/posts', (req, res) => {
  posts
    .getAll()
    .then(posts => res.send(posts));
})

router.post('/posts', (req, res) => {
  posts.create(req.body, 'req.body');
  res.send('200');
});

router.get('/create_tables', async (req, res) => {
  let result = [];
  if (req.query.drop !== undefined) {
    result.push(await db.dropTables());    
  }
  result.push(await db.createTables());
  res.send(result.join('\r\n'));
});

module.exports = router