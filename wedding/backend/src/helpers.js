const fs = require('fs');

const verifyDirectory = path => {
  const dir = '/uploads/thumbs/'; 

  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }
};

const log = (msg) => {
  console.log(msg);
  return msg;
}


module.exports = {
  verifyDirectory,
  log,
}