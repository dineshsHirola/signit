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
  courseCodeTitle: {
    type: String,
  },
  statementOfAttenment: {
    type: String,
  },
  headOfCompliance: {
    type: String,
  },
  explanationOfDecision: {
    type: String,
  },
  courseSectionDate: {
    type: String,
  },
  repFirstName: {
    type: String,
  },
  repLastName: {
    type: String,
  },
  unitsDate: {
    type: String,
  },
  initials: {
    type: String,
  },
  initialsDate: {
    type: String,
  },
  adminFirstName: {
    type: String,
  },
  adminLastName: {
    type: String,
  },
  adminDate: {
    type: String,
  },
  managerFirstName: {
    type: String,
  },
  managerLastName: {
    type: String,
  },
  managerDate: {
    type: String,
  },
  studentAdvisedInWriting: {
    type: String,
  },
  ctRecordedInSms: {
    type: String,
  },
  applicationClosed: {
    type: String,
  },
  unitCode: {
    type: Array,
  },
  unitTitle: {
    type: Array,
  },
  officialCertificate: {
    type: String,
  },
  officialTranscript: {
    type: String,
  },
  signatureImage: {
    type: Array,
  },
  signatureImage2: {
    type: Array,
  },
  sign: {
    type: Array,
  },
  adminSign: {
    type: Array,
  },
  campusSign: {
    type: Array,
  },
});

const ctf_collection = mongoose.model('Ctf', ctf_Schema);

module.exports = ctf_collection;
