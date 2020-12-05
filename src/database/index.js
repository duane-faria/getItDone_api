const mongoose = require('mongoose'),
  autoIncrement = require('mongoose-auto-increment');

const dbConfig = require('../app/config/database');

class Database {
  constructor() {
    this.mongo();
  }

  async mongo() {
    this.mongoConnection = await mongoose.connect(dbConfig.host, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // autoIncrement.initialize(this.mongoConnection);
  }
}

module.exports = new Database();
