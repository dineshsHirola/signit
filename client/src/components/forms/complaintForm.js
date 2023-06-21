import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import JsonData from '../../FormJSON/countryName.json';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import {
  IdValidation,
  emailValidator,
  handleCheckboxSubmit,
  handleComplaintCourseNameError,
  handleComplaintNameError,
  handleComplaintSurNameError,
  handleProcessedNameError,
  handleReceivedNameError,
  mobileValidation,
  startDateValidation,
} from '../errors/errorFun';

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    studentNumber: '',
    mobileCode: '',
    mobile: '',
    surName: '',
    givenName: '',
    email: '',
    courseName: '',
    reason: '',
    outcome: '',
    date: '',
    receivedBy: '',
    receivedDate: '',
    ProcessedBy: '',
    ProcessedDate: '',
  });

  const [declaration1, setDeclaration1] = useState(false);
  const [declaration2, setDeclaration2] = useState(false);
  const [declaration3, setDeclaration3] = useState(false);
  const [declaration4, setDeclaration4] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDecalaration1 = () => {
    if (declaration1 === false) {
      setDeclaration1(true);
    } else {
      setDeclaration1(false);
    }
  };

  const handleDecalaration2 = () => {
    if (declaration2 === false) {
      setDeclaration2(true);
    } else {
      setDeclaration2(false);
    }
  };

  const handleDecalaration3 = () => {
    if (declaration3 === false) {
      setDeclaration3(true);
    } else {
      setDeclaration3(false);
    }
  };

  const handleDecalaration4 = () => {
    if (declaration4 === false) {
      setDeclaration4(true);
    } else {
      setDeclaration4(false);
    }
  };

  const [idError, setIdError] = useState(false);
  const [idNull, setIdNull] = useState(false);

  const [mobileContryCodeNull, setMobileCountryCodeNull] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [mobileNull, setMobileNUll] = useState(false);

  const [surNameError, setSurNameError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [emailNull, setEmailNull] = useState(false);

  const [courseNameError, setCourseNameError] = useState(false);

  const [checkError, setCheckError] = useState(false);

  const [startDateNull, setstartDateNull] = useState(false);

  const [receivedError, setReceivedError] = useState(false);

  const [processedError, setProcessedError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const studendNumVer = IdValidation(
      formData.studentNumber,
      setIdError,
      setIdNull
    );
    const mobileVer = mobileValidation(
      formData.mobileCode,
      formData.mobile,
      setMobileCountryCodeNull,
      setMobileError,
      setMobileNUll
    );
    const surVer = handleComplaintSurNameError(
      formData.surName,
      setSurNameError
    );
    const emailVer = emailValidator(
      formData.email,
      setEmailError,
      setEmailNull
    );
    const nameVer = handleComplaintNameError(formData.givenName, setNameError);
    const courseNameVer = handleComplaintCourseNameError(
      formData.courseName,
      setCourseNameError
    );
    const declration = handleCheckboxSubmit(
      declaration1,
      declaration2,
      declaration3,
      declaration4,
      setCheckError
    );
    const dateVer = startDateValidation(formData.date, setstartDateNull);
    const receivedVer = handleReceivedNameError(
      formData.receivedBy,
      setReceivedError
    );
    console.log(formData.ProcessedBy);
    const processedVer = handleProcessedNameError(
      formData.ProcessedBy,
      setProcessedError
    );
    if (
      studendNumVer &&
      mobileVer &&
      surVer &&
      nameVer &&
      emailVer &&
      courseNameVer &&
      declration &&
      dateVer &&
      receivedVer &&
      processedVer
    ) {
      await axios
        .post('http://localhost:8000/forms/cf', {
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
        <h1 className="form-h1">Complaint Form</h1>
        <p className="sub-p">
          Before lodging a formal complaint, please ensure that you attempt, to
          resolve your concern by a direct and informal approach to individual
          concern wherever possible. If it is not possible to resolve your
          complaint in this manner, you are advised to read the Signet Institute
          of Australia Complaints and Appeals Policy and Procedures and complete
          this complaint form with all relevant evidence.
        </p>
        <div className="form-parent">
          <Form>
            <p className="form-p">STUDENT DETAILS</p>
            <div className="input-flex mobile-flex-div complaint-input">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Student Number:</Form.Label>
                <br />
                <Form.Control
                  type="number"
                  onChange={handleChange}
                  name="studentNumber"
                />
                {idError ? (
                  <p style={{ color: 'red' }}>Enter valid Student number</p>
                ) : null}
                {idNull ? (
                  <p style={{ color: 'red' }}>Enter Student number</p>
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
                  name="mobileCode"
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
            <div className="name-div complaint-input">
              <Form.Label>Name</Form.Label>
              <br />
              <div className="d-flex">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    name="surName"
                  />
                  {surNameError ? (
                    <p style={{ color: 'red' }}>
                      surname should contain only alphabets
                    </p>
                  ) : null}
                  <p className="input-p">Surname</p>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    name="givenName"
                  />
                  {nameError ? (
                    <p style={{ color: 'red' }}>
                      name should contain only alphabets
                    </p>
                  ) : null}
                  <p className="input-p">Given Name</p>
                </Form.Group>
              </div>
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
              </Form.Group>
            </div>
            <div className="textarea-div">
              <h5>Reason for complaint: </h5>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>
                  Please state the reason of your complaint, including details
                  such as the location, date, time, and names of any people who
                  involved and/ or areas of the Signet Institute of Australia.
                </Form.Label>
                <br />
                <Form.Control
                  as="textarea"
                  onChange={handleChange}
                  name="reason"
                />
              </Form.Group>
            </div>
            <div className="textarea-div">
              <h5>Outcome sought: </h5>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>
                  Please address what is your desired outcome.
                </Form.Label>
                <br />
                <Form.Control
                  as="textarea"
                  onChange={handleChange}
                  name="outcome"
                />
              </Form.Group>
            </div>
            <p className="complainet-p">
              Signet Institute of Australia understands and respects that
              privacy is important to you. We collect personal information about
              you so that we can provide you with the services you have
              requested. We may also disclose personal information about in
              accordance with our Privacy Policy and Procedure, including your
              education agent and the Australia government. Our privacy policy
              contains information about how you can access and correct the
              personal information we hold about you, or make a privacy
              complaint.
            </p>
            <div className="textarea-div check">
              <h5>DECLARATION</h5>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Check
                  inline
                  label="I have read the Signet Institute of Australia Complaint and
              Appeals Policy and Procedures"
                  onChange={handleDecalaration1}
                  name="declaration1"
                  type="checkbox"
                />

                <Form.Check
                  inline
                  label="I have attached supporting documents."
                  onChange={handleDecalaration2}
                  name="declaration2"
                  type="checkbox"
                />
                <Form.Check
                  inline
                  label="I understand my complaint will be acknowledged and will be forward to the relevant officer."
                  onChange={handleDecalaration3}
                  name="declaration3"
                  type="checkbox"
                />
                <Form.Check
                  inline
                  label="I declare that the information & documentation given is true and accurate to the best of my knowledge and I have not willfully suppressed any information."
                  onChange={handleDecalaration4}
                  name="declaration4"
                  type="checkbox"
                />
                {checkError ? (
                  <p style={{ color: 'red' }}>
                    Agree all the declarations to submit
                  </p>
                ) : null}
              </Form.Group>
            </div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Date:</Form.Label>
              <br />
              <Form.Control type="date" onChange={handleChange} name="date" />
              {startDateNull ? (
                <p style={{ color: 'red' }}>Please select start date</p>
              ) : null}
            </Form.Group>
            <div className="textarea-div">
              <h5>OFFICE USE ONLY (STAFF USE ONLY)</h5>
              <div className="input-flex">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="office-use">Received By:</Form.Label>
                  <br />
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    name="receivedBy"
                  />
                  {receivedError ? (
                    <p style={{ color: 'red' }}>
                      Received By should be in alphabets{' '}
                    </p>
                  ) : null}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="office-use">Received Date:</Form.Label>
                  <br />
                  <Form.Control
                    type="date"
                    onChange={handleChange}
                    name="receivedDate"
                  />
                </Form.Group>
              </div>
              <div className="input-flex ">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="office-use">Processed By:</Form.Label>
                  <br />
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    name="ProcessedBy"
                  />
                  {processedError ? (
                    <p style={{ color: 'red' }}>
                      Processed By should be in alphabets{' '}
                    </p>
                  ) : null}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="office-use">Processed Date:</Form.Label>
                  <br />
                  <Form.Control
                    type="date"
                    onChange={handleChange}
                    name="ProcessedDate"
                  />
                </Form.Group>
              </div>
            </div>
            <button onClick={handleSubmit}>Continue</button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default ComplaintForm;
