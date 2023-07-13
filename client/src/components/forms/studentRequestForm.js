import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import SignatureCanvas from 'react-signature-canvas';
import JsonData from '../../FormJSON/countryName.json';
import axios from 'axios';
import {
  IdValidation,
  OtherRequestCheck,
  RequestDobValidation,
  RquestLeaveOnCheck,
  emailValidator,
  handleNameError,
  handleProcessedNameError,
  mobileValidation,
  requestValidator,
  typeOfIdValidation,
} from '../errors/errorFun';

const StudentRequestForm = () => {
  const [sign, setSign] = useState();
  const [url, setUrl] = useState();

  const handleClear = (e) => {
    e.preventDefault();
    sign.clear();
    setUrl('');
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    setUrl(sign.getTrimmedCanvas().toDataURL('image/png'));
  };

  const [formData, setFormData] = useState({
    studentID: '',
    surName: '',
    givenName: '',
    dob: '',
    mobCode: '',
    mobile: '',
    email: '',
    courseCode: '',
    courseName: '',
    date: '',
  });

  const [updateContact, setUpdateContact] = useState(false);
  const [enrollmentLetter, setEnrollmentLetter] = useState(false);
  const [certificate, setCertificate] = useState(false);
  const [soa, setSoa] = useState(false);
  const [progressReport, setProgressReport] = useState(false);
  const [leave, setLeave] = useState(false);
  const [otherReq, setOtherReq] = useState(false);

  const [updateContactValue, setUpdateContactValue] = useState('');
  const [leaveFrom, setLeaveFrom] = useState('');
  const [leaveTo, setLeaveTo] = useState('');
  const [otherInput, setOtherInput] = useState('');
  const [reqNull, setReqNull] = useState(false);
  const [idError, setIdError] = useState(false);
  const [idNull, setIdNull] = useState(false);

  const [nameNull, setNameNull] = useState(false);
  const [nameError, setNameError] = useState(false);

  const [dobError, setDobError] = useState(false);

  const [courseError, setCourseError] = useState(false);

  const [leaveError, setLeaveError] = useState(false);

  const [otherError, setOtherError] = useState(false);

  const [dateError, setDateError] = useState(false);
  const [signNull, setSignNull] = useState(false);

  const [mobileContryCodeNull, setMobileCountryCodeNull] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [mobileNull, setMobileNUll] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [emailNull, setEmailNull] = useState(false);

  const [courseNameNull, setCourseNameNull] = useState(false);
  const [courseCodeNull, setCourseCodeNull] = useState(false);

  const [dateNull, setDateNull] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpateContact = () => {
    if (updateContact === false) {
      setUpdateContact(true);
    } else {
      setUpdateContact(false);
    }
  };

  const handleEnrollmentLetter = () => {
    if (enrollmentLetter === false) {
      setEnrollmentLetter(true);
    } else {
      setEnrollmentLetter(false);
    }
  };

  const handleCertificate = () => {
    if (certificate === false) {
      setCertificate(true);
    } else {
      setCertificate(false);
    }
  };

  const handleSOA = () => {
    if (soa === false) {
      setSoa(true);
    } else {
      setSoa(false);
    }
  };

  const handleProgressReport = () => {
    if (progressReport === false) {
      setProgressReport(true);
    } else {
      setProgressReport(false);
    }
  };

  const handleLeave = () => {
    if (leave === false) {
      setLeave(true);
    } else {
      setLeave(false);
    }
  };

  const handleOtherReq = () => {
    if (otherReq === false) {
      setOtherReq(true);
    } else {
      setOtherReq(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const IdVer = IdValidation(formData.studentID, setIdError, setIdNull);
    const namVer = handleNameError(
      formData.surName,
      formData.givenName,
      setNameNull,
      setNameError
    );
    const dobVer = RequestDobValidation(formData.dob, setDobError);
    const leaveVer = RquestLeaveOnCheck(
      leave,
      leaveFrom,
      leaveTo,
      setLeaveError
    );
    const OtherVer = OtherRequestCheck(otherReq, otherInput, setOtherError);
    // const dateVer = RequestDobValidation(formData.date, setDateError);
    const signVer = typeOfIdValidation(url, setSignNull);
    const courseCodeVer = typeOfIdValidation(
      formData.courseCode,
      setCourseCodeNull
    );
    const courseNameVer = typeOfIdValidation(
      formData.courseName,
      setCourseNameNull
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
    const requestVer = requestValidator(
      updateContact,
      enrollmentLetter,
      certificate,
      soa,
      progressReport,
      leave,
      otherReq,
      leaveFrom,
      leaveTo,
      otherInput,
      setReqNull
    );
    const dateVer = typeOfIdValidation(formData.date, setDateNull);
    if (
      IdVer &&
      namVer &&
      dobVer &&
      courseNameVer &&
      leaveVer &&
      OtherVer &&
      dateVer &&
      signVer &&
      emailVer &&
      courseCodeVer &&
      mobVer &&
      requestVer
    ) {
      const arr = [url];
      await axios
        .post(`${process.env.REACT_APP_BACKEND_LINK}/forms/srf`, {
          formData,
          updateContact,
          enrollmentLetter,
          certificate,
          soa,
          progressReport,
          leave,
          otherReq,
          leaveFrom,
          leaveTo,
          otherInput,
          arr,
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
        <h1 className="form-h1">STUDENT REQUEST FORM</h1>
        <div className="form-parent">
          <Form className="form-div">
            <p className="form-p">STUDENT DETAILS</p>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Student ID:<span className="mandate">*</span>
              </Form.Label>
              <br />
              <Form.Control
                type="text"
                name="studentID"
                onChange={handleChange}
              />
              {idError ? (
                <p style={{ color: 'red', fontStyle: 'italic' }}>
                  Enter valid Student number
                </p>
              ) : null}
              {idNull ? (
                <p style={{ color: 'red', fontStyle: 'italic' }}>
                  Enter Student number
                </p>
              ) : null}
            </Form.Group>
            <div className="name-div complaint-input">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>
                  Student Name:<span className="mandate">*</span>
                </Form.Label>
                <div className="d-flex">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="surName"
                      onChange={handleChange}
                    />
                    <p className="input-p">Surname</p>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      name="givenName"
                      onChange={handleChange}
                    />
                    <p className="input-p">Given Name</p>
                  </Form.Group>
                </div>
              </Form.Group>
              {nameError ? (
                <p style={{ color: 'red', fontStyle: 'italic' }}>
                  surname and givenname should contain only alphabets
                </p>
              ) : null}
              {nameNull ? (
                <p style={{ color: 'red', fontStyle: 'italic' }}>
                  Student Name field is required
                </p>
              ) : null}
            </div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Date of Birth:</Form.Label>
              <br />
              <Form.Control type="date" name="dob" onChange={handleChange} />
              {dobError ? (
                <p style={{ color: 'red', fontStyle: 'italic' }}>
                  Select valid DOB
                </p>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Mobile:<span className="mandate">*</span>
              </Form.Label>
              <br />
              <div className="mobile-flex-div-child">
                <Form.Select
                  aria-label="Default select example"
                  className="flag-select"
                  onChange={handleChange}
                  name="mobCode"
                  value={formData.mobCode}
                >
                  <option selected hidden>
                    Select
                  </option>
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
                  value={formData.mobile}
                />
              </div>
              {mobileContryCodeNull ? (
                <p style={{ color: 'red', fontStyle: 'italic' }}>
                  Please select country dail code
                </p>
              ) : null}
              {mobileError ? (
                <p style={{ color: 'red', fontStyle: 'italic' }}>
                  Enter valid mobile number
                </p>
              ) : null}
              {mobileNull ? (
                <p style={{ color: 'red', fontStyle: 'italic' }}>
                  Enter your mobile number
                </p>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Email:<span className="mandate">*</span>
              </Form.Label>
              <br />
              <Form.Control
                type="email"
                onChange={handleChange}
                name="email"
                value={formData.email}
              />
              <p className="input-p">example@example.com</p>
              {emailError ? (
                <p style={{ color: 'red', fontStyle: 'italic' }}>
                  Enter valid email
                </p>
              ) : null}
              {emailNull ? (
                <p style={{ color: 'red', fontStyle: 'italic' }}>
                  Enter your email
                </p>
              ) : null}
            </Form.Group>
            <div className="input-flex course-code-flex">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>
                  Course Code:<span className="mandate">*</span>
                </Form.Label>
                <br />
                <Form.Control
                  type="text"
                  name="courseCode"
                  onChange={handleChange}
                />
                {courseCodeNull ? (
                  <p style={{ color: 'red', fontStyle: 'italic' }}>
                    Course Code is required
                  </p>
                ) : null}
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>
                  Course Name:<span className="mandate">*</span>
                </Form.Label>
                <br />
                <Form.Control
                  type="text"
                  name="courseName"
                  onChange={handleChange}
                />
                {courseError ? (
                  <p style={{ color: 'red', fontStyle: 'italic' }}>
                    Course should containe only alphabets
                  </p>
                ) : null}
                {courseNameNull ? (
                  <p style={{ color: 'red', fontStyle: 'italic' }}>
                    Course Code is required
                  </p>
                ) : null}
              </Form.Group>
            </div>
            <div className="textarea-div checkReq">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>
                  REQUEST TYPE (Tick below)<span className="mandate">*</span>
                </Form.Label>
                <Form.Check
                  inline
                  label="Update contact details"
                  name="group1"
                  type="checkbox"
                  onChange={handleUpateContact}
                  className="checkIn"
                />
                <Form.Check
                  inline
                  label="Request for enrolment letter"
                  name="group1"
                  type="checkbox"
                  onChange={handleEnrollmentLetter}
                  className="checkIn"
                />
                <Form.Check
                  inline
                  label="Request for Certificate"
                  name="group1"
                  type="checkbox"
                  onChange={handleCertificate}
                  className="checkIn"
                />
                <Form.Check
                  inline
                  label="Request for SOA"
                  name="group1"
                  type="checkbox"
                  onChange={handleSOA}
                  className="checkIn"
                />
                <Form.Check
                  inline
                  label="Request for Course progress report"
                  name="group1"
                  type="checkbox"
                  onChange={handleProgressReport}
                  className="checkIn"
                />
                <Form.Check
                  inline
                  label="Request for Leave"
                  name="group1"
                  type="checkbox"
                  onChange={handleLeave}
                  className="checkIn"
                />
                {leave ? (
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      Leave Date(From):<span className="mandate">*</span>
                    </Form.Label>
                    <br />
                    <Form.Control
                      type="date"
                      value={leaveFrom}
                      onChange={(e) => {
                        setLeaveFrom(e.target.value);
                      }}
                      className="leave-input"
                    />
                    <Form.Label>
                      Leave Date(To):<span className="mandate">*</span>
                    </Form.Label>
                    <Form.Control
                      type="date"
                      value={leaveTo}
                      onChange={(e) => {
                        setLeaveTo(e.target.value);
                      }}
                      className="leave-input"
                    />
                    {leaveError ? (
                      <p style={{ color: 'red', fontStyle: 'italic' }}>
                        Leave Date must be selected
                      </p>
                    ) : null}
                  </Form.Group>
                ) : null}
                <Form.Check
                  inline
                  label="Other Request (Detail below) :"
                  name="group1"
                  type="checkbox"
                  onChange={handleOtherReq}
                  className="checkIn"
                />
                {otherReq ? (
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      onChange={(e) => {
                        setOtherInput(e.target.value);
                      }}
                      value={otherInput}
                    />
                    {otherError ? (
                      <p style={{ color: 'red', fontStyle: 'italic' }}>
                        Other request field should not be empty
                      </p>
                    ) : null}
                  </Form.Group>
                ) : null}
                {reqNull ? (
                  <p style={{ color: 'red', fontStyle: 'italic' }}>
                    This field is required
                  </p>
                ) : null}
              </Form.Group>
            </div>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Signature<span className="mandate">*</span>
              </Form.Label>
              <br />
              <div className="sign_div">
                <SignatureCanvas
                  canvasProps={{
                    width: 300,
                    height: 100,
                    className: 'sigCanvas',
                  }}
                  ref={(data) => setSign(data)}
                />
              </div>
              {!url ? (
                <button onClick={handleGenerate} className="sign-btn">
                  Save
                </button>
              ) : (
                <button className="sign-btn saved-btn" disabled={true}>
                  Saved
                </button>
              )}
              <button onClick={handleClear} className="sign-btn">
                Clear
              </button>
              {signNull ? (
                <p style={{ color: 'red', fontStyle: 'italic' }}>
                  Signature is required
                </p>
              ) : null}
            </Form.Group>

            <Form.Group
              className="mb-3 date"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Label>
                Date:<span className="mandate">*</span>
              </Form.Label>
              <br />
              <Form.Control type="date" onChange={handleChange} name="date" />
              {dateNull ? (
                <p style={{ color: 'red', fontStyle: 'italic' }}>
                  This field is required
                </p>
              ) : null}
            </Form.Group>
            <button onClick={handleSubmit}>Submit</button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default StudentRequestForm;
