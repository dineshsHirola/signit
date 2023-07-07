export const handleNullError = (nameVer) => {
  const keys = Object.keys(nameVer);
  const values = Object.values(nameVer);

  const ValRes = values.map((value, index) => {
    const keyName = keys[index];
    if (keyName === 'middleName') {
      return true;
    } else {
      if (value === '') {
        return false;
      } else {
        return true;
      }
    }
  });

  const Result = loopfun(ValRes);
  return Result;
};

function loopfun(arr) {
  if (arr.includes(false)) {
    return false;
  } else {
    return true;
  }
}

// ---------------------------------------------------------------------------

export const handleCourseNameError = (
  name,
  setCourseNameError,
  setCourseNameNUll
) => {
  var exp1 = /^[A-Za-z ]+$/;
  if (name === '') {
    setCourseNameNUll(true);
    return false;
  } else {
    if (!exp1.test(name)) {
      setCourseNameNUll(false);
      setCourseNameError(true);
      return false;
    } else {
      setCourseNameNUll(false);
      setCourseNameError(false);
      return true;
    }
  }
};

export const startDateValidation = (dob, setstartDateNull) => {
  if (!dob) {
    setstartDateNull(true);
    return false;
  } else {
    setstartDateNull(false);
    return true;
  }
};

export const handleNameError = (fname, lname, setNameNull, setNameError) => {
  var exp1 = /^[A-Za-z ]+$/;
  if (fname === '' || lname === '') {
    setNameNull(true);
    return false;
  } else {
    if (!exp1.test(fname) || !exp1.test(lname)) {
      setNameNull(false);
      setNameError(true);
      return false;
    } else {
      setNameNull(false);
      setNameError(false);
      return true;
    }
  }
};

export const dobValidation = (dob, setDobNull, setDobError) => {
  if (!dob) {
    setDobNull(true);
    return false;
  } else {
    const today = new Date();
    if (dob > today) {
      setDobNull(false);
      setDobError(true);
      return false;
    } else {
      setDobNull(false);
      setDobError(false);
      return true;
    }
  }
};

export const genderValidation = (gender, setGenderNull) => {
  if (!gender) {
    setGenderNull(true);
    return false;
  } else {
    setGenderNull(false);
    return true;
  }
};

export const telValidation = (
  code,
  num,
  setCountryCodeNull,
  setTelError
  // setTelNUll
) => {
  const exp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if (!code) {
    // setTelNUll(false);
    setTelError(false);
    setCountryCodeNull(true);
    return false;
  } else {
    // setTelNUll(false);
    setTelError(false);
    setCountryCodeNull(false);
    if (!num) {
      setTelError(false);
      // setTelNUll(true);
      return false;
    } else {
      // setTelNUll(false);
      if (!exp.test(num)) {
        // setTelNUll(false);
        setTelError(true);
        return false;
      } else {
        // setTelNUll(false);
        setTelError(false);
        return true;
      }
    }
  }
};

export const contactUsMobileValidation = (num, setMobileError) => {
  const exp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  // const exp =/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  if (!exp.test(num)) {
    setMobileError(true);
    return false;
  } else {
    setMobileError(false);
    return true;
  }
};

export const mobileValidation = (
  code,
  num,
  setMobileCountryCodeNull,
  setMobileError,
  setMobileNUll
) => {
  const exp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if (!code) {
    setMobileNUll(false);
    setMobileError(false);
    setMobileCountryCodeNull(true);
    return false;
  } else {
    setMobileNUll(false);
    setMobileError(false);
    setMobileCountryCodeNull(false);
    if (!num) {
      setMobileError(false);
      setMobileNUll(true);
      return false;
    } else {
      setMobileNUll(false);
      if (!exp.test(num)) {
        setMobileNUll(false);
        setMobileError(true);
        return false;
      } else {
        setMobileNUll(false);
        setMobileError(false);
        return true;
      }
    }
  }
};

export const emailValidator = (email, setEmailError, setEmailNull) => {
  var exp1 =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email) {
    setEmailNull(true);
    return false;
  } else {
    setEmailNull(false);
    if (!exp1.test(email)) {
      setEmailError(true);
      return false;
    } else {
      setEmailError(false);
      return true;
    }
  }
};

export const altEmailValidator = (email, setAltEmailError) => {
  var exp1 =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!email) {
    setAltEmailError(false);
    return true;
  } else {
    if (!exp1.test(email)) {
      setAltEmailError(true);
      return false;
    } else {
      setAltEmailError(false);
      return true;
    }
  }
};

export const typeOfIdValidation = (typeOfID, setTypeIdNull) => {
  if (!typeOfID) {
    setTypeIdNull(true);
    return false;
  } else {
    setTypeIdNull(false);
    return true;
  }
};

export const IdValidation = (ID, setIdError, setIdNull) => {
  const exp = /^[0-9]+$/;
  if (!ID) {
    setIdNull(true);
    return false;
  } else {
    setIdNull(false);
    if (!exp.test(ID)) {
      setIdError(true);
      return false;
    } else {
      setIdError(false);
      return true;
    }
  }
};

