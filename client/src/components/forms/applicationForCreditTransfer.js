import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import JsonData from '../../FormJSON/countryName.json';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import {
  CredittelValidation,
  IdValidation,
  addressValidation,
  altEmailValidator,
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

const ApplicationForCreditTransfer = () => {
  const [formData, setFormData] = useState({
    prefix: 'Mr',
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    gender: '',
    telCode: '',
    telephone: '',
    mobCode: '',
    mobile: '',
    email: '',
    altEmail: '',
    typeOfId: '',
    idNumber: '',
    buildingName: '',
    street: '',
    town: '',
    state: '',
    postCode: '',
    country: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameVer = handleNameError(
      formData.firstName,
      formData.lastName,
      setNameNull,
      setNameError
    );
    const dbVer = dobValidation(formData.dob, setDobNull, setDobError);
    const genderVer = genderValidation(formData.gender, setGenderNull);
    const telVer = CredittelValidation(
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

    if (
      nameVer &&
      dbVer &&
      genderVer &&
      telVer &&
      mobVer &&
      emailVer &&
      altEmailVer &&
      typeOfIdVer &&
      idVer &&
      addressVer
    ) {
      await axios
        .post('http://localhost:8000/forms/ctf', {
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
        <h1 className="form-h1">APPLICATION FOR CREDIT TRANSFER</h1>
        <div className="form-parent">
          <Form>
            <p className="form-p">SECTION 1 - STUDENT DETAILS</p>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Full Name</Form.Label>
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
                <Form.Label>Telephone:</Form.Label>
                <br />
                <Form.Select
                  aria-label="Default select example"
                  className="flag-select"
                  onChange={handleChange}
                  name="telCode"
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
                  name="telephone"
                  minLength={10}
                />
                {contryCodeNull ? (
                  <p style={{ color: 'red' }}>
                    Please select country dail code
                  </p>
                ) : null}
                {TelError ? (
                  <p style={{ color: 'red' }}>Enter valid tel number</p>
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
            <div className="input-flex">
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
                />
                <p className="input-p">example@example.com</p>
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
                  onChange={handleChange}
                  name="altEmail"
                />
                <p className="input-p">example@example.com</p>
                {altEmailError ? (
                  <p style={{ color: 'red' }}>Enter valid alt email</p>
                ) : null}{' '}
              </Form.Group>
            </div>

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
                {typeIdNull ? (
                  <p style={{ color: 'red' }}>Enter type of ID</p>
                ) : null}{' '}
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
                ) : null}{' '}
              </Form.Group>
            </div>
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
                <div className="input-flex ">
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
                <div className="input-flex ">
                  <div>
                    <Form.Control
                      type="text"
                      onChange={handleChange}
                      name="postCode"
                    />
                    <p className='input-p'>Postcode</p>
                  </div>
                  <div>
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
                    <p className='input-p'>Country</p>
                  </div>
                </div>
                {addressNull ? (
                  <p style={{ color: 'red' }}>Enter all fields of Address</p>
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

export default ApplicationForCreditTransfer;
