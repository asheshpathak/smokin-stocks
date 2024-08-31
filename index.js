const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5999;
var fyersModel = require("fyers-api-v3").fyersModel;
var fyers = new fyersModel({
  //   path: "./logs.txt",
  //   enableLogging: true,
});

fyers.setAppId("4IBAWZ841D-100");

fyers.setRedirectUrl(
  "https://morning-river-75539-0158946b6190.herokuapp.com/get/authcode"
);

// fyers.setRedirectUrl("http://localhost:5999/get/authcode");

var URL = fyers.generateAuthCode();

//use url to generate auth code
console.log(URL);

app.get("/", (req, res) => {
  res.send("Working!");
});

app.get("/get/url", (req, res) => {
  res.json({ url: URL });
});

app.get("/get/authcode", (req, res) => {
  const authCode = req.query.auth_code;
  res.redirect(`/get/accesstoken?auth_code=${authCode}`);
});

app.get("/get/accesstoken", (req, res) => {
  const authCode = req.query.auth_code;
  fyers
    .generate_access_token({
      client_id: "4IBAWZ841D-100",
      secret_key: "VATU2SK70V",
      auth_code: authCode,
    })
    .then((response) => {
      if (response.s == "ok") {
        fyers.setAccessToken(response.access_token);
        fyers
          .get_profile()
          .then((response) => {
            res.redirect(
              `http://localhost:3000/auth-success?X-Authenticated-User=${response}`
            );
          })
          .catch((err) => {
            res.send(err);
          });
      } else {
        res.send(response);
      }
    });
});

app.get("/get/quotes", (req, res) => {
  fyers
    .getQuotes(["NSE:SBIN-EQ", "NSE:TCS-EQ"])
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(PORT, () => {
  console.log(`Listening on PORT : ${PORT}`);
});

// fyers
//   .getMarketDepth({ symbol: ["NSE:SBIN-EQ", "NSE:TCS-EQ"], ohlcv_flag: 1 })
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
