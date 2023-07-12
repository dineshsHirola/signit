const gtef_collection = require('../../models/gtef');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const _ = require('lodash');

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
    choosingNotToStudyInYourHomeCountry,
    whyChoosenToStudyInAustralia,
    whyChoosenToStudyInSignit,
    whatDoYouKnowAboutCourse,
    explainWhyChoosenToChange,
    providedCertifiedExplainWhy,
    firstYearCostperPerson,
    firstYearNumberOfPeople,
    firstYearTotalCost,
    applicantCostperPerson,
    applicantNumberOfPeople,
    applicantTotalCost,
    partnerCostperPerson,
    partnerNumberOfPeople,
    partnerTotalCost,
    childCostperPerson,
    childNumberOfPeople,
    childTotalCost,
    airfaresCostperPerson,
    airfaresNumberOfPeople,
    airfaresTotalCost,
    anticipatedCostperPerson,
    anticipatedNumberOfPeople,
    anticipatedTotalCost,
    selfProvide,
    selfCertified,
    sponserProvide,
    sponcerCertified,
    loanProvide,
    loanCertified,
    otherProvide,
    otherCertified,
    genuineStudent,
    declarationPrefix,
    declarationFirstName,
    declarationMiddleName,
    declarationLastName,
    declarationDate,
  } = req.body.formData;

  const {
    base64Images,
    changingAreaOfStudy,
    providedCertifiedCopyOfEvidence,
    arr,
  } = req.body;

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
          folder: `signit/gte/${foldername}/evidence`,
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
          folder: `signit/gte/${foldername}/signature`,
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

    if (base64Images.length <= 0) {
      Promise.all(upload2)
        .then((result2) => {
          result2.map((val) => {
            arrayImages2.push(val.public_id);
          });
          try {
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
              choosingNotToStudyInYourHomeCountry,
              whyChoosenToStudyInAustralia,
              whyChoosenToStudyInSignit,
              whatDoYouKnowAboutCourse,
              changingAreaOfStudy,
              explainWhyChoosenToChange,
              providedCertifiedCopyOfEvidence,
              providedCertifiedExplainWhy,
              firstYearCostperPerson,
              firstYearNumberOfPeople,
              firstYearTotalCost,
              applicantCostperPerson,
              applicantNumberOfPeople,
              applicantTotalCost,
              partnerCostperPerson,
              partnerNumberOfPeople,
              partnerTotalCost,
              childCostperPerson,
              childNumberOfPeople,
              childTotalCost,
              airfaresCostperPerson,
              airfaresNumberOfPeople,
              airfaresTotalCost,
              anticipatedCostperPerson,
              anticipatedNumberOfPeople,
              anticipatedTotalCost,
              selfProvide,
              selfCertified,
              sponserProvide,
              sponcerCertified,
              loanProvide,
              loanCertified,
              otherProvide,
              otherCertified,
              genuineStudent,
              declarationPrefix,
              declarationFirstName,
              declarationMiddleName,
              declarationLastName,
              declarationDate,
              sign: arrayImages2,
            });
            gtef_collection
              .insertMany(newgtef)
              .then((result) => {
                res.send({ Status: 'Success', result: result });
              })
              .catch((e) => {
                console.log('Serverside error', e);
              });
          } catch (e) {
            res.send({ Status: 'Failed' });
          }
        })
        .catch((e) => {
          res.send({ Status: 'Failed' });
        });
    } else {
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
                  choosingNotToStudyInYourHomeCountry,
                  whyChoosenToStudyInAustralia,
                  whyChoosenToStudyInSignit,
                  whatDoYouKnowAboutCourse,
                  changingAreaOfStudy,
                  explainWhyChoosenToChange,
                  providedCertifiedCopyOfEvidence,
                  providedCertifiedExplainWhy,
                  firstYearCostperPerson,
                  firstYearNumberOfPeople,
                  firstYearTotalCost,
                  applicantCostperPerson,
                  applicantNumberOfPeople,
                  applicantTotalCost,
                  partnerCostperPerson,
                  partnerNumberOfPeople,
                  partnerTotalCost,
                  childCostperPerson,
                  childNumberOfPeople,
                  childTotalCost,
                  airfaresCostperPerson,
                  airfaresNumberOfPeople,
                  airfaresTotalCost,
                  anticipatedCostperPerson,
                  anticipatedNumberOfPeople,
                  anticipatedTotalCost,
                  selfProvide,
                  selfCertified,
                  sponserProvide,
                  sponcerCertified,
                  loanProvide,
                  loanCertified,
                  otherProvide,
                  otherCertified,
                  genuineStudent,
                  declarationPrefix,
                  declarationFirstName,
                  declarationMiddleName,
                  declarationLastName,
                  declarationDate,
                  signatureImage: arrayImages,
                  sign: arrayImages2,
                });
                gtef_collection
                  .insertMany(newgtef)
                  .then((result) => {
                    res.send({ Status: 'Success', result: result });
                  })
                  .catch((e) => {
                    console.log('Serverside error', e);
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
    }
  } catch (e) {
    res.send({ Status: 'Failed' });
  }
};
