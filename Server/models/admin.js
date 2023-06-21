const mongoose = require('mongoose');

const admin_Schema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

const admin_collection = mongoose.model('Admin', admin_Schema);

module.exports = admin_collection;
