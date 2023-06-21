const csdf_collection = require('../../models/csdf');
require('dotenv').config();

module.exports = async (req, res) => {
  const {
    courseEnrolledFile,
    prefix,
    firstName,
    middleName,
    lastName,
    dob,
    gender,
    mobCode,
    mobile,
    email,
    altEmail,
    emergencyContact,
    kin,
    employer,
    typeOfId,
    idNumber,
    buildingName,
    street,
    town,
    state,
    postCode,
    country,
    overSeasBuildingName,
    overSeasStreet,
    overSeasTown,
    overSeasState,
    overSeasPostCode,
    overSeasCountry,
  } = req.body.formData1;

  const {
    courseEnrolledFileNew,
    prefixNew,
    firstNameNew,
    middleNameNew,
    lastNameNew,
    dobNew,
    genderNew,
    mobCodeNew,
    mobileNew,
    emailNew,
    altEmailNew,
    emergencyContactNew,
    kinNew,
    employerNew,
    buildingNameNew,
    streetNew,
    townNew,
    stateNew,
    postCodeNew,
    countryNew,
    overSeasBuildingNameNew,
    overSeasStreetNew,
    overSeasTownNew,
    overSeasStateNew,
    overSeasPostCodeNew,
    overSeasCountryNew,
  } = req.body.formData2;

  const newcsdf = new csdf_collection({
    oldDetail: {
      courseEnrolledFile,
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
      altEmail,
      emergencyContact,
      kin,
      employer,
      address: {
        buildingName,
        street,
        town,
        state,
        postCode,
        country,
      },
      overSeasAddress: {
        overSeasBuildingName,
        overSeasStreet,
        overSeasTown,
        overSeasState,
        overSeasPostCode,
        overSeasCountry,
      },
    },
    newDetail: {
      courseEnrolledFileNew,
      name: {
        prefixNew,
        firstNameNew,
        middleNameNew,
        lastNameNew,
      },
      dobNew,
      genderNew,
      mob: {
        mobCodeNew,
        mobileNew,
      },
      emailNew,
      altEmailNew,
      emergencyContactNew,
      kinNew,
      employerNew,
      address: {
        buildingNameNew,
        streetNew,
        townNew,
        stateNew,
        postCodeNew,
        countryNew,
      },
      overSeasAddress: {
        overSeasBuildingNameNew,
        overSeasStreetNew,
        overSeasTownNew,
        overSeasStateNew,
        overSeasPostCodeNew,
        overSeasCountryNew,
      },
    },
    typeOfId,
    idNumber,
  });
  csdf_collection
    .insertMany(newcsdf)
    .then((result) => {
      res.send({ Status: 'Success', result: result });
    })
    .catch((e) => {
      console.log('Serverside error', e);
    });
};
