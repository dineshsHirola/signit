const rrf_collection = require('../../models/rrf');
require('dotenv').config();

module.exports = async (req, res) => {
  const {
    courseName,
    courseStartDate,
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

  const newrrf = new rrf_collection({
    courseName:courseName,
    courseStartDate:courseStartDate,
    name: {
      prefix:prefix,
      firstName:firstName,
      middleName:middleName,
      lastName:lastName,
    },
    dob:dob,
    gender:gender,
    tel: {
      telCode:telCode,
      telephone:telephone,
    },
    mob: {
      mobCode:mobCode,
      mobile:mobile,
    },
    email:email,
    altEmail:altEmail,
    typeOfId:typeOfId,
    idNumber:idNumber,
    address: {
      buildingName:buildingName,
      street:street,
      town:town,
      state:state,
      postCode:postCode,
      country:country,
    },
  });
  rrf_collection
    .insertMany(newrrf)
    .then((result) => {
      res.send({ Status: 'Success', result: result });
    })
    .catch((e) => {
      console.log('Serverside error', e);
    });
};
