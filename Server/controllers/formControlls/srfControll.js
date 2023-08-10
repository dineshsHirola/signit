const { compalintTemp } = require('../../emailTemplate');
const srf_collection = require('../../models/srf');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const _ = require('lodash');
const sendMail = require('../../utils/sendMail');
const puppeteer = require('puppeteer');

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
          const obj = {
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
          };
          srf_collection
            .insertMany(newsrf)
            .then(async (result) => {
              // Generate PDF
              const browser = await puppeteer.launch({ headless: 'new' });
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
                        if (key === 'sign') {
                          console.log(obj[key][subKey], 'Hello');
                          contentHTML += `&nbsp;&nbsp;<img width="100px" src=${link}${obj[key][subKey]} alt="image"/><br>`;
                        } else {
                          if (key === 'unitCode' || key === 'unitTitle') {
                            console.log(obj[key][subKey]);
                            contentHTML += `&nbsp;&nbsp;${obj[key][subKey]}<br>`;
                          } else {
                            if (obj[key][subKey] === true) {
                            } else {
                              console.log(
                                `  ${subKey}: ${obj[key][subKey]},Hello`
                              );
                              contentHTML += `&nbsp;&nbsp;${subKey}: ${obj[key][subKey]}<br>`;
                            }
                          }
                        }
                      }
                    }
                  } else {
                    if (key === 'sign') {
                      console.log(`${key}: ${obj[key]}`, 'Hello');
                      contentHTML += `<strong>${key}:</strong> <img width="100px" src=${link}${obj[key]} alt="image"/><br>`;
                    } else {
                      console.log(`${key}: ${obj[key]}`);
                      contentHTML += `<strong>${key}:</strong> ${obj[key]}<br>`;
                    }
                  }
                }
              }

              await page.setContent(contentHTML);

              const pdfBuffer = await page.pdf();
              await browser.close();

              const newMobile = mobCode + ' ' + mobile;
              const options = {
                email: 'dineshs25201@gmail.com',
                subject: 'New Student Request Form Received',
                html: compalintTemp(
                  'Student Request',
                  givenName,
                  email,
                  newMobile
                ),
                pdfBuffer: pdfBuffer,
              };

              const options2 = {
                email: email,
                subject: 'Student Request Form Submitted Successfully',
                html: `<p><b>Dear ${givenName}</b></p><br/>
<p>Thank You For Submitting Student Request Form</p>
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
              res.send({ Status: 'Failed' });
              console.log(e);
            });
        } catch (e) {
          res.send({ Status: 'Failed' });
          console.log(e);
        }
      })
      .catch((e) => {
        res.send({ Status: 'Failed' });
        console.log(e);
      });
  } catch (e) {
    res.send({ Status: 'Failed' });
    console.log(e);
  }
};
