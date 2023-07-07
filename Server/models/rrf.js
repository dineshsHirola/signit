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
  invoiceNumber: {
    type: String,
  },
  reason: {
    type: String,
  },
  bankName: {
    type: String,
  },
  accNumber: {
    type: String,
  },
  accName: {
    type: String,
  },
  bsb: {
    type: String,
  },
  bankAddress: {
    type: String,
  },
  swiftCode: {
    type: String,
  },
  bankDate: {
    type: String,
  },
  refundAmount: {
    type: String,
  },
  comments: {
    type: String,
  },
  refundMethod: {
    type: String,
  },
  position: {
    type: String,
  },
  printName: {
    type: String,
  },
  dateProcessed: {
    type: String,
  },
  refundRegister: {
    type: String,
  },
  logDate: {
    type: String,
  },
  loggedBy: {
    type: String,
  },
  formal: {
    type: String,
  },
  formalDate: {
    type: String,
  },
  refundType: {
    type: String,
  },
  otherRefundInput: {
    type: String,
  },
  signatureImage: {
    type: String,
  },
});

const rrf_collection = mongoose.model('Rrf', rrf_Schema);

module.exports = rrf_collection;
