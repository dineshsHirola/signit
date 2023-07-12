const mongoose = require('mongoose');

const srf_Schema = new mongoose.Schema({
  studentID: {
    type: String,
  },
  courseName: {
    type: String,
  },
  name: {
    surName: {
      type: String,
    },
    givenName: {
      type: String,
    },
  },
  dob: {
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
  email: {
    type: String,
  },
  courseCode: {
    type: String,
  },
  date: {
    type: String,
  },
  updateContact: {
    type: Boolean,
  },
  enrollmentLetter: {
    type: Boolean,
  },
  certificate: {
    type: Boolean,
  },
  soa: {
    type: Boolean,
  },
  progressReport: {
    type: Boolean,
  },
  leave: {
    leave: {
      type: Boolean,
    },
    leaveFrom: {
      type: String,
    },
    leaveTo: {
      type: String,
    },
  },
  otherReq: {
    otherReq: {
      type: Boolean,
    },
    otherInput: {
      type: String,
    },
  },
  sign: {
    type: Array,
  },
});

const srf_collection = mongoose.model('Srf', srf_Schema);

module.exports = srf_collection;