export const addressValidation = (
  buildingName,
  street,
  town,
  state,
  postCode,
  country,
  setAddressNull
) => {
  if (!buildingName || !street || !town || !state || !postCode || !country) {
    setAddressNull(true);
    return false;
  } else {
    setAddressNull(false);
    return true;
  }
};

export const handleCheckboxSubmit = (
  declaration1,
  declaration2,
  declaration3,
  declaration4,
  setCheckError
) => {
  if (
    declaration1 === false ||
    declaration2 === false ||
    declaration3 === false ||
    declaration4 === false
  ) {
    setCheckError(true);
    return false;
  } else {
    setCheckError(false);
    return true;
  }
};

export const handleAdminCheckboxSubmit = (
  declaration1,
  declaration2,
  declaration3,
  setCheckError
) => {
  if (
    declaration1 === false &&
    declaration2 === false &&
    declaration3 === false
  ) {
    setCheckError(true);
    return false;
  } else {
    setCheckError(false);
    return true;
  }
};

export const handleAcknowledgement = (declaration1, setCheckError) => {
  if (declaration1 === true) {
    setCheckError(false);
    return true;
  } else {
    setCheckError(true);
    return false;
  }
};

export const refundTypeValidation = (
  refundType,
  otherRefundInput,
  setRadioNull
) => {
  if (refundType === '') {
    setRadioNull(true);
    return false;
  } else {
    if (refundType === 'other') {
      if (otherRefundInput === '') {
        setRadioNull(true);
        return false;
      } else {
        setRadioNull(false);
        return true;
      }
    } else {
      setRadioNull(false);
      return true;
    }
  }
};

export const OfficialCertificateVaidation = (
  refundType,
  otherRefundInput,
  setRadioNull
) => {
  if (refundType === '') {
    setRadioNull(true);
    return false;
  } else {
    if (refundType === 'Yes') {
      if (otherRefundInput === '') {
        setRadioNull(true);
        return false;
      } else {
        setRadioNull(false);
        return true;
      }
    } else {
      setRadioNull(false);
      return true;
    }
  }
};

export const providedCertifiedCopyOfEvidenceVaidation = (
  refundType,
  otherRefundInput,
  setRadioNull
) => {
  if (refundType === '') {
    setRadioNull(true);
    return false;
  } else {
    if (refundType === 'No') {
      if (otherRefundInput === '') {
        setRadioNull(true);
        return false;
      } else {
        setRadioNull(false);
        return true;
      }
    } else {
      setRadioNull(false);
      return true;
    }
  }
};




export const handleComplaintSurNameError = (surName, setSurNameError) => {
  var exp1 = /^[A-Za-z ]+$/;
  if (surName === '') {
    setSurNameError(false);
    return true;
  } else {
    if (!exp1.test(surName)) {
      setSurNameError(true);
      return false;
    } else {
      setSurNameError(false);
      return true;
    }
  }
};

export const handleComplaintNameError = (givenName, setNameError) => {
  var exp1 = /^[A-Za-z ]+$/;
  if (givenName === '') {
    setNameError(false);
    return true;
  } else {
    if (!exp1.test(givenName)) {
      setNameError(true);
      return false;
    } else {
      setNameError(false);
      return true;
    }
  }
};

export const handleComplaintCourseNameError = (name, setCourseNameError) => {
  var exp1 = /^[A-Za-z ]+$/;
  if (name === '') {
    return true;
  } else {
    if (!exp1.test(name)) {
      setCourseNameError(true);
      return false;
    } else {
      setCourseNameError(false);
      return true;
    }
  }
};

export const handleReceivedNameError = (surName, setSurNameError) => {
  var exp1 = /^[A-Za-z ]+$/;
  if (surName === '') {
    setSurNameError(false);
    return true;
  } else {
    if (!exp1.test(surName)) {
      setSurNameError(true);
      return false;
    } else {
      setSurNameError(false);
      return true;
    }
  }
};

export const handleProcessedNameError = (surName, setSurNameError) => {
  var exp1 = /^[A-Za-z ]+$/;
  if (surName === '') {
    setSurNameError(false);
    return true;
  } else {
    if (!exp1.test(surName)) {
      setSurNameError(true);
      return false;
    } else {
      setSurNameError(false);
      return true;
    }
  }
};

export const RequestDobValidation = (dob, setDobError) => {
  const today = new Date();
  if (dob > today) {
    setDobError(true);
    return false;
  } else {
    setDobError(false);
    return true;
  }
};

export const RquestLeaveOnCheck = (
  leave,
  leaveFrom,
  leaveTo,
  setLeaveError
) => {
  if (leave === true) {
    if (!leaveFrom || !leaveTo) {
      setLeaveError(true);
      return false;
    } else {
      setLeaveError(false);
      return true;
    }
  } else {
    return true;
  }
};

export const OtherRequestCheck = (leave, inputs, setLeaveError) => {
  if (leave === true) {
    if (!inputs) {
      setLeaveError(true);
      return false;
    } else {
      setLeaveError(false);
      return true;
    }
  } else {
    return true;
  }
};

