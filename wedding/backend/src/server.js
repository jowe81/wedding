// simple node web server that displays hello world
// optimized for Docker image

require('dotenv').config();
console.log('Environment NODE_ENV: ', process.env.NODE_ENV);

const express = require("express");
// this example uses express web framework so we know what longer build times
// do and how Dockerfile layer ordering matters. If you mess up Dockerfile ordering
// you'll see long build times on every code change + build. If done correctly,
// code changes should be only a few seconds to build locally due to build cache.

const morgan = require("morgan");
// morgan provides easy logging for express, and by default it logs to stdout
// which is a best practice in Docker. Friends don't let friends code their apps to
// do app logging to files in containers.

const db = require("./db/connect");

// Appi
const app = express();

const helmet = require("helmet");
const cors = require("cors");

app.use(morgan("common"));
app.use(express.json()); 
app.use(express.static('/uploads'));
app.use('/images', express.static('/uploads/gb/thumbs'));

app.use(helmet());
app.use(cors());

app.get("/", async function(req, res, next) {

});

const router = express.Router();

app.get("/healthz", function(req, res) {
  // do app logic here to determine if app is truly healthy
  // you should return 200 if healthy, and anything else will fail
  // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
  res.send("I am happy and healthy\n");
});

module.exports = app;
