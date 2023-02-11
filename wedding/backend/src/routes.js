const express = require('express');
const router = express.Router();
const db = require("./db/db");
const posts = require("./modules/posts");
const embedids = require("./modules/embedids");


const multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads');
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split("/")[1];
    cb(null, `${Date.now()}.${extension}`);
  },
});

const fileFilter = (req, file, cb) => {
  const extension = file.mimetype.split("/")[1];

  if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension.toLowerCase())) {
    console.log('storing image');
    cb(null, true);
  } else {
    cb(new Error("Not a jpeg image!"), false);
  }
};

const uploadImg = multer({storage, fileFilter}).single('image');

// middleware that is specific to this router
const debugLog = (req, res, next) => {
  console.log('Time: ', new Date().toLocaleString())
  console.log('Data: ', req.params, req.query, req.body, req.file);
  next();
}


//router.use(debugLog);


// ************ Posts ***************************************

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

// Create a new entry
router.post('/posts', uploadImg, (req, res) => {
  const file = req.file;
  const post = { ...req.body };
  posts
    .generateThumb(file)
    .then(() => posts.create({ ...req.body, image: file?.filename}))    
    .then(post => res.json({ post }))
    .catch(e => {
      res.error('500');
    });
});

// ************ Embed-id *************************************
router.post('/embed-id', (req, res) => {
  embedids
    .create(req.body)
    .then(embedid => res.send(embedid));
});

router.get('/embed-id', (req, res) => {
  embedids
    .get()
    .then(embedid => res.send(embedid));
});

// ************ Embed-id *************************************

router.get('/create_tables', async (req, res) => {
  let result = [];
  if (req.query.drop !== undefined) {
    result.push(await db.dropTables());    
  }
  result.push(await db.createTables());
  res.send(result.join('\r\n'));
});

module.exports = router