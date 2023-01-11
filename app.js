const express = require("express");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const app = express();
const cors = require("cors");

require("dotenv").config();

app.use(
  cors({
    origin: true, // "true" will copy the domain of the request back
    // to the reply. If you need more control than this
    // use a function.

    credentials: true, // This MUST be "true" if your endpoint is
    // authenticated via either a session cookie
    // or Authorization header. Otherwise the
    // browser will block the response.

    methods: "POST,GET,PUT,OPTIONS,DELETE", // Make sure you're not blocking
    // pre-flight OPTIONS requests
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// send email endpoint
app.post("/newsletter", (req, res, next) => {
  const email = req.query.email;
  let apikey = process.env.SIB_API_KEY;
  // auth + setup
  let defaultClient = SibApiV3Sdk.ApiClient.instance;
  let apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = apikey;

  // create contact
  let apiInstance = new SibApiV3Sdk.ContactsApi();
  let createContact = new SibApiV3Sdk.CreateContact();
  createContact.email = email;
  createContact.listIds = [5];

  // call SIB api
  apiInstance.createContact(createContact).then(
    (data) => {
      // success
      res.status(200);
      res.send("success");
    },
    function (error) {
      // error
      console.log(error);
      res.status(500);
      res.send("failure");
    }
  );
});

app.post("/ebook", (req, res, next) => {
  const email = req.query.email;
  let apikey = process.env.SIB_API_KEY;
  // auth + setup
  let defaultClient = SibApiV3Sdk.ApiClient.instance;
  let apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = apikey;

  // create contact
  let apiInstance = new SibApiV3Sdk.ContactsApi();
  let createContact = new SibApiV3Sdk.CreateContact();
  createContact.email = email;
  createContact.listIds = [6];

  // call SIB api
  apiInstance.createContact(createContact).then(
    (data) => {
      // success
      res.status(200);
      res.send("success");
    },
    function (error) {
      // error
      console.log(error);
      res.status(500);
      res.send("failure");
    }
  );
});

app.post("/ebook-newsletter", (req, res, next) => {
  const email = req.query.email;
  let apikey = process.env.SIB_API_KEY;
  // auth + setup
  let defaultClient = SibApiV3Sdk.ApiClient.instance;
  let apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = apikey;

  // create contact
  let apiInstance = new SibApiV3Sdk.ContactsApi();
  let createContact = new SibApiV3Sdk.CreateContact();
  createContact.email = email;
  createContact.listIds = [5, 6];

  // call SIB api
  apiInstance.createContact(createContact).then(
    (data) => {
      // success
      res.status(200);
      res.send("success");
    },
    function (error) {
      // error
      console.log(error);
      res.status(500);
      res.send("failure");
    }
  );
});

// frontend endpoint
app.use((req, res, next) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(process.env.NODE_PORT, process.env.NODE_HOST, () => {
  console.log(`app running on port http://`+process.env.NODE_HOST+`:`+process.env.NODE_PORT+`!`);
});
