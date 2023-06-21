const cef_collection = require('../../models/cef');
require('dotenv').config();

module.exports = async (req, res) => {
  const {
    courseName,
    courseCode,
    qualCode,
    qualName,
    prefix,
    firstName,
    middleName,
    lastName,
    dob,
    mobCode,
    mobile,
    email,
    altEmail,
    buildingName,
    street,
    town,
    state,
    postCode,
    country,
    detail,
    date,
    reason,
    intStudent,
  } = req.body.formData;

  const newcef = new cef_collection({
    courseName: courseName,
    courseCode,
    qualCode,
    qualName,
    detail,
    date,
    reason,
    intStudent,
    name: {
      prefix: prefix,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
    },
    dob: dob,
    mob: {
      mobCode: mobCode,
      mobile: mobile,
    },
    email: email,
    altEmail: altEmail,
    address: {
      buildingName: buildingName,
      street: street,
      town: town,
      state: state,
      postCode: postCode,
      country: country,
    },
  });
  cef_collection
    .insertMany(newcef)
    .then((result) => {
      res.send({ Status: 'Success', result: result });
    })
    .catch((e) => {
      console.log('Serverside error', e);
    });
};
