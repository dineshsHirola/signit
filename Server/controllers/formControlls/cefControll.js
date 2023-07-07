const cef_collection = require('../../models/cef');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const _ = require('lodash');

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
    reasonsForReleaseRequest,
    intPrefix,
    intFirstName,
    intMiddleName,
    intLastName,
    intDate,
  } = req.body.formData;
  const { signatureImage, intSignatureImage, intStudent } = req.body;

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDE_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const CapsName = _.capitalize(firstName);

  const foldername = Date.now() + '-' + CapsName;

  const response = await cloudinary.uploader
    .upload(signatureImage, {
      upload_preset: 'fintech',
      folder: `fintech/${foldername}`,
      allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'webp', 'ico', 'jfif'],
    })
    .then((result) => {
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
        image: result.public_id,
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
        reasonsForReleaseRequest,
        intPrefix,
        intFirstName,
        intMiddleName,
        intLastName,
        intDate,
        // image2,
      });

      cef_collection
        .insertMany(newcef)
        .then((result) => {
          res.send({ Status: 'Success', result: result });
        })
        .catch((e) => {
          console.log('Serverside error', e);
        });
    })
    .catch((e) => {
      res.send({ Status: 'Failed to upload Supporting Document' });
    });
};
