const express = require("express");
const mongoose = require("mongoose");
const Youch = require('youch')
const databaseConfig = require("./config/database.js");

class App {
  constructor() {
    this.express = express();
    this.isDev = process.env.NODE_ENV !== "production";

    this.database();
    this.middlewares();
    this.routes();
    this.exception();
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
    this.express.use(require("./routes"));
  }

  exception() {
    this.express.use(async (err, req, res, next) => {
      if(err instanceof validate.ValidateEr) {
        return res.status(err.status).json(err)
      }

      if(process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err)

        return res.json(await youch.toJSON())
      }

      return res
        .status(err.status || 500)
        .json({ err: 'Internal Server Error' })
    })
  }
}

module.exports = new App().express;
