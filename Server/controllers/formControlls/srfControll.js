const srf_collection = require('../../models/srf');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const _ = require('lodash');

module.exports = async (req, res) => {
  const {
    studentID,
    surName,
    givenName,
    dob,
    mobCode,
    mobile,
    email,
    courseCode,
    courseName,
    date,
  } = req.body.formData;
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
    arr,
  } = req.body;

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDE_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const CapsName = _.capitalize(givenName);

  const foldername = Date.now() + '-' + CapsName;

  try {
    let image = async (value) => {
      try {
        const response = await cloudinary.uploader.upload(value, {
          upload_preset: 'signit',
          folder: `signit/srf/${foldername}/signature`,
          allowed_formats: [
            'png',
            'jpg',
            'jpeg',
            'svg',
            'webp',
            'ico',
            'jfif',
            'pdf',
          ],
        });
        return response;
      } catch (e) {
        console.log(e);
        return null;
      }
    };

    const upload2 = arr.map(image);
    const arrayImages2 = [];

    Promise.all(upload2)
      .then((result2) => {
        result2.map((val) => {
          arrayImages2.push(val.public_id);
        });
        try {
          const newsrf = new srf_collection({
            studentID,
            courseName,
            name: {
              surName,
              givenName,
            },
            dob,
            mob: {
              mobileCode: mobCode,
              mobile,
            },
            email,
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
            sign: arrayImages2,
          });
          srf_collection
            .insertMany(newsrf)
            .then((result) => {
              res.send({ Status: 'Success', result: result });
            })
            .catch((e) => {
              res.send({ Status: 'Failed' });
            });
        } catch (e) {
          res.send({ Status: 'Failed' });
        }
      })
      .catch((e) => {
        res.send({ Status: 'Failed' });
      });
  } catch (e) {
    res.send({ Status: 'Failed' });
  }
};
