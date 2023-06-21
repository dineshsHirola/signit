const mongoose = require('mongoose');

const cf_Schema = new mongoose.Schema({
  studentNumber: {
    type: String,
  },
  courseName: {
    type: String,
  },
  mob: {
    mobileCode: {
      type: String,
    },
    mobile: {
      type: String,
    },
  },
  name: {
    surName: {
      type: String,
    },
    givenName: {
      type: String,
    },
  },
  email: {
    type: String,
  },
  reason: {
    type: String,
  },
  outcome: {
    type: String,
  },
  date: {
    type: String,
  },
  receivedBy: {
    type: String,
  },
  receivedDate: {
    type: String,
  },
  ProcessedBy: {
    type: String,
  },
  ProcessedDate: {
    type: String,
  },
});

const cf_collection = mongoose.model('Cf', cf_Schema);

module.exports = cf_collection;
