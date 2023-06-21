import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import JsonData from '../../FormJSON/countryName.json';
import Container from 'react-bootstrap/Container';
import { FileUploader } from 'react-drag-drop-files';
import axios from 'axios';
import {
  IdValidation,
  addressValidation,
  altEmailValidator,
  courseCodValidation,
  dobValidation,
  emailValidator,
  genderValidation,
  handleCourseNameError,
  handleError,
  handleNameError,
  handleNullError,
  mobileValidation,
  startDateValidation,
  telValidation,
  typeOfIdValidation,
} from '../errors/errorFun';

const ApplicationToCancelEnrolment = () => {
  const fileTypes = ['JPG', 'PNG', 'GIF'];
  const [file, setFile] = useState(null);
  const handleFileChange = (file) => {
    setFile(file);
  };

  const [formData, setFormData] = useState({
    courseName: '',
    courseCode: '',
    qualCode: '',
    qualName: '',
    prefix: 'Mr',
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    mobCode: '',
    mobile: '',
    email: '',
    altEmail: '',
    buildingName: '',
    street: '',
    town: '',
    state: '',
    postCode: '',
    country: '',
    detail: '',
    date: '',
    reason: '',
    intStudent: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [courseNameError, setCourseNameError] = useState(false);
  const [courseNameNull, setCourseNameNUll] = useState(false);

  const [startDateNull, setstartDateNull] = useState(false);

  const [nameNull, setNameNull] = useState(false);
  const [nameError, setNameError] = useState(false);

  const [dobError, setDobError] = useState(false);
  const [dobNull, setDobNull] = useState(false);

  const [genderNull, setGenderNull] = useState(false);

  const [contryCodeNull, setCountryCodeNull] = useState(false);
  const [TelError, setTelError] = useState(false);
  // const [TelNull, setTelNUll] = useState(false);

  const [mobileContryCodeNull, setMobileCountryCodeNull] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [mobileNull, setMobileNUll] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [emailNull, setEmailNull] = useState(false);

  const [altEmailError, setAltEmailError] = useState(false);

  const [typeIdNull, setTypeIdNull] = useState(false);

  const [idError, setIdError] = useState(false);
  const [idNull, setIdNull] = useState(false);

  const [addressNull, setAddressNull] = useState(false);

  const [qualeCodeNull, setQualeCodeNull] = useState(false);
  const [courseCodeNull, setCourseCodeNull] = useState(false);
  const [qualeNameNull, setQualeNameNull] = useState(false);
  const [detailsNull, setDetailsNull] = useState(false);
  const [reasonsNull, setReasonsNull] = useState(false);
  const [fileNull, setFileNull] = useState(false);
  const [radioNull, setRadioNull] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const courseNameVer = handleCourseNameError(
      formData.courseName,
      setCourseNameError,
      setCourseNameNUll
    );
    const startDateVer = startDateValidation(formData.date, setstartDateNull);
    const nameVer = handleNameError(
      formData.firstName,
      formData.lastName,
      setNameNull,
      setNameError
    );
    const dbVer = dobValidation(formData.dob, setDobNull, setDobError);
    const genderVer = genderValidation(formData.gender, setGenderNull);
    const telVer = telValidation(
      formData.telCode,
      formData.telephone,
      setCountryCodeNull,
      setTelError
    );
    const mobVer = mobileValidation(
      formData.mobCode,
      formData.mobile,
      setMobileCountryCodeNull,
      setMobileError,
      setMobileNUll
    );
    const emailVer = emailValidator(
      formData.email,
      setEmailError,
      setEmailNull
    );
    const altEmailVer = altEmailValidator(formData.altEmail, setAltEmailError);
    const typeOfIdVer = typeOfIdValidation(formData.typeOfId, setTypeIdNull);
    const idVer = IdValidation(formData.idNumber, setIdError, setIdNull);
    const addressVer = addressValidation(
      formData.buildingName,
      formData.street,
      formData.town,
      formData.state,
      formData.postCode,
      formData.country,
      setAddressNull
    );
    const courseCodeVer = courseCodValidation(
      formData.courseCode,
      setCourseCodeNull
    );
    const qualCodeVer = courseCodValidation(
      formData.qualCode,
      setQualeCodeNull
    );
    const qualName = courseCodValidation(formData.qualName, setQualeNameNull);
    const reasonVer = courseCodValidation(formData.reason, setReasonsNull);
    const detailVer = courseCodValidation(formData.detail, setDetailsNull);
    const radioVer = courseCodValidation(formData.intStudent, setRadioNull);

    if (
      courseNameVer &&
      startDateVer &&
      nameVer &&
      dbVer &&
      mobVer &&
      emailVer &&
      altEmailVer &&
      addressVer &&
      courseCodeVer &&
      qualCodeVer &&
      qualName &&
      reasonVer &&
      detailVer &&
      radioVer
    ) {
      console.log(formData);
      await axios
        .post('http://localhost:8000/forms/cef', {
          formData,
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
        <h1 className="form-h1">APPLICATION TO CANCEL ENROLMENT</h1>
        <p className="sub-p">
          Please read the information and complete all relevant pages of this
          form, sign the declaration, and submit this form in person Signet
          Institute reception counter or via email: info@signet.edu.auYou must
          refer to your Student Agreement for the Signet Institute Fees and
          Refunds Policy to confirm if you are liable to pay any course fees or
          eligible to apply for refund.Only form cancellation requests will be
          considered.
        </p>
        <div className="form-parent">
          <Form>
            <p className="form-p">STUDENT DETAILS</p>
            <div className="name-div">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Full Name</Form.Label>
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
            </div>
            <div className="flex-width">
              <div className="input-flex mobile-flex-div ">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Date of Birth:</Form.Label>
                  <br />
                  <Form.Control
                    type="date"
                    onChange={handleChange}
                    name="dob"
                    className="dob-input"
                  />
                  {dobError ? (
                    <p style={{ color: 'red' }}>Select valid DOB</p>
                  ) : null}
                  {dobNull ? (
                    <p style={{ color: 'red' }}>Please select DOB</p>
                  ) : null}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Mobile:</Form.Label>
                  <br />
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
                  {mobileContryCodeNull ? (
                    <p style={{ color: 'red' }}>
                      Please select country dail code
                    </p>
                  ) : null}
                  {mobileError ? (
                    <p style={{ color: 'red' }}>Enter valid mobile number</p>
                  ) : null}
                  {mobileNull ? (
                    <p style={{ color: 'red' }}>Enter your mobile number</p>
                  ) : null}
                </Form.Group>
              </div>
            </div>
            <div className="flex-width">
              <div className="input-flex">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Email:</Form.Label>
                  <br />
                  <Form.Control
                    type="email"
                    placeholder="example@example.com"
                    onChange={handleChange}
                    name="email"
                  />
                  {emailError ? (
                    <p style={{ color: 'red' }}>Enter valid email</p>
                  ) : null}
                  {emailNull ? (
                    <p style={{ color: 'red' }}>Enter your email</p>
                  ) : null}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Alternative Email:</Form.Label>
                  <br />
                  <Form.Control
                    type="email"
                    placeholder="example@example.com"
                    onChange={handleChange}
                    name="altEmail"
                  />
                  {altEmailError ? (
                    <p style={{ color: 'red' }}>Enter valid alt email</p>
                  ) : null}
                </Form.Group>
              </div>
            </div>

            <div className="flex-width">
              <div className="address-div">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Address</Form.Label>
                  <br />
                  <div className="input-flex ">
                    <div>
                      <Form.Control
                        type="text"
                        onChange={handleChange}
                        name="buildingName"
                      />
                      <p className="input-p">Building name, Unit name</p>
                    </div>
                    <div>
                      <Form.Control
                        type="text"
                        onChange={handleChange}
                        name="street"
                      />
                      <p className="input-p">Street Address</p>
                    </div>
                  </div>
                  <div className="input-flex">
                    <div>
                      <Form.Control
                        type="text"
                        onChange={handleChange}
                        name="town"
                      />
                      <p className="input-p">Suburb/Town</p>
                    </div>
                    <div>
                      <Form.Control
                        type="text"
                        onChange={handleChange}
                        name="state"
                      />
                      <p className="input-p">State</p>
                    </div>
                  </div>
                  <div className="input-flex">
                    <div>
                      <Form.Control
                        type="text"
                        onChange={handleChange}
                        name="postCode"
                      />
                      <p className="input-p">Postcode</p>
                    </div>
                    <div>
                      <Form.Select
                        aria-label="Default select example"
                        onChange={handleChange}
                        name="country"
                        className="country-select select-country"
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
                    </div>
                  </div>
                  {addressNull ? (
                    <p style={{ color: 'red' }}>Enter all fields of Address</p>
                  ) : null}
                </Form.Group>
              </div>
            </div>

            <div className="flex-width">
              <div className="input-flex">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Course Code:</Form.Label>
                  <br />
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    name="courseCode"
                  />
                  {courseCodeNull ? (
                    <p style={{ color: 'red' }}>Course Code is required</p>
                  ) : null}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Course Name:</Form.Label>
                  <br />
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    name="courseName"
                  />
                  {courseNameError ? (
                    <p style={{ color: 'red' }}>
                      Course Name should contain only alphabets
                    </p>
                  ) : null}
                  {courseNameNull ? (
                    <p style={{ color: 'red' }}>Please enter course name</p>
                  ) : null}
                </Form.Group>
              </div>
            </div>

            <div className="textarea-div">
              <h5>Details for the Request</h5>
              <div className="flex-width">
                <div className="input-flex">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Course / Qualification Code</Form.Label>
                    <br />
                    <Form.Control
                      type="text"
                      onChange={handleChange}
                      name="qualCode"
                    />
                    {qualeCodeNull ? (
                      <p style={{ color: 'red' }}>Course Code is required</p>
                    ) : null}
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Course / Qualification Name</Form.Label>
                    <br />
                    <Form.Control
                      type="text"
                      onChange={handleChange}
                      name="qualName"
                    />
                    {qualeNameNull ? (
                      <p style={{ color: 'red' }}>Please enter course name</p>
                    ) : null}
                  </Form.Group>
                </div>
              </div>
            </div>

            <div className="flex-width">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="complainet-p">
                  Provide details when do you want to cancel your enrolment.
                </Form.Label>
                <Form.Control
                  as="textarea"
                  onChange={handleChange}
                  name="detail"
                />
                {detailsNull ? (
                  <p style={{ color: 'red' }}>Details is required</p>
                ) : null}
              </Form.Group>
            </div>

            <div className="flex-width dob-mar">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Date effective from:</Form.Label>
                <br />
                <Form.Control type="date" onChange={handleChange} name="date" />
                {startDateNull ? (
                  <p style={{ color: 'red' }}>Date is required</p>
                ) : null}
              </Form.Group>
            </div>

            <div className="flex-width ">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="complainet-p">
                  Provided the reasons for your request:
                </Form.Label>
                <Form.Control
                  as="textarea"
                  onChange={handleChange}
                  name="reason"
                />
                {reasonsNull ? (
                  <p style={{ color: 'red' }}>Reason is required</p>
                ) : null}
              </Form.Group>
            </div>

            <div className="flex-width ">
              <div className="textarea-div">
                <h5>Supporting Documents:</h5>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Your request will only be considered if you have provided
                    evidence of the reasons for your request. Please list the
                    documents attached:
                  </Form.Label>
                  <FileUploader
                    handleChange={handleFileChange}
                    name="file"
                    types={fileTypes}
                  />
                  {fileNull ? (
                    <p style={{ color: 'red' }}>Reason is required</p>
                  ) : null}
                </Form.Group>
              </div>
            </div>

            <div className="flex-width ">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Are you an International student?</Form.Label>
              <Form.Check
                inline
                label="Yes"
                name="intStudent" className='radio-input'
                value="Yes"
                type="radio"
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="No"
                name="intStudent" className='radio-input'
                value="No"
                type="radio"
                onChange={handleChange}
              />
              {radioNull ? (
                <p style={{ color: 'red' }}>Reason is required</p>
              ) : null}
            </Form.Group>
            </div>

            <div className="flex-width btn-mar-top">
            <button onClick={handleSubmit}>Submit</button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default ApplicationToCancelEnrolment;
