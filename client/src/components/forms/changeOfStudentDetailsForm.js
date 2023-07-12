import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import JsonData from '../../FormJSON/countryName.json';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import {
  ChangeAddr,
  ChangeIdValidation,
  ChangetypeOfIdValidation,
  changeCourse,
  changeDob,
  handleEmail,
  handleMob,
  handleName,
} from '../errors/errorFun';

const ChangeOfStudentDetailsForm = () => {
  const [formData1, setFormData1] = useState({
    courseEnrolledFile: '',
    prefix: 'Mr',
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    gender: '',
    mobCode: '',
    mobile: '',
    email: '',
    altEmail: '',
    emergencyContact: '',
    kin: '',
    employer: '',
    typeOfId: '',
    idNumber: '',
    buildingName: '',
    street: '',
    town: '',
    state: '',
    postCode: '',
    country: '',
    overSeasBuildingName: '',
    overSeasStreet: '',
    overSeasTown: '',
    overSeasState: '',
    overSeasPostCode: '',
    overSeasCountry: '',
  });

  const [formData2, setFormData2] = useState({
    courseEnrolledFileNew: '',
    prefixNew: 'Mr',
    firstNameNew: '',
    middleNameNew: '',
    lastNameNew: '',
    dobNew: '',
    genderNew: '',
    mobCodeNew: '',
    mobileNew: '',
    emailNew: '',
    altEmailNew: '',
    emergencyContactNew: '',
    kinNew: '',
    employerNew: '',
    buildingNameNew: '',
    streetNew: '',
    townNew: '',
    stateNew: '',
    postCodeNew: '',
    countryNew: '',
    overSeasBuildingNameNew: '',
    overSeasStreetNew: '',
    overSeasTownNew: '',
    overSeasStateNew: '',
    overSeasPostCodeNew: '',
    overSeasCountryNew: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData1({
      ...formData1,
      [name]: value,
    });
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2({
      ...formData2,
      [name]: value,
    });
  };

  const [courseNameError, setCourseNameError] = useState(false);
  // const [courseNameNull, setCourseNameNUll] = useState(false);

  const [nameNull, setNameNull] = useState(false);
  const [nameError, setNameError] = useState(false);

  const [dobNull, setDobNull] = useState(false);

  const [genderNull, setGenderNull] = useState(false);

  const [mobileContryCodeNull, setMobileCountryCodeNull] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [mobileNull, setMobileNUll] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [emailNull, setEmailNull] = useState(false);

  const [altEmailError, setAltEmailError] = useState(false);
  const [altEmailNull, setAltEmailNull] = useState(false);

  const [typeIdNull, setTypeIdNull] = useState(false);

  const [idError, setIdError] = useState(false);
  const [idNull, setIdNull] = useState(false);

  const [addressNull, setAddressNull] = useState(false);

  const [emergencyError, setEmergencyError] = useState(false);
  const [kinError, setKinError] = useState(false);
  const [employerError, setEmployerError] = useState(false);
  const [countryNull, setCountryNull] = useState(false);
  const [OverSeasNull, setOverSeasNull] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseVer = changeCourse(
      formData1.courseEnrolledFile,
      formData2.courseEnrolledFileNew,
      setCourseNameError
    );
    const namVer = handleName(
      formData1.firstName,
      formData1.lastName,
      formData2.firstNameNew,
      formData2.lastNameNew,
      setNameNull,
      setNameError
    );
    const dobVer = changeDob(formData1.dob, formData2.dobNew, setDobNull);
    const genVer = changeDob(
      formData1.gender,
      formData2.genderNew,
      setGenderNull
    );
    const mobVer = handleMob(
      formData1.mobCode,
      formData1.mobile,
      formData2.mobCodeNew,
      formData2.mobileNew,
      setMobileNUll,
      setMobileError
    );
    const emailVer = handleEmail(
      formData1.email,
      formData2.emailNew,
      setEmailNull,
      setEmailError
    );
    const altEmailVer = handleEmail(
      formData1.altEmail,
      formData2.altEmailNew,
      setAltEmailNull,
      setAltEmailError
    );
    const emerVer = changeCourse(
      formData1.emergencyContact,
      formData2.emergencyContactNew,
      setEmergencyError
    );
    const constkinVer = changeCourse(
      formData1.kin,
      formData2.kinNew,
      setKinError
    );
    const empVer = changeCourse(
      formData1.employer,
      formData2.employerNew,
      setEmployerError
    );
    const idVer = ChangeIdValidation(formData1.idNumber, setIdNull, setIdError);
    const addVer = ChangeAddr(
      formData1.buildingName,
      formData1.street,
      formData1.town,
      formData1.state,
      formData1.postCode,
      formData1.country,
      formData2.buildingNameNew,
      formData2.stateNew,
      formData2.townNew,
      formData2.stateNew,
      formData2.postCodeNew,
      formData2.countryNew,
      setCountryNull
    );
    const OverAddVer = ChangeAddr(
      formData1.overSeasBuildingName,
      formData1.overSeasStreet,
      formData1.overSeasTown,
      formData1.overSeasState,
      formData1.overSeasPostCode,
      formData1.overSeasCountry,
      formData2.overSeasBuildingNameNew,
      formData2.overSeasStateNew,
      formData2.overSeasTownNew,
      formData2.overSeasStateNew,
      formData2.overSeasPostCodeNew,
      formData2.overSeasCountryNew,
      setOverSeasNull
    );
    if (
      courseVer &&
      namVer &&
      dobVer &&
      genVer &&
      mobVer &&
      emailVer &&
      altEmailVer &&
      emerVer &&
      constkinVer &&
      empVer &&
      idVer &&
      addVer &&
      OverAddVer
    ) {
      await axios
        .post(`${process.env.REACT_APP_BACKEND_LINK}/forms/csdf`, {
          formData1,
          formData2,
        })
        .then((res) => {
          if (res.data.Status === 'Success') {
            alert('Success');
          } else {
            alert('Failed');
          }
        })
        .catch((e) => {
          console.log('Axios error', e);
        });
    }
  };

  return (
    <div className="outer-div">
      <Container>
        <h1 className="form-h1">Change Of Student Details Form</h1>
        <div className="form-parent">
          <Form>
            <p className="form-p">STUDENT DETAILS</p>
            <div className="input-flex">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Course Enrolled in On File:</Form.Label>
                <br />
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  name="courseEnrolledFile"
                />
              </Form.Group>
              <br />
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Course Enrolled in New:</Form.Label>
                <br />
                <Form.Control
                  type="text"
                  onChange={handleChange2}
                  name="courseEnrolledFileNew"
                />
                <br />
                {courseNameError ? (
                  <p style={{ color: 'red' }}>Both field is required</p>
                ) : null}
              </Form.Group>
            </div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <div className="change-name">
                <Form.Label>Full Name on File:</Form.Label>
                <br />
                <div className="d-flex">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Select
                      aria-label="Default select example"
                      onChange={handleChange}
                      name="prefix"
                    >
                      <option value="Mr." selected>
                        Mr.
                      </option>
                      <option value="Mrs.">Mrs.</option>
                    </Form.Select>
                    <p className="input-p">Title</p>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      onChange={handleChange}
                      name="firstName"
                    />
                    <p className="input-p">First Name</p>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      onChange={handleChange}
                      name="middleName"
                    />
                    <p className="input-p">Middel Name</p>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      onChange={handleChange}
                      name="lastName"
                    />
                    <p className="input-p">Last Name</p>
                  </Form.Group>
                </div>
              </div>
              <div className="change-name">
                <Form.Label>Full name New:</Form.Label>
                <br />
                <div className="d-flex">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Select
                      aria-label="Default select example"
                      onChange={handleChange2}
                      name="prefixNew"
                    >
                      <option value="Mr." selected>
                        Mr.
                      </option>
                      <option value="Mrs.">Mrs.</option>
                    </Form.Select>
                    <p className="input-p">Title</p>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      onChange={handleChange2}
                      name="firstNameNew"
                    />
                    <p className="input-p">First Name</p>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      onChange={handleChange2}
                      name="middleNameNew"
                    />
                    <p className="input-p">Middel Name</p>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      onChange={handleChange2}
                      name="lastNameNew"
                    />
                    <p className="input-p">Last Name</p>
                  </Form.Group>
                </div>
              </div>
              {nameError ? (
                <p style={{ color: 'red' }}>
                  First Name and Last Name should contain only alphabets
                </p>
              ) : null}
              {nameNull ? (
                <p style={{ color: 'red' }}>
                  Please enter First Name and Last Name
                </p>
              ) : null}
            </Form.Group>
            <div className="input-flex">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Date of Birth on File:</Form.Label>
                <br />
                <Form.Control type="date" onChange={handleChange} name="dob" />
                <br />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Date of Birth New:</Form.Label>
                <br />
                <Form.Control
                  type="date"
                  onChange={handleChange2}
                  name="dobNew"
                />
              </Form.Group>
            </div>
            {dobNull ? <p style={{ color: 'red' }}>Please select DOB</p> : null}

            <div className="input-flex change-div">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Gender on File:</Form.Label>
                <br />
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleChange}
                  name="gender"
                >
                  <option>Please Select</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="PNTS">Prefer not to say</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Gender New:</Form.Label>
                <br />
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleChange2}
                  name="genderNew"
                >
                  <option>Please Select</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="PNTS">Prefer not to say</option>
                </Form.Select>
              </Form.Group>
            </div>
            {genderNull ? (
              <p style={{ color: 'red' }}>Please select your gender</p>
            ) : null}

            <div className="input-flex mobile-flex-div">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Mobile on File:</Form.Label>
                <br />
                <div className="mobile-flex-div-child">
                  <Form.Select
                    aria-label="Default select example"
                    className="flag-select"
                    onChange={handleChange}
                    name="mobCode"
                  >
                    <option>Select</option>
                    {JsonData.map((value) => {
                      return (
                        <option value={value.dial_code}>
                          <span>
                            <span>{value.flag} &nbsp;</span>
                            <span>{value.name} &nbsp;</span>
                            <span>{value.dial_code}</span>
                          </span>
                        </option>
                      );
                    })}
                  </Form.Select>
                  <Form.Control
                    type="tel"
                    onChange={handleChange}
                    name="mobile"
                  />
                </div>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Mobile New:</Form.Label>
                <br />
                <div className="mobile-flex-div-child">
                  <Form.Select
                    aria-label="Default select example"
                    className="flag-select"
                    onChange={handleChange2}
                    name="mobCodeNew"
                  >
                    <option>Select</option>
                    {JsonData.map((value) => {
                      return (
                        <option value={value.dial_code}>
                          <span>
                            <span>{value.flag} &nbsp;</span>
                            <span>{value.name} &nbsp;</span>
                            <span>{value.dial_code}</span>
                          </span>
                        </option>
                      );
                    })}
                  </Form.Select>
                  <Form.Control
                    type="tel"
                    onChange={handleChange2}
                    name="mobileNew"
                  />
                </div>
              </Form.Group>
            </div>
            {mobileError ? (
              <p style={{ color: 'red' }}>Enter valid mobile number</p>
            ) : null}
            {mobileNull ? (
              <p style={{ color: 'red' }}>
                Mobile Number is required in both the fields
              </p>
            ) : null}

            <div className="input-flex">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email on File:</Form.Label>
                <br />
                <Form.Control
                  type="email"
                  onChange={handleChange}
                  name="email"
                />
                <p className="input-p">example@example.com</p>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email New:</Form.Label>
                <br />
                <Form.Control
                  type="email"
                  onChange={handleChange2}
                  name="emailNew"
                />
                <p className="input-p">example@example.com</p>
              </Form.Group>
            </div>
            {emailError ? (
              <p style={{ color: 'red' }}>Enter valid email</p>
            ) : null}
            {emailNull ? (
              <p style={{ color: 'red' }}>Enter your email</p>
            ) : null}

            <div className="input-flex change-div">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Alternative Email on File:</Form.Label>
                <br />
                <Form.Control
                  type="email"
                  onChange={handleChange}
                  name="altEmail"
                />
                <p className="input-p">example@example.com</p>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Alternative Email New:</Form.Label>
                <br />
                <Form.Control
                  type="email"
                  onChange={handleChange2}
                  name="altEmailNew"
                />{' '}
                <p className="input-p">example@example.com</p>
              </Form.Group>
            </div>
            {altEmailError ? (
              <p style={{ color: 'red' }}>Enter valid alt email</p>
            ) : null}
            {altEmailNull ? (
              <p style={{ color: 'red' }}>Enter your email</p>
            ) : null}

            <div className="input-flex">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Emergency Contact on File:</Form.Label>
                <br />
                <Form.Control
                  type="number"
                  onChange={handleChange}
                  name="emergencyContact"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Emergency Contact New:</Form.Label>
                <br />
                <Form.Control
                  type="number"
                  onChange={handleChange2}
                  name="emergencyContactNew"
                />
              </Form.Group>
            </div>
            {emergencyError ? (
              <p style={{ color: 'red' }}>
                Both Emergency Contact Fields are required
              </p>
            ) : null}

            <div className="input-flex change-div">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Next of Kin on File:</Form.Label>
                <br />
                <Form.Control type="text" onChange={handleChange} name="kin" />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Next of Kin New:</Form.Label>
                <br />
                <Form.Control
                  type="text"
                  onChange={handleChange2}
                  name="kinNew"
                />
              </Form.Group>
            </div>
            {kinError ? (
              <p style={{ color: 'red' }}>Both fields are required</p>
            ) : null}

            <div className="input-flex">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Employer on File:</Form.Label>
                <br />
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  name="employer"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Employer New:</Form.Label>
                <br />
                <Form.Control
                  type="text"
                  onChange={handleChange2}
                  name="employerNew"
                />
              </Form.Group>
            </div>
            {employerError ? (
              <p style={{ color: 'red' }}>Both fields are required</p>
            ) : null}

            <h5 className="h5">Identification Verified</h5>
            <div className="input-flex">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Type of ID:</Form.Label>
                <br />
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  name="typeOfId"
                />
                <br />
                {typeIdNull ? (
                  <p style={{ color: 'red' }}>Enter type of ID</p>
                ) : null}
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>ID Number:</Form.Label>
                <br />
                <Form.Control
                  type="number"
                  onChange={handleChange}
                  name="idNumber"
                />
                {idError ? (
                  <p style={{ color: 'red' }}>Enter valid ID number</p>
                ) : null}
                {idNull ? (
                  <p style={{ color: 'red' }}>Enter your ID number</p>
                ) : null}
              </Form.Group>
            </div>
            {/* <hr /> */}
            <div className="input-flex address-div">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                {/* <div className="addressFelx">
                <div className="addressChild1"> */}
                <Form.Label>Address on File:</Form.Label>
                <br />
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  name="buildingName"
                />
                <p className="input-p">Building name, Unit name</p>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  name="street"
                />
                <p className="input-p">Street Address</p>
                <Form.Control type="text" onChange={handleChange} name="town" />
                <p className="input-p">Suburb/Town</p>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  name="state"
                />
                <p className="input-p">State</p>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  name="postCode"
                />
                <p className="input-p">Postcode</p>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleChange}
                  name="country"
                >
                  <option>Please Select</option>
                  {JsonData.map((value) => {
                    return (
                      <option key={value.code} value={value.name}>
                        {value.name}
                      </option>
                    );
                  })}
                </Form.Select>
                <p className="input-p">Country</p>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                {/* </div>
                <div className="addressChild2"> */}
                <Form.Label>Address New:</Form.Label>
                <br />
                <Form.Control
                  type="text"
                  onChange={handleChange2}
                  name="buildingNameNew"
                />
                <p className="input-p">Building name, Unit name</p>
                <Form.Control
                  type="text"
                  onChange={handleChange2}
                  name="streetNew"
                />
                <p className="input-p">Street Address</p>
                <Form.Control
                  type="text"
                  onChange={handleChange2}
                  name="townNew"
                />
                <p className="input-p">Suburb/Town</p>
                <Form.Control
                  type="text"
                  onChange={handleChange2}
                  name="stateNew"
                />
                <p className="input-p">State</p>
                <Form.Control
                  type="text"
                  onChange={handleChange2}
                  name="postCodeNew"
                />
                <p className="input-p">Postcode</p>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleChange2}
                  name="countryNew"
                >
                  <option>Please Select</option>
                  {JsonData.map((value) => {
                    return (
                      <option key={value.code} value={value.name}>
                        {value.name}
                      </option>
                    );
                  })}
                </Form.Select>
                <p className="input-p">Country</p>
                {/* </div>
              </div> */}
                {countryNull ? (
                  <p style={{ color: 'red' }}>
                    Both old and new address fields is required
                  </p>
                ) : null}
              </Form.Group>
            </div>
            {/* <hr /> */}
            <div className="input-flex address-div">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                {/* <div className="addressFelx">
                  <div className="addressChild1"> */}
                <Form.Label>Overseas Address on File:</Form.Label>
                <br />
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  name="overSeasBuildingName"
                />
                <p className="input-p">Building name, Unit name</p>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  name="overSeasStreet"
                />
                <p className="input-p">Street Address</p>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  name="overSeasTown"
                />
                <p className="input-p">Suburb/Town</p>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  name="overSeasState"
                />
                <p className="input-p">State</p>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  name="overSeasPostCode"
                />
                <p className="input-p">Postcode</p>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleChange}
                  name="overSeasCountry"
                  className="select-country"
                >
                  <option>Please Select</option>
                  {JsonData.map((value) => {
                    return (
                      <option key={value.code} value={value.name}>
                        {value.name}
                      </option>
                    );
                  })}
                </Form.Select>
                <p className="input-p">Country</p>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                {/* </div> */}
                {/* <div className="addressChild2"> */}
                <Form.Label>Overseas Address New:</Form.Label>
                <br />
                <Form.Control
                  type="text"
                  onChange={handleChange2}
                  name="overSeasBuildingNameNew"
                />
                <p className="input-p">Building name, Unit name</p>
                <Form.Control
                  type="text"
                  onChange={handleChange2}
                  name="overSeasStreetNew"
                />
                <p className="input-p">Street Address</p>
                <Form.Control
                  type="text"
                  onChange={handleChange2}
                  name="overSeasTownNew"
                />
                <p className="input-p">Suburb/Town</p>
                <Form.Control
                  type="text"
                  onChange={handleChange2}
                  name="overSeasStateNew"
                />
                <p className="input-p">State</p>
                <Form.Control
                  type="text"
                  onChange={handleChange2}
                  name="overSeasPostCodeNew"
                />
                <p className="input-p">Postcode</p>
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleChange2}
                  name="overSeasCountryNew"
                  className="select-country"
                >
                  <option>Please Select</option>
                  {JsonData.map((value) => {
                    return (
                      <option key={value.code} value={value.name}>
                        {value.name}
                      </option>
                    );
                  })}
                </Form.Select>
                <p className="input-p">Country</p>
                {/* </div>
                </div> */}
              </Form.Group>
              {OverSeasNull ? (
                <p style={{ color: 'red' }}>
                  Both old and new Overseas address fields is required
                </p>
              ) : null}
            </div>
            <button onClick={handleSubmit}>Submit</button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default ChangeOfStudentDetailsForm;
