const express = require('express');
const router = express.Router();
const db = require("./db/db");
const posts = require("./modules/posts");
const embedids = require("./modules/embedids");
const helpers = require('./helpers');
const fs = require('fs').promises;

const multer = require('multer');


const storageGuestbook = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads/gb/fullres');
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split("/")[1];
    cb(null, `${Date.now()}.${extension}`);
  },
});


const storageDumps = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, req.params.fullPath || '/uploads/dumps');
  },
  filename: function (req, file, cb) {
    const parts = file.originalname.split('.');
    const basename = parts[0] || 'no-name';    
    const extension = parts.length ? parts[parts.length - 1] : file.mimetype.split("/")[1];;

    cb(null, `${basename}-${Date.now()}.${extension}`);
  },
});

const filterGuestbook = (req, file, cb) => {
  const extension = file.mimetype.split("/")[1];
  if (['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(extension.toLowerCase())) {
    cb(null, true);
  } else {
    cb(new Error("Not a jpeg image!"), false);
  }
};


// From guestbook
const uploadImg = multer({storage: storageGuestbook, filterGuestbook}).single('image');

// From upload page
const uploadPictures = multer({storage: storageDumps}).any();

// middleware that is specific to this router
const debugLog = (req, res, next) => {
  console.log('Time: ', new Date().toLocaleString())
  console.log('Data: ', req.params, req.query, req.body, req.file);
  next();
}


router.use(debugLog);

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

// ************ Pictures *************************************

const createUploadDir = (req, res, next) => {
  const name = req.params.name || '__anonymous';
  const dirName = name.replace(/[^a-zA-Z0-9]/g, '').substr(0,20);
  const fullPath = '/uploads/dumps/' + dirName;
  req.params.fullPath = fullPath;
  helpers.verifyDirectory(fullPath);
  console.log('Create Upload Dir', fullPath);
  next();
}

router.post('/upload-pictures/:name', createUploadDir, uploadPictures, (req, res) => {
  const file = req.file;
  const post = { ...req.body };
  console.log(file);
  res.send(200);
});



// ************ DB Init **************************************

router.get('/.db-reinit', async (req, res) => {
  const now = new Date();
  const cutoff = new Date("2023-02-18T08:00:00.000+00:00");
  console.log('DB Init...');
  console.log('Now:    ' + now.toLocaleString());
  console.log('Cutoff: ' + cutoff.toLocaleString());
  if (now.getTime() < cutoff.getTime()) {
    let result = [];
    result.push(await db.dropTables());    
    result.push(await db.createTables());
    result.push(helpers.recreateDirectory('/uploads/gb/fullres')? 'Recreated uploads/fullres.' : 'Error');
    result.push(helpers.recreateDirectory('/uploads/gb/thumbs') ? 'Recreated uploads/thumbs.' : 'Error');
    result.push(helpers.recreateDirectory('/uploads/dumps') ? 'Recreated uploads/dumbs.' : 'Error');
    res.json(result);  
  } else {
    res.send(`Can no longer re-initialize; cutoff date passed.`);
  }
});

module.exports = router