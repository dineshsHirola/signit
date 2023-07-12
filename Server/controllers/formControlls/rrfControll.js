const rrf_collection = require('../../models/rrf');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const _ = require('lodash');

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
    invoiceNumber,
    reason,
    bankName,
    accNumber,
    accName,
    bsb,
    bankAddress,
    swiftCode,
    bankDate,
    refundAmount,
    comments,
    refundMethod,
    position,
    printName,
    dateProcessed,
    refundRegister,
    logDate,
    loggedBy,
    formal,
    formalDate,
  } = req.body.formData;

  const { refundType, otherRefundInput, base64Images, arr } = req.body;

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
          folder: `signit/rrf/${foldername}/images`,
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
          folder: `signit/rrf/${foldername}/signature`,
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

    const upload2 = arr.map(image2);
    const arrayImages2 = [];

    Promise.all(upload)
      .then((result1) => {
        Promise.all(upload2)
          .then((result2) => {
            result1.map((val) => {
              arrayImages.push(val.public_id);
            });
            result2.map((val) => {
              arrayImages2.push(val.public_id);
            });
            try {
              const newrrf = new rrf_collection({
                courseName: courseName,
                courseStartDate: courseStartDate,
                name: {
                  prefix: prefix,
                  firstName: firstName,
                  middleName: middleName,
                  lastName: lastName,
                },
                dob: dob,
                gender: gender,
                tel: {
                  telCode: telCode,
                  telephone: telephone,
                },
                mob: {
                  mobCode: mobCode,
                  mobile: mobile,
                },
                email: email,
                altEmail: altEmail,
                typeOfId: typeOfId,
                idNumber: idNumber,
                address: {
                  buildingName: buildingName,
                  street: street,
                  town: town,
                  state: state,
                  postCode: postCode,
                  country: country,
                },
                invoiceNumber,
                reason,
                bankName,
                accNumber,
                accName,
                bsb,
                bankAddress,
                swiftCode,
                bankDate,
                refundAmount,
                comments,
                refundMethod,
                position,
                printName,
                dateProcessed,
                refundRegister,
                logDate,
                loggedBy,
                formal,
                formalDate,
                refundType,
                otherRefundInput,
                signatureImage: arrayImages,
                sign: arrayImages2,
              });
              rrf_collection
                .insertMany(newrrf)
                .then((result) => {
                  res.send({ Status: 'Success', result: result });
                })
                .catch((e) => {
                  console.log('Serverside error', e);
                });
            } catch (e) {
              console.log('Hello', e);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log('promise error uploading images', e);
      });
  } catch (e) {
    console.log('server bycrpt catch error in client_post', e);
  }
};