export const changeCourse = (oldData, newData, setError) => {
  if (!oldData && !newData) {
    setError(false);
    return true;
  } else {
    if (oldData && newData) {
      setError(false);
      return true;
    } else {
      setError(true);
      return false;
    }
  }
};

export const handleName = (
  fname,
  lname,
  fname2,
  lname2,
  setNameNull,
  setNameError
) => {
  var exp1 = /^[A-Za-z ]+$/;
  if (fname === '' && lname === '' && fname2 === '' && lname2 === '') {
    setNameNull(false);
    setNameError(false);
    return true;
  } else {
    if (fname && lname) {
      if (fname2 && lname2) {
        setNameNull(false);
        if (
          !exp1.test(fname) ||
          !exp1.test(lname) ||
          !exp1.test(lname2) ||
          !exp1.test(fname2)
        ) {
          setNameError(true);
          return false;
        } else {
          setNameError(false);
          return true;
        }
      } else {
        setNameError(false);
        setNameNull(true);
        return false;
      }
    } else {
      if (fname2 && lname2) {
        if (fname && lname) {
          setNameNull(false);
          if (
            !exp1.test(fname) ||
            !exp1.test(lname) ||
            !exp1.test(lname2) ||
            !exp1.test(fname2)
          ) {
            setNameError(true);
            return false;
          } else {
            setNameError(false);
            return true;
          }
        } else {
          setNameError(false);
          setNameNull(true);
          return false;
        }
      } else {
        setNameError(false);
        setNameNull(false);
        return true;
      }
    }
  }
};

export const changeDob = (oldData, newData, setError) => {
  if (!oldData && !newData) {
    setError(false);
    return true;
  } else {
    if (oldData && newData) {
      setError(false);
      return true;
    } else {
      setError(true);
      return false;
    }
  }
};

export const handleMob = (
  fname,
  lname,
  fname2,
  lname2,
  setNameNull,
  setNameError
) => {
  var exp1 = /^[0-9]+$/;
  if (fname === '' || lname === '' || fname2 === '' || lname2 === '') {
    setNameNull(true);
    return false;
  } else {
    if (!exp1.test(lname) || !exp1.test(lname2)) {
      setNameError(true);
      setNameNull(false);
      return false;
    } else {
      setNameError(false);
      setNameNull(false);
      return true;
    }
  }
};

export const handleEmail = (fname, lname, setNameNull, setNameError) => {
  var exp1 =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (fname === '' && lname === '') {
    setNameNull(false);
    setNameError(false);
    return true;
  } else {
    if (fname === '' || lname === '') {
      setNameNull(true);
      return false;
    } else {
      setNameNull(false);
      if (!exp1.test(fname) || !exp1.test(lname)) {
        setNameError(true);
        return false;
      } else {
        setNameError(false);
        return true;
      }
    }
  }
};

export const ChangeIdValidation = (IDOld, setIdNull, setIdError) => {
  const exp = /^[0-9]+$/;
  if (!IDOld) {
    setIdNull(false);
    return true;
  } else {
    setIdNull(false);
    if (!exp.test(IDOld)) {
      setIdError(true);
      return false;
    } else {
      setIdError(false);
      return true;
    }
  }
};

export const ChangeAddr = (
  oldBuild,
  oldStreet,
  oldTown,
  oldState,
  oldPost,
  oldCountry,
  newBuild,
  newStreet,
  newTown,
  newState,
  newPost,
  newCountry,
  setCountryNull
) => {
  if (
    !oldBuild &&
    !oldStreet &&
    !oldTown &&
    !oldState &&
    !oldPost &&
    !oldCountry &&
    !newBuild &&
    !newStreet &&
    !newTown &&
    !newState &&
    !newPost &&
    !newCountry
  ) {
    setCountryNull(false);
    return true;
  } else {
    if (
      oldBuild &&
      oldStreet &&
      oldTown &&
      oldState &&
      oldPost &&
      oldCountry &&
      newBuild &&
      newStreet &&
      newTown &&
      newState &&
      newPost &&
      newCountry
    ) {
      setCountryNull(false);
      return true;
    } else {
      setCountryNull(true);
      return false;
    }
  }
};

export const CredittelValidation = (
  code,
  num,
  setCountryCodeNull,
  setTelError
  // setTelNUll
) => {
  const exp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if (!code) {
    // setTelNUll(false);
    setTelError(false);
    setCountryCodeNull(false);
    return false;
  } else {
    // setTelNUll(false);
    setTelError(false);
    setCountryCodeNull(false);
    if (!num) {
      setTelError(false);
      // setTelNUll(true);
      return false;
    } else {
      // setTelNUll(false);
      if (!exp.test(num)) {
        // setTelNUll(false);
        setTelError(true);
        return false;
      } else {
        // setTelNUll(false);
        setTelError(false);
        return true;
      }
    }
  }
};

export const courseCodValidation = (
  code,
  setCountryCodeNull // setTelNUll
) => {
  if (!code) {
    setCountryCodeNull(true);
    return false;
  } else {
    setCountryCodeNull(false);
    return true;
  }
};
