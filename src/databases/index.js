const Sequelize = require('sequelize');
const mongoose = require('mongoose');

const sequelizeConfig = require('../config/database');
const { mongoose: mongooseConfig } = require('../config/mongo');

class Database {
  constructor() {
    this.sequelize = this.sequelizeConnection();
    this.mongodb = this.mongooseConnection();
  }

  sequelizeConnection() {
    return { Sequelize, sequelize: new Sequelize(sequelizeConfig) };
  }

  mongooseConnection() {
    const { host, port, db, authSource, user, pass } = mongooseConfig;

    return mongoose.connect(
      `mongodb://${host}:${port}/${db}?authSource=${authSource}`,
      {
        user,
        pass,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
      }
    );
  }
}

module.exports = new Database();
