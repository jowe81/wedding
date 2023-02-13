const fs = require('fs');

const verifyDirectory = (path) => {
  try {
    console.log(`Verifying (create if not exists) ${path}`);
    if (!fs.existsSync(path)){
      fs.mkdirSync(path, { recursive: true });
      console.log(`...created.`);
    } else {
      console.log(`...exists.`);
    }
  } catch (err) {
    console.log(`Error while verifying ${path}.`);
  }
};


// Delete and recreate
const recreateDirectory = async path => {
  try {
    verifyDirectory(path);
    console.log(`Delete recursively: ${path}`);
    fs.rmSync(path, { recursive: true});
    console.log(`...done`);
    verifyDirectory(path);
  } catch (err) {
    return log(`Error while recreating ${path}`);
  }
}

const log = (msg) => {
  console.log(msg);
  return msg;
}

//Return first and last timestamp for the day the date falls in
const getDateBoundaries = (date) => {
  const s = date.toDateString();

  const beginning = new Date(s);
  const end = beginning.getTime() + (1000 * 60 * 60 * 24) - 1;
  
  const boundaries = {
    start: beginning.getTime(),
    end: end,
  }    
  
  return boundaries;
}


module.exports = {
  verifyDirectory,
  recreateDirectory,
  log,
  getDateBoundaries,
}