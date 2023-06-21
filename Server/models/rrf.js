const mongoose = require('mongoose');

const rrf_Schema = new mongoose.Schema({
  courseName: {
    type: String,
  },
  courseStartDate: {
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
  tel: {
    telCode: {
      type: String,
    },
    telephone: {
      type: String,
    },
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
  altEmail: {
    type: String,
  },
  typeOfId: {
    type: String,
  },
  idNumber: {
    type: String,
  },
  address: {
    buildingName: {
      type: String,
    },
    street: {
      type: String,
    },
    town: {
      type: String,
    },
    state: {
      type: String,
    },
    postCode: {
      type: String,
    },
    country: {
      type: String,
    },
  },
});

const rrf_collection = mongoose.model('Rrf', rrf_Schema);

module.exports = rrf_collection;
