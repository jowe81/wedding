const express = require('express');
const router = express.Router();
const db = require("./db/db");
const posts = require("./modules/posts");
const embedids = require("./modules/embedids");
const viewerStats = require("./modules/viewerStats");
const files = require('./modules/files');
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
  filename: async function (req, file, cb) {
    const parts = file.originalname.split('.');
    const basename = parts[0] || 'no-name';    
    const extension = parts.length ? parts[parts.length - 1] : file.mimetype.split("/")[1];
    const name = `${basename}-${Date.now()}.${extension}`;
    await files.add({
      uploaderName: req.params.name,
      originalName: file.originalname,
      extension: extension,
      type: file.mimetype.split("/")[0],  
      name,   
    })
    cb(null, name);
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
  console.log('Data: ', req.url, req.params, req.query, req.body, req.file);
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

// ************ Time *****************************************

router.get('/time', (req, res) => {
  const now = new Date();
  res.json({ 
    serverDateStr: now.toString(),
    serverTimestamp: now.getTime()
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

// ************ Viewer-stats *********************************

router.post('/viewer-id', (req, res) => {
  viewerStats
    .pushId(req)
    .then(() => res.end('OK'))
    .catch(err => {
      console.log('Error while storing viewerId.');
    })
});

router.get('/viewer-stats/by/:selector/:data', (req, res) => {

  switch (req.params.selector) {
    case 'id':
      return viewerStats
        .getByViewerId(req.params.data)
        .then(data => {
          res.json(data);
        })
        .catch(err => {
          res.status(500).end();
        });
      break;

    case 'ip':
      return viewerStats
        .getByClientIp(req.params.data)
        .then(data => {
          res.json(data);
        })
        .catch(err => {
          res.status(500).end();
        });
      break;

    case 'unique':
      if (req.params.data === 'ip') {
        return viewerStats
          .getUniqueIps()
          .then(data => res.json(data))
          .catch(err => res.status(500).end());
      } else if (req.params.data === 'id') {
        return viewerStats
          .getUniqueIds()
          .then(data => res.json(data))
          .catch(err => res.status(500).end());
      }
  }
  
  res.status(500).send(`Unable to retrieve data: ${req.params.selector}/${req.params.data}`);
});

router.get('/viewer-stats/all', async (req, res) => {
  try {
    const dateParam = req.query.date;
    const dateParamInt = parseInt(dateParam);
    let date = null;

    if (dateParam === 'today'){
      date = new Date();
      console.log('Getting todays stats');
    } else if (dateParamInt > 0) {
      //Timestamp
      console.log('Getting stats for (timestamp)', dateParamInt);
      date = new Date(dateParamInt);
    } else {
      console.log('Getting all time stats');
    }    

    const data = {
      uniqueIds: await viewerStats.getUnique('viewerId', date),
      uniqueIps: await viewerStats.getUnique('clientIp', date),
      allVisits: await viewerStats.getAll(date),
      contributors: await files.getUnique('uploaderName', date),
      images: await files.getAll(date, { column: 'type', value: 'image' }),
      videos: await files.getAll(date, { column: 'type', value: 'video' }),      
      allFiles: await files.getAll(date, {}),
    }

    if (req.query.countsOnly) {
      const counts = {};

      const keys = Object.keys(data);
      keys.forEach((key, value) => {
        counts[key] = data[key].length;
      });      

      res.json(counts);
    } else {
      res.json(data);
    }
  
  } catch (err) {
    res.status(500).json(err);
  }  
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
    result.push(helpers.recreateDirectory('/uploads/dumps') ? 'Recreated uploads/dumps.' : 'Error');
    res.json(result);  
  } else {
    res.send(`Can no longer re-initialize; cutoff date passed.`);
  }
});

module.exports = router