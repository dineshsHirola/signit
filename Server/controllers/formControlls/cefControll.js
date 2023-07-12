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
  const { base64Images, base64Images1, intStudent, arr } = req.body;

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDE_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const CapsName = _.capitalize(firstName);

  const foldername = Date.now() + '-' + CapsName;

  try {
    let image = async (value) => {
      try {
        const response = await cloudinary.uploader.upload(value, {
          upload_preset: 'signit',
          folder: `signit/cef/${foldername}/Image`,
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

    let image2 = async (value) => {
      try {
        const response = await cloudinary.uploader.upload(value, {
          upload_preset: 'signit',
          folder: `signit/cef/${foldername}/intImage`,
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

    let image3 = async (value) => {
      try {
        const response = await cloudinary.uploader.upload(value, {
          upload_preset: 'signit',
          folder: `signit/cef/${foldername}/signature`,
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

    const upload = base64Images.map(image);
    const arrayImages = [];

    const upload2 = base64Images1.map(image2);
    const arrayImages2 = [];

    const upload3 = arr.map(image3);
    const arrayImages3 = [];

    Promise.all(upload)
      .then((result1) => {
        Promise.all(upload2)
          .then((result2) => {
            Promise.all(upload3)
              .then((result3) => {
                result1.map((val) => {
                  arrayImages.push(val.public_id);
                });
                result2.map((val) => {
                  arrayImages2.push(val.public_id);
                });
                result3.map((val) => {
                  arrayImages3.push(val.public_id);
                });
                try {
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
                    image: arrayImages,
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
                    image2: arrayImages2,
                    sign: arrayImages3,
                  });

                  cef_collection
                    .insertMany(newcef)
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
          })
          .catch((e) => {
            res.send({ Status: 'Failed' });
          });
      })
      .catch((e) => {
        res.send({ Status: 'Failed' });
      });
  } catch (e) {
    res.send({ Status: 'Failed' });
  }
};
