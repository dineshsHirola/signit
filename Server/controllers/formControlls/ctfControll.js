const ctf_collection = require('../../models/ctf');
require('dotenv').config();

module.exports = async (req, res) => {
  const {
    prefix,
    firstName,
    middleName,
    lastName,
    dob,
    gender,
    telCode,
    telephone,
    mobCode,
    mobile,
    email,
    altEmail,
    typeOfId,
    idNumber,
    buildingName,
    street,
    town,
    state,
    postCode,
    country,
    courseCodeTitle,
    statementOfAttenment,
    headOfCompliance,
    explanationOfDecision,
    courseSectionDate,
    repFirstName,
    repLastName,
    unitsDate,
    initials,
    initialsDate,
    adminFirstName,
    adminLastName,
    adminDate,
    managerFirstName,
    managerLastName,
    managerDate,
  } = req.body.formData;

  const {
    unitCode1,
    unitTitle1,
    unitCode2,
    unitTitle2,
    unitCode3,
    unitTitle3,
    unitCode4,
    unitTitle4,
    unitCode5,
    unitTitle5,
    unitCode6,
    unitTitle6,
    unitCode7,
    unitTitle7,
    unitCode8,
    unitTitle8,
  } = req.body.inputArr;

  const { declaration1, declaration2, declaration3 } = req.body;

  const array = [
    unitCode1,
    unitTitle1,
    unitCode2,
    unitTitle2,
    unitCode3,
    unitTitle3,
    unitCode4,
    unitTitle4,
    unitCode5,
    unitTitle5,
    unitCode6,
    unitTitle6,
    unitCode7,
    unitTitle7,
    unitCode8,
    unitTitle8,
  ];

  const unitCode = [];
  const unitTitle = [];

  array.map((val, index) => {
    if (
      index === 0 ||
      index === 2 ||
      index === 4 ||
      index === 6 ||
      index === 8 ||
      index === 10 ||
      index === 12 ||
      index === 14
    ) {
      if (val === '') {
      } else {
        unitCode.push(val);
      }
    } else {
      if (val === '') {
      } else {
        unitTitle.push(val);
      }
    }
  });

  const newctf = new ctf_collection({
    name: {
      prefix: prefix,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
    },
    dob: dob,
    gender: gender,
    tel: {
      telCode: telCode,
      telephone: telephone,
    },
    mob: {
      mobCode: mobCode,
      mobile: mobile,
    },
    email: email,
    altEmail: altEmail,
    typeOfId: typeOfId,
    idNumber: idNumber,
    address: {
      buildingName: buildingName,
      street: street,
      town: town,
      state: state,
      postCode: postCode,
      country: country,
    },
    courseCodeTitle,
    statementOfAttenment,
    headOfCompliance,
    explanationOfDecision,
    courseSectionDate,
    repFirstName,
    repLastName,
    unitsDate,
    initials,
    initialsDate,
    adminFirstName,
    adminLastName,
    adminDate,
    managerFirstName,
    managerLastName,
    managerDate,
    studentAdvisedInWriting: declaration1,
    ctRecordedInSms: declaration2,
    applicationClosed: declaration3,
    unitCode: unitCode,
    unitTitle: unitTitle,
  });
  ctf_collection
    .insertMany(newctf)
    .then((result) => {
      res.send({ Status: 'Success', result: result });
    })
    .catch((e) => {
      console.log('Serverside error', e);
    });
};
