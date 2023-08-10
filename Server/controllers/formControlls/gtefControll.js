const gtef_collection = require('../../models/gtef');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const _ = require('lodash');
const sendMail = require('../../utils/sendMail');
const puppeteer = require('puppeteer');
const { checkOutReq, compalintTemp } = require('../../emailTemplate');

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
            const obj = {
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
            };
            gtef_collection
              .insertMany(newgtef)
              .then(async (result) => {
                // Generate PDF
                const browser = await puppeteer.launch();
                const page = await browser.newPage();

                let contentHTML = '';

                let link = process.env.CLOUDINARY_IMAGE_URL;

                for (let key in obj) {
                  if (obj.hasOwnProperty(key)) {
                    if (typeof obj[key] === 'object') {
                      console.log(`${key}:`);
                      contentHTML += `<strong>${key}:</strong><br>`; // Use <br> for line breaks in HTML
                      for (let subKey in obj[key]) {
                        if (obj[key].hasOwnProperty(subKey)) {
                          if (key === 'evidence' || key === 'sign') {
                            console.log(obj[key][subKey], 'Hello');
                            contentHTML += `&nbsp;&nbsp;<img width="100px" src=${link}${obj[key][subKey]} alt="image"/><br>`;
                          } else {
                            if (key === 'unitCode' || key === 'unitTitle') {
                              console.log(obj[key][subKey]);
                              contentHTML += `&nbsp;&nbsp;${obj[key][subKey]}<br>`;
                            } else {
                              console.log(
                                `  ${subKey}: ${obj[key][subKey]},Hello`
                              );
                              contentHTML += `&nbsp;&nbsp;${subKey}: ${obj[key][subKey]}<br>`;
                            }
                          }
                        }
                      }
                    } else {
                      console.log(`${key}: ${obj[key]}`);
                      contentHTML += `<strong>${key}:</strong> ${obj[key]}<br>`;
                    }
                  }
                }

                await page.setContent(contentHTML);

                const pdfBuffer = await page.pdf();
                await browser.close();

                const newMobile = mobCode + ' ' + mobile;
                const newName = firstName + ' ' + lastName;

                const options = {
                  email: 'dineshs25201@gmail.com',
                  subject: 'New Genuine Temporary Entrant (GTE) Form Received',
                  html: compalintTemp(
                    'Genuine Temporary Entrant (GTE)',
                    newName,
                    email,
                    newMobile
                  ),
                  pdfBuffer: pdfBuffer,
                };

                const options2 = {
                  email: email,
                  subject:
                    'Genuine Temporary Entrant (GTE) Form Submitted Successfully',
                  html: `<p><b>Dear ${newName}</b></p><br/>
<p>Thank You For Submitting Genuine Temporary Entrant (GTE) Form</p>
<p>Our Team Will Contact You</p><br/>
<p><b>Thank you</b></p>
<p><b>Signet institute</b></p>
<p>dineshs25201@gmail.com</p>`,
                };

                sendMail(options)
                  .then((result2) => {
                    sendMail(options2)
                      .then((result3) => {
                        res.send({
                          Status: 'Success',
                          result: result,
                        });
                      })
                      .catch((e) => {
                        console.log(e);
                      });
                  })
                  .catch((e) => {
                    console.log(e);
                  });

                // res.send({ Status: 'Success', result: result });
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
                const obj = {
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
                  evidence: arrayImages,
                  sign: arrayImages2,
                };
                gtef_collection
                  .insertMany(newgtef)
                  .then(async (result) => {
                    // Generate PDF
                    const browser = await puppeteer.launch();
                    const page = await browser.newPage();

                    let contentHTML = '';

                    let link = process.env.CLOUDINARY_IMAGE_URL;

                    for (let key in obj) {
                      if (obj.hasOwnProperty(key)) {
                        if (typeof obj[key] === 'object') {
                          console.log(`${key}:`);
                          contentHTML += `<strong>${key}:</strong><br>`; // Use <br> for line breaks in HTML
                          for (let subKey in obj[key]) {
                            if (obj[key].hasOwnProperty(subKey)) {
                              if (key === 'evidence' || key === 'sign') {
                                console.log(obj[key][subKey], 'Hello');
                                contentHTML += `&nbsp;&nbsp;<img width="100px" src=${link}${obj[key][subKey]} alt="image"/><br>`;
                              } else {
                                if (key === 'unitCode' || key === 'unitTitle') {
                                  console.log(obj[key][subKey]);
                                  contentHTML += `&nbsp;&nbsp;${obj[key][subKey]}<br>`;
                                } else {
                                  console.log(
                                    `  ${subKey}: ${obj[key][subKey]},Hello`
                                  );
                                  contentHTML += `&nbsp;&nbsp;${subKey}: ${obj[key][subKey]}<br>`;
                                }
                              }
                            }
                          }
                        } else {
                          console.log(`${key}: ${obj[key]}`);
                          contentHTML += `<strong>${key}:</strong> ${obj[key]}<br>`;
                        }
                      }
                    }

                    await page.setContent(contentHTML);

                    const pdfBuffer = await page.pdf();
                    await browser.close();

                    const newMobile = mobCode + ' ' + mobile;
                    const newName = firstName + ' ' + lastName;

                    const options = {
                      email: 'dineshs25201@gmail.com',
                      subject:
                        'New Genuine Temporary Entrant (GTE) Form Received',
                      html: compalintTemp(
                        'Genuine Temporary Entrant (GTE)',
                        newName,
                        email,
                        newMobile
                      ),
                      pdfBuffer: pdfBuffer,
                    };

                    const options2 = {
                      email: email,
                      subject:
                        'Genuine Temporary Entrant (GTE) Form Submitted Successfully',
                      html: `<p><b>Dear ${newName}</b></p><br/>
<p>Thank You For Submitting Genuine Temporary Entrant (GTE) Form</p>
<p>Our Team Will Contact You</p><br/>
<p><b>Thank you</b></p>
<p><b>Signet institute</b></p>
<p>dineshs25201@gmail.com</p>`,
                    };

                    sendMail(options)
                      .then((result2) => {
                        sendMail(options2)
                          .then((result3) => {
                            res.send({
                              Status: 'Success',
                              result: result,
                            });
                          })
                          .catch((e) => {
                            console.log(e);
                          });
                      })
                      .catch((e) => {
                        console.log(e);
                      });

                    // res.send({ Status: 'Success', result: result });
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
