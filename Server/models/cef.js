const mongoose = require('mongoose');

const cef_Schema = new mongoose.Schema({
  courseCode: {
    type: String,
  },
  courseName: {
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
  qualCode: {
    type: String,
  },
  qualName: {
    type: String,
  },
  detail: {
    type: String,
  },
  date: {
    type: String,
  },
  reason: {
    type: String,
  },
  intStudent: {
    type: String,
  },
  image: {
    type: Array,
  },
  reasonsForReleaseRequest: {
    type: String,
  },
  intPrefix: {
    type: String,
  },
  intFirstName: {
    type: String,
  },
  intMiddleName: {
    type: String,
  },
  intLastName: {
    type: String,
  },
  intDate: {
    type: String,
  },
  image2: {
    type: Array,
  },
  sign: {
    type: Array,
  },
});

const cef_collection = mongoose.model('Cef', cef_Schema);

module.exports = cef_collection;
