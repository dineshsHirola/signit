const cf_collection = require('../../models/cf');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const _ = require('lodash');

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

  const { arr } = req.body;

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDE_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const CapsName = studentNumber;

  const foldername = Date.now() + '-' + CapsName;

  try {
    let image = async (value) => {
      try {
        const response = await cloudinary.uploader.upload(value, {
          upload_preset: 'signit',
          folder: `signit/cf/${foldername}/signature`,
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
            sign: arrayImages2,
          });
          cf_collection
            .insertMany(newcf)
            .then((result) => {
              res.send({ Status: 'Success', result: result });
            })
            .catch((e) => {});
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
