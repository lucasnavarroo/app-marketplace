const express = require("express");
const mongoose = require("mongoose");
const databaseConfig = require("./config/database.js");

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV !== "production";

    this.database();
    this.middlewares();
    this.routes();
  }

  database() {
    mongoose
      .connect(databaseConfig.uri, {
        useCreateIndex: true,
        useNewUrlParser: true
      })
      .catch(error => {
        console.log(error);
      });
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(require("./router"));
  }
}

module.exports = new App().express;