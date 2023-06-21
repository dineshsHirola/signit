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
  } = req.body.formData;

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
