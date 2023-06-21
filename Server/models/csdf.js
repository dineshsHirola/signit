const mongoose = require('mongoose');

const csdf_Schema = new mongoose.Schema({
  oldDetail: {
    courseEnrolledFile: {
      type: String,
    },
    name: {
      prefix: {
        type: String,
      },
      firstName: {
        type: String,
      },
      middleName: {
        type: String,
      },
      lastName: {
        type: String,
      },
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
    },
    mob: {
      mobCode: {
        type: String,
      },
      mobile: {
        type: String,
      },
    },
    email: {
      type: String,
    },
    altEmail: {
      type: String,
    },
    emergencyContact: {
      type: String,
    },
    kin: {
      type: String,
    },
    employer: {
      type: String,
    },
    address: {
      buildingName: {
        type: String,
      },
      street: {
        type: String,
      },
      town: {
        type: String,
      },
      state: {
        type: String,
      },
      postCode: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    overSeasAddress: {
        overSeasBuildingName: {
          type: String,
        },
        overSeasStreet: {
          type: String,
        },
        overSeasTown: {
          type: String,
        },
        overSeasState: {
          type: String,
        },
        overSeasPostCode: {
          type: String,
        },
        overSeasCountry: {
          type: String,
        },
      },
  },
  newDetail: {
    courseEnrolledFileNew: {
      type: String,
    },
    name: {
      prefixNew: {
        type: String,
      },
      firstNameNew: {
        type: String,
      },
      middleNameNew: {
        type: String,
      },
      lastNameNew: {
        type: String,
      },
    },
    dobNew: {
      type: String,
    },
    genderNew: {
      type: String,
    },
    mob: {
      mobCodeNew: {
        type: String,
      },
      mobileNew: {
        type: String,
      },
    },
    emailNew: {
      type: String,
    },
    altEmailNew: {
      type: String,
    },
    emergencyContactNew: {
      type: String,
    },
    kinNew: {
      type: String,
    },
    employerNew: {
      type: String,
    },
    address: {
      buildingNameNew: {
        type: String,
      },
      streetNew: {
        type: String,
      },
      townNew: {
        type: String,
      },
      stateNew: {
        type: String,
      },
      postCodeNew: {
        type: String,
      },
      countryNew: {
        type: String,
      },
    },
    overSeasAddress: {
        overSeasBuildingNameNew: {
          type: String,
        },
        overSeasStreetNew: {
          type: String,
        },
        overSeasTownNew: {
          type: String,
        },
        overSeasStateNew: {
          type: String,
        },
        overSeasPostCodeNew: {
          type: String,
        },
        overSeasCountryNew: {
          type: String,
        },
      },
  },
  typeOfId: {
    type: String,
  },
  idNumber: {
    type: String,
  },
});

const csdf_collection = mongoose.model('Csdf', csdf_Schema);

module.exports = csdf_collection;
