import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import JsonData from '../../FormJSON/countryName.json';
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

const GTEForm = () => {
  const [formData, setFormData] = useState({
    ref: '',
    prefix: 'Mr',
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    gender: '',
    mobCode: '',
    mobile: '',
    email: '',
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

  const [refNull, setRefNull] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseNameVer = handleCourseNameError(
      formData.courseName,
      setCourseNameError,
      setCourseNameNUll
    );
    const startDateVer = startDateValidation(
      formData.courseStartDate,
      setstartDateNull
    );
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
    const refVer = courseCodValidation(formData.ref, setRefNull);

    if (nameVer && dbVer && genderVer && mobVer && emailVer & refVer) {
      await axios
        .post('http://localhost:8000/forms/gtef', {
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
        <h1 className="form-h1">GENUINE TEMPORARY ENTRANT (GTE) FORM</h1>
        <h5 className="form-p sub-p-marg">OVERVIEW</h5>
        <p className="sub-p">
          Genuine student is someone who has real intentions to study only and
          who intends to obtain an education degree from an Australian education
          provider. Factors that are considered under the existing requirement
          to be a genuine applicant for entry and study as a student include:
          English language proficiency, financial capacity, prerequisite
          schooling. Age requirements, and intention to comply with visa
          conditions.Student are requested to provide a statement or/and answer
          the following parameters in the application to satisfy the requirement
          of following criteria of GTE:• The applicant’s circumstances in their
          home country the applicant’s potential circumstances in Australia• The
          value of the course in relation to the applicant’s future the
          applicant’s immigration history• Any other relevant mattersApplicant
          personal statement must be in English addressing the GTE requirement.
          Where an applicant is not comfortable writing their statement in
          English, it can be written in their own language, however, a
          translated copy must be submitted. An applicant can provide details
          within the application form or attach a written statement along with
          supporting documents. Generic statements unsupported by evidence will
          not be weighed heavily in the GTE
          assessment.https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/genuine-temporary-entrant
        </p>
        <h5 className="form-p sub-p-marg">Note:</h5>
        <p className="sub-p">
          The agent must risk assess an applicant. Decision makers may request
          additional information and/or further evidence from the applicant to
          demonstrate that they are a genuine temporary entrant.
        </p>
        <h5 className="form-p sub-p-marg">INSTRUCTIONS</h5>
        <p className="sub-p">
          The purpose of this form is to enable the Institute to make assessment
          of the genuineness of an applicants’ intention to complete their
          studies at Signet Institute of Australia. Each section is targeting a
          specific area on which Signet Institute of Australia will base its
          assessment, and in which the Department of Home Affairs may be
          interested in during your visa application. In addition to completing
          this form you may be contacted by the institute for an interview or
          clarification on any information provided. Please note that you must
          answer all questions in full. Failure to complete any answers may
          result in your application being rejected. All answers must be your
          own and you cannot seek assistance from others. This includes
          education and/or migration agents as well. All answers must be typed
          in. Hand filled details will not be accepted and considered
          incomplete. Incomplete forms will NOT be processed until they are
          completed and submitted. Providing false or misleading information is
          a serious offence under Australian law. If any information on the form
          is found to be incorrect, this will result in your application being
          rejected and/or your enrolment being discontinued.
        </p>
        <h5 className="form-p sub-p-marg">
          Please fill in your details below:
        </h5>
        <div className="form-parent">
          <Form>
            <h5 className="form-p">Applicants Details</h5>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Student Reference #:</Form.Label>
              <br />
              <Form.Control type="text" onChange={handleChange} name="ref" />
              {refNull ? (
                <p style={{ color: 'red' }}>Reference is required</p>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Full Name:</Form.Label>
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
            <div className="input-flex">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Date of Birth:</Form.Label>
                <br />
                <Form.Control type="date" onChange={handleChange} name="dob" />
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
                <Form.Label>Gender:</Form.Label>
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
                {genderNull ? (
                  <p style={{ color: 'red' }}>Please select your gender</p>
                ) : null}
              </Form.Group>
            </div>
            <div className="input-flex mobile-flex-div">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Mobile:</Form.Label>
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
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email:</Form.Label>
                <br />
                <Form.Control
                  type="email"
                  onChange={handleChange}
                  name="email"
                  className="dob-input"
                />
                <p className="input-p">example@example.com</p>
                {emailError ? (
                  <p style={{ color: 'red' }}>Enter valid email</p>
                ) : null}
                {emailNull ? (
                  <p style={{ color: 'red' }}>Enter your email</p>
                ) : null}
              </Form.Group>
            </div>

            <button onClick={handleSubmit}>Next</button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default GTEForm;
