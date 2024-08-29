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

var URL = fyers.generateAuthCode();

//use url to generate auth code
console.log(URL);

var authcode = "authcode generated above";

app.get("/", (req, res) => {
  res.send("Working!");
});

app.get("/get/url", (req, res) => {
  res.json({ url: URL });
});

app.get("/get/authcode:", (req, res) => {
  console.log(req.query);
  res.send("OK");
});

app.listen(PORT, () => {
  console.log(`Listening on PORT : ${PORT}`);
});

// fyers
//   .generate_access_token({
//     client_id: "4IBAWZ841D-100",
//     secret_key: "VATU2SK70V",
//     auth_code: authcode,
//   })
//   .then((response) => {
//     if (response.s == "ok") {
//       fyers.setAccessToken(response.access_token);
//     } else {
//       console.log("error generating access token", response);
//     }
//   });

// fyers
//   .get_profile()
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// fyers
//   .getQuotes(["NSE:SBIN-EQ", "NSE:TCS-EQ"])
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// fyers
//   .getMarketDepth({ symbol: ["NSE:SBIN-EQ", "NSE:TCS-EQ"], ohlcv_flag: 1 })
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
