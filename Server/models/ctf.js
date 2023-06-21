const mongoose = require('mongoose');

const ctf_Schema = new mongoose.Schema({
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

const ctf_collection = mongoose.model('Ctf', ctf_Schema);

module.exports = ctf_collection;
