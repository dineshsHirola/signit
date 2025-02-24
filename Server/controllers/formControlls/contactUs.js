const { checkOutReq } = require('../../emailTemplate');
const contactUs_collection = require('../../models/contactUs');
const sendMail = require('../../utils/sendMail');
require('dotenv').config();
const puppeteer = require('puppeteer');

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
  const obj = {
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
  };
  contactUs_collection
    .insertMany(newContactUS)
    .then(async (result) => {
      res.send({ Status: 'Success' });
      // Generate PDF
      const browser = await puppeteer.launch({ headless: 'new' });
      const page = await browser.newPage();

      let contentHTML =
        '<div style="display:flex; justify-content:center; padding-top:10px;"><img src="https://digitalmarketingcompanybangalore.in/logo.png" width="200px" alt="Logo"/></div>';

      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object') {
            // console.log(`${key}:`);
            contentHTML += `<strong style="font-size:24px;line-height:1; padding-left:15px;">${key}:</strong><br>`; // Use <br> for line breaks in HTML
            for (let subKey in obj[key]) {
              if (obj[key].hasOwnProperty(subKey)) {
                if (obj[key][subKey] === true) {
                  // console.log(` ${subKey}`);
                  contentHTML += `<p style="margin:0px;padding:0px;font-size:20px;line-height:30px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${subKey}</p>`; // Use &nbsp; for indentation and <br> for line breaks
                }
              }
            }
          } else {
            // console.log(`${key}: ${obj[key]}`);
            contentHTML += `<p><strong style="font-size:24px;line-height:1; padding-left:15px;">${key}:</strong> <span style="font-size:20px;">${obj[key]}</span></p>`;
          }
        }
      }

      await page.setContent(contentHTML);

      const pdfBuffer = await page.pdf();
      await browser.close();

      const options = {
        email: process.env.CONTACT_MAIL,
        subject: 'New Contact Us Form Received',
        html: checkOutReq('Contact Us', name, email, mobile, country),
        pdfBuffer: pdfBuffer,
      };

      const options2 = {
        email: email,
        subject: 'Contact Us Form Submitted Successfully',
        html: `<img src="https://digitalmarketingcompanybangalore.in/logo.png" width="200px" alt="Logo"/><br/><p><b>Dear ${name}</b></p><br/>
        <p>Thank You For Submitting Contact Us Form</p>
        <p>Our Team Will Contact You</p><br/>
        <p><b>Thank you</b></p>
        <p><b>Signet institute</b></p>
        <p>${process.env.CONTACT_MAIL}</p>`,
      };

      sendMail(options)
        .then((result2) => {
          sendMail(options2)
            .then((result3) => {
              // res.send({ Status: 'Success' });
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((e) => {
      console.log(e);
      res.send({ Status: 'Failed to send' });
    });
};
