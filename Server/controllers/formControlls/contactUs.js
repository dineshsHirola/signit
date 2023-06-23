const contactUs_collection = require('../../models/contactUs');
require('dotenv').config();

module.exports = async (req, res) => {
  const { name, email, country, mobile, message } = req.body.formData;
  const {
    automotiveCourses,
    businessCourses,
    bandcCourses,
    communityServiceCourses,
    healthCourses,
    geCourses,
  } = req.body;
  const newContactUS = new contactUs_collection({
    name: name,
    email: email,
    country: country,
    mobile: mobile,
    message: message,
    interests: {
      automotiveCourses: automotiveCourses,
      businessCourses: businessCourses,
      bandcCourses: bandcCourses,
      communityServiceCourses: communityServiceCourses,
      healthCourses: healthCourses,
      geCourses: geCourses,
    },
  });
  contactUs_collection
    .insertMany(newContactUS)
    .then((result) => {
      res.send({ Status: 'Success' });
    })
    .catch((e) => {
      res.send({ Status: 'Failed to send' });
    });
};
