const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("../config/keys").MONGO_URI;
const expressGraphQL = require("express-graphql");
const app = express();
const schema = require("./schema/schema");
const models = require("./models/index");
if (!db) {
  throw new Error("You must provide a string to connect to MongoDB Atlas");
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.json());

const cors = require("cors");
//...
app.use(cors());


// app.use(
//   "/graphql",
//   expressGraphQL({
//     schema,
//     graphiql: true
//   })
// );
// after user auth
app.use(
  "/graphql",
  expressGraphQL(req => {
    return {
      schema,
      context: {
        token: req.headers.authorization
      },
      graphiql: true
    };
  })
);
module.exports = app;
