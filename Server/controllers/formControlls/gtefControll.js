const gtef_collection = require('../../models/gtef');
require('dotenv').config();

module.exports = async (req, res) => {
  const {
    ref,
    prefix,
    firstName,
    middleName,
    lastName,
    dob,
    gender,
    mobCode,
    mobile,
    email,
  } = req.body.formData;

  const newgtef = new gtef_collection({
    ref,
    name: {
      prefix,
      firstName,
      middleName,
      lastName,
    },
    dob,
    gender,
    mob: {
      mobCode,
      mobile,
    },
    email,
  });
  gtef_collection
    .insertMany(newgtef)
    .then((result) => {
      res.send({ Status: 'Success', result: result });
    })
    .catch((e) => {
      console.log('Serverside error', e);
    });
};
