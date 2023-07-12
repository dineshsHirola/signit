const ctf_collection = require('../../models/ctf');
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const _ = require('lodash');

module.exports = async (req, res) => {
  const {
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
    courseCodeTitle,
    statementOfAttenment,
    headOfCompliance,
    explanationOfDecision,
    courseSectionDate,
    repFirstName,
    repLastName,
    unitsDate,
    initials,
    initialsDate,
    adminFirstName,
    adminLastName,
    adminDate,
    managerFirstName,
    managerLastName,
    managerDate,
  } = req.body.formData;

  const {
    unitCode1,
    unitTitle1,
    unitCode2,
    unitTitle2,
    unitCode3,
    unitTitle3,
    unitCode4,
    unitTitle4,
    unitCode5,
    unitTitle5,
    unitCode6,
    unitTitle6,
    unitCode7,
    unitTitle7,
    unitCode8,
    unitTitle8,
  } = req.body.inputArr;

  const {
    declaration1,
    declaration2,
    declaration3,
    officialCertificate,
    officialTranscript,
    base64Images,
    base64Images1,
    arr,
    arr1,
    arr2,
  } = req.body;

  const array = [
    unitCode1,
    unitTitle1,
    unitCode2,
    unitTitle2,
    unitCode3,
    unitTitle3,
    unitCode4,
    unitTitle4,
    unitCode5,
    unitTitle5,
    unitCode6,
    unitTitle6,
    unitCode7,
    unitTitle7,
    unitCode8,
    unitTitle8,
  ];

  const unitCode = [];
  const unitTitle = [];

  array.map((val, index) => {
    if (
      index === 0 ||
      index === 2 ||
      index === 4 ||
      index === 6 ||
      index === 8 ||
      index === 10 ||
      index === 12 ||
      index === 14
    ) {
      if (val === '') {
      } else {
        unitCode.push(val);
      }
    } else {
      if (val === '') {
      } else {
        unitTitle.push(val);
      }
    }
  });

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
          folder: `signit/ctf/${foldername}/certificate`,
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
          folder: `signit/ctf/${foldername}/transcript`,
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
          folder: `signit/ctf/${foldername}/signature/student`,
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
    let image4 = async (value) => {
      try {
        const response = await cloudinary.uploader.upload(value, {
          upload_preset: 'signit',
          folder: `signit/ctf/${foldername}/signature/admin`,
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
        console.log(e, 'Hello1');
        return null;
      }
    };

    let image5 = async (value) => {
      try {
        const response = await cloudinary.uploader.upload(value, {
          upload_preset: 'signit',
          folder: `signit/ctf/${foldername}/signature/campus`,
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
        // console.log(e, "hello");
        return null;
      }
    };

    const upload = base64Images.map(image);
    const arrayImages = [];

    const upload2 = base64Images1.map(image2);
    const arrayImages2 = [];

    const upload3 = arr.map(image3);
    const arrayImages3 = [];

    // const upload4 = arr1.map(image4);
    // const arrayImages4 = [];

    // const upload5 = arr2.map(image5);
    // const arrayImages5 = [];

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
                if (arr1[0] && !arr2[0]) {
                  const upload4 = arr1.map(image4);
                  const arrayImages4 = [];
                  Promise.all(upload4)
                    .then((result4) => {
                      result4.map((val) => {
                        arrayImages4.push(val.public_id);
                      });
                      try {
                        const newctf = new ctf_collection({
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
                          courseCodeTitle,
                          statementOfAttenment,
                          headOfCompliance,
                          explanationOfDecision,
                          courseSectionDate,
                          repFirstName,
                          repLastName,
                          unitsDate,
                          initials,
                          initialsDate,
                          adminFirstName,
                          adminLastName,
                          adminDate,
                          managerFirstName,
                          managerLastName,
                          managerDate,
                          studentAdvisedInWriting: declaration1,
                          ctRecordedInSms: declaration2,
                          applicationClosed: declaration3,
                          unitCode: unitCode,
                          unitTitle: unitTitle,
                          officialCertificate,
                          officialTranscript,
                          signatureImage: arrayImages,
                          signatureImage2: arrayImages2,
                          sign: arrayImages3,
                          adminSign: arrayImages4,
                        });
                        ctf_collection
                          .insertMany(newctf)
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
                      res.send({ Status: 'Success' });
                    });
                } else if (arr2[0] && !arr1[0]) {
                  const upload5 = arr2.map(image5);
                  const arrayImages5 = [];
                  Promise.all(upload5)
                    .then((result5) => {
                      result5.map((val) => {
                        arrayImages5.push(val.public_id);
                      });
                      try {
                        const newctf = new ctf_collection({
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
                          courseCodeTitle,
                          statementOfAttenment,
                          headOfCompliance,
                          explanationOfDecision,
                          courseSectionDate,
                          repFirstName,
                          repLastName,
                          unitsDate,
                          initials,
                          initialsDate,
                          adminFirstName,
                          adminLastName,
                          adminDate,
                          managerFirstName,
                          managerLastName,
                          managerDate,
                          studentAdvisedInWriting: declaration1,
                          ctRecordedInSms: declaration2,
                          applicationClosed: declaration3,
                          unitCode: unitCode,
                          unitTitle: unitTitle,
                          officialCertificate,
                          officialTranscript,
                          signatureImage: arrayImages,
                          signatureImage2: arrayImages2,
                          sign: arrayImages3,
                          campusSign: arrayImages5,
                        });
                        ctf_collection
                          .insertMany(newctf)
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
                      res.send({ Status: 'Success' });
                    });
                } else if (!arr1[0] && !arr2[0]) {
                  try {
                    const newctf = new ctf_collection({
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
                      courseCodeTitle,
                      statementOfAttenment,
                      headOfCompliance,
                      explanationOfDecision,
                      courseSectionDate,
                      repFirstName,
                      repLastName,
                      unitsDate,
                      initials,
                      initialsDate,
                      adminFirstName,
                      adminLastName,
                      adminDate,
                      managerFirstName,
                      managerLastName,
                      managerDate,
                      studentAdvisedInWriting: declaration1,
                      ctRecordedInSms: declaration2,
                      applicationClosed: declaration3,
                      unitCode: unitCode,
                      unitTitle: unitTitle,
                      officialCertificate,
                      officialTranscript,
                      signatureImage: arrayImages,
                      signatureImage2: arrayImages2,
                      sign: arrayImages3,
                    });
                    ctf_collection
                      .insertMany(newctf)
                      .then((result) => {
                        res.send({ Status: 'Success', result: result });
                      })
                      .catch((e) => {
                        res.send({ Status: 'Failed' });
                      });
                  } catch (e) {
                    res.send({ Status: 'Failed' });
                  }
                } else {
                  const upload4 = arr1.map(image4);
                  const arrayImages4 = [];

                  const upload5 = arr2.map(image5);
                  const arrayImages5 = [];
                  Promise.all(upload4)
                    .then((result4) => {
                      result4.map((val) => {
                        arrayImages4.push(val.public_id);
                      });
                      Promise.all(upload5)
                        .then((result5) => {
                          result5.map((val) => {
                            arrayImages5.push(val.public_id);
                          });
                          try {
                            const newctf = new ctf_collection({
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
                              courseCodeTitle,
                              statementOfAttenment,
                              headOfCompliance,
                              explanationOfDecision,
                              courseSectionDate,
                              repFirstName,
                              repLastName,
                              unitsDate,
                              initials,
                              initialsDate,
                              adminFirstName,
                              adminLastName,
                              adminDate,
                              managerFirstName,
                              managerLastName,
                              managerDate,
                              studentAdvisedInWriting: declaration1,
                              ctRecordedInSms: declaration2,
                              applicationClosed: declaration3,
                              unitCode: unitCode,
                              unitTitle: unitTitle,
                              officialCertificate,
                              officialTranscript,
                              signatureImage: arrayImages,
                              signatureImage2: arrayImages2,
                              sign: arrayImages3,
                              adminSign: arrayImages4,
                              campusSign: arrayImages5,
                            });
                            ctf_collection
                              .insertMany(newctf)
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
                      res.send({ Status: 'Filed' });
                    });
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

// try {
//   const newctf = new ctf_collection({
//     name: {
//       prefix: prefix,
//       firstName: firstName,
//       middleName: middleName,
//       lastName: lastName,
//     },
//     dob: dob,
//     gender: gender,
//     tel: {
//       telCode: telCode,
//       telephone: telephone,
//     },
//     mob: {
//       mobCode: mobCode,
//       mobile: mobile,
//     },
//     email: email,
//     altEmail: altEmail,
//     typeOfId: typeOfId,
//     idNumber: idNumber,
//     address: {
//       buildingName: buildingName,
//       street: street,
//       town: town,
//       state: state,
//       postCode: postCode,
//       country: country,
//     },
//     courseCodeTitle,
//     statementOfAttenment,
//     headOfCompliance,
//     explanationOfDecision,
//     courseSectionDate,
//     repFirstName,
//     repLastName,
//     unitsDate,
//     initials,
//     initialsDate,
//     adminFirstName,
//     adminLastName,
//     adminDate,
//     managerFirstName,
//     managerLastName,
//     managerDate,
//     studentAdvisedInWriting: declaration1,
//     ctRecordedInSms: declaration2,
//     applicationClosed: declaration3,
//     unitCode: unitCode,
//     unitTitle: unitTitle,
//     officialCertificate,
//     officialTranscript,
//     signatureImage: arrayImages,
//     signatureImage2: arrayImages2,
//     sign: arrayImages3,
//   });
//   ctf_collection
//     .insertMany(newctf)
//     .then((result) => {
//       res.send({ Status: 'Success', result: result });
//     })
//     .catch((e) => {
//       res.send({ Status: 'Failed' });
//     });
// } catch (e) {
//   res.send({ Status: 'Failed' });
// }

// result4.map((val) => {
//   arrayImages4.push(val.public_id);
// });
// result5.map((val) => {
//   arrayImages5.push(val.public_id);
// });
