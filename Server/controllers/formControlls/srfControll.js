const srf_collection = require('../../models/srf');
require('dotenv').config();

module.exports = async (req, res) => {
  const { studentID, surName, givenName, dob, courseCode, courseName, date } =
    req.body.formData;
  const {
    updateContact,
    enrollmentLetter,
    certificate,
    soa,
    progressReport,
    leave,
    otherReq,
    leaveFrom,
    leaveTo,
    otherInput,
  } = req.body;

  const newsrf = new srf_collection({
    studentID,
    courseName,
    name: {
      surName,
      givenName,
    },
    dob,
    courseCode,
    date,
    updateContact,
    enrollmentLetter,
    certificate,
    soa,
    progressReport,
    leave: {
      leave,
      leaveFrom,
      leaveTo,
    },
    otherReq: {
      otherReq,
      otherInput,
    },
  });
  srf_collection
    .insertMany(newsrf)
    .then((result) => {
      res.send({ Status: 'Success', result: result });
    })
    .catch((e) => {
      console.log('Serverside error', e);
    });
};
