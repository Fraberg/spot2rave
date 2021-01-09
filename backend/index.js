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
let redirect_uri = "http://localhost:8888/callback";

app.get("/login", function(req, res) {
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

app.get("/callback", function(req, res) {
  // 1 ------ auth
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
          "71a3a5397b9840098bdde0bddd938121" +
            ":" +
            "84a667332cba491981767834358ed790"
        ).toString("base64")
    },
    json: true
  };
  let access_token;
  request.post(authOptions, function(error, response, body) {
    access_token = body.access_token;
    console.log("access_token:", access_token);
    // let uri = "http://localhost:3000/results";
    // res.redirect(uri + "?access_token=" + access_token);

    // 2 ------ get data
    const options = {
      url: "https://api.spotify.com/v1/me",
      headers: { Authorization: "Bearer " + access_token },
      json: true
    };

    const topOptions = {
      url: "https://api.spotify.com/v1/me/top/tracks",
      headers: { Authorization: "Bearer " + access_token },
      json: true
    };

    // use the access token to access the Spotify Web API
    request.get(topOptions, function(error, response, body) {
      console.log("response.statusCode:", response.statusCode);
      if (error) {
        console.log("error:", error);
      } else {
        // console.log("body:", body);
        for (let i = 0; i < body.items.length; i++) {
          console.log(i, "------");
          // console.log(Object.keys(body.items[i]));
          console.log(body.items[i].name);
          console.log(body.items[i].popularity);
          console.log(body.items[i].type);
          console.log(body.items[i].album);
          console.log(body.items[i].href);
          console.log(body.items[i].track_number);
          console.log(body.items[i].artists);
        }
      }
    });

    let uri = "http://localhost:3000/results";
    res.redirect(uri + "?access_token=" + access_token);
  });
});
// *************************************************

// middleware logger
app.use(morgan("dev"));
// some stuff we need
app.use("/public", express.static(path.join(__dirname, "public")));

// 3 ------- finally connect
app.listen(8888, () => {
  console.log("Running on port 8888");
});
