const mongoose = require('mongoose');

const gtef_Schema = new mongoose.Schema({
  ref: {
    type: String,
  },
  name: {
    prefix: {
      type: String,
    },
    firstName: {
      type: String,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
    },
  },
  dob: {
    type: String,
  },
  gender: {
    type: String,
  },
  mob: {
    mobCode: {
      type: String,
    },
    mobile: {
      type: String,
    },
  },
  email: {
    type: String,
  },
});

const gtef_collection = mongoose.model('Gtef', gtef_Schema);

module.exports = gtef_collection;
