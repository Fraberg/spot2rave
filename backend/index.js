// 1 ------- requires
const express = require("express");
const bodyParser = require("body-parser");
// const mongoose = require('mongoose')
const morgan = require("morgan");
// const api = require('./routes/api')
// const pets = require('./mock')
const path = require("path");
// adds
let request = require("request");
let querystring = require("querystring");
require('dotenv').config();

// 2 ------- setup
const app = express();

// API response headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
// app.use('/api', api);
// *************************************************
let redirect_uri = "http://localhost:8888/api/spotify/callback";
app.get("/api/spotify/login", function(req, res) {
  console.log('/login')
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: "71a3a5397b9840098bdde0bddd938121",
        scope: "user-read-private user-read-email user-top-read",
        redirect_uri
      })
  );
});
app.get("/api/spotify/callback", function(req, res) {
  console.log('/callback')
  // 1 ------ get token
  let code = req.query.code || null;
  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri,
      grant_type: "authorization_code"
    },
    headers: {
      Authorization:
        "Basic " +
        new Buffer.alloc(
          65,
          process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_SECRET_ID
        ).toString("base64")
    },
    json: true
  };
  let access_token;
  request.post(authOptions, function(error, response, body) {
    access_token = body.access_token;
    // console.log("access_token:", access_token);
    // 2 ------ send token back to front-end
    let uri = `http://localhost:${process.env.PORT}/results`;
    console.log('redirect uri:', uri)
    res.redirect(uri + "?access_token=" + access_token);
  });
});
// *************************************************

// middleware logger
app.use(morgan("dev"));

// Production
if (process.env.NODE_ENV === 'production') {
  // static folder
  app.use(express.static(__dirname + '/public/'));
  // handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
} else {
  // some stuff we need
  app.use("/public", express.static(path.join(__dirname, "public")));
}

// 3 ------- finally connect
app.listen(8888, () => {
  console.log("Running on port 8888");
});
