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
  choosingNotToStudyInYourHomeCountry: {
    type: String,
  },
  whyChoosenToStudyInAustralia: {
    type: String,
  },
  whyChoosenToStudyInSignit: {
    type: String,
  },
  whatDoYouKnowAboutCourse: {
    type: String,
  },
  changingAreaOfStudy: {
    type: String,
  },
  explainWhyChoosenToChange: {
    type: String,
  },
  providedCertifiedCopyOfEvidence: {
    type: String,
  },
  providedCertifiedExplainWhy: {
    type: String,
  },
  firstYearCostperPerson: {
    type: String,
  },
  firstYearNumberOfPeople: {
    type: String,
  },
  firstYearTotalCost: {
    type: String,
  },
  applicantCostperPerson: {
    type: String,
  },
  applicantNumberOfPeople: {
    type: String,
  },
  applicantTotalCost: {
    type: String,
  },
  partnerCostperPerson: {
    type: String,
  },
  partnerNumberOfPeople: {
    type: String,
  },
  partnerTotalCost: {
    type: String,
  },
  childCostperPerson: {
    type: String,
  },
  childNumberOfPeople: {
    type: String,
  },
  childTotalCost: {
    type: String,
  },
  airfaresCostperPerson: {
    type: String,
  },
  airfaresNumberOfPeople: {
    type: String,
  },
  airfaresTotalCost: {
    type: String,
  },
  selfProvide: {
    type: String,
  },
  selfCertified: {
    type: String,
  },
  sponserProvide: {
    type: String,
  },
  sponcerCertified: {
    type: String,
  },
  loanProvide: {
    type: String,
  },
  loanCertified: {
    type: String,
  },
  otherProvide: {
    type: String,
  },
  otherCertified: {
    type: String,
  },
  genuineStudent: {
    type: String,
  },
  declarationPrefix: {
    type: String,
  },
  declarationFirstName: {
    type: String,
  },
  declarationMiddleName: {
    type: String,
  },
  declarationLastName: {
    type: String,
  },
  declarationDate: {
    type: String,
  },
  signatureImage: {
    type: String,
  },
});

const gtef_collection = mongoose.model('Gtef', gtef_Schema);

module.exports = gtef_collection;
