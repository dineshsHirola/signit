const cf_collection = require('../../models/cf');
require('dotenv').config();

module.exports = async (req, res) => {
  const {
    studentNumber,
    mobileCode,
    mobile,
    surName,
    givenName,
    email,
    courseName,
    reason,
    outcome,
    date,
    receivedBy,
    receivedDate,
    ProcessedBy,
    ProcessedDate,
  } = req.body.formData;

  const newcf = new cf_collection({
    studentNumber,
    courseName,
    mob: {
      mobileCode,
      mobile,
    },
    name: {
      surName,
      givenName,
    },
    email,
    reason,
    outcome,
    date,
    receivedBy,
    receivedDate,
    ProcessedBy,
    ProcessedDate,
  });
  cf_collection
    .insertMany(newcf)
    .then((result) => {
      res.send({ Status: 'Success', result: result });
    })
    .catch((e) => {
      console.log('Serverside error', e);
    });
};
