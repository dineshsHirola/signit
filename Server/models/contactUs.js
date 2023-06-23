const mongoose = require('mongoose');

const contactUs_Schema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  country: {
    type: String,
  },
  mobile: {
    type: String,
  },
  message: {
    type: String,
  },
  interests: {
    automotiveCourses: { type: Boolean },
    businessCourses: { type: Boolean },
    bandcCourses: { type: Boolean },
    communityServiceCourses: { type: Boolean },
    healthCourses: { type: Boolean },
    geCourses: { type: Boolean },
  },
});

const contactUs_collection = mongoose.model('ContactUs', contactUs_Schema);

module.exports = contactUs_collection;
