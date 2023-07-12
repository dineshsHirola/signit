import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import JsonData from '../../FormJSON/countryName.json';
import Container from 'react-bootstrap/Container';
import SignatureCanvas from 'react-signature-canvas';
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
  typeOfIdValidation,
} from '../errors/errorFun';

const ComplaintForm = () => {
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

  const [signNull, setSignNull] = useState(false);

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
    const processedVer = handleProcessedNameError(
      formData.ProcessedBy,
      setProcessedError
    );
    const signVer = typeOfIdValidation(url, setSignNull);
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
      processedVer &&
      signVer
    ) {
      const arr = [url];

      await axios
        .post(`${process.env.REACT_APP_BACKEND_LINK}/forms/cf`, {
          formData,
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
          <Form className="form-div">
            <p className="form-p">STUDENT DETAILS</p>
            <div className="input-flex mobile-flex-div complaint-input">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>
                  Student Number:<span className="mandate">*</span>
                </Form.Label>
                <br />
                <Form.Control
                  type="number"
                  onChange={handleChange}
                  name="studentNumber"
                  value={formData.studentNumber}
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
                <Form.Label>
                  Mobile:<span className="mandate">*</span>
                </Form.Label>
                <br />
                <div className="mobile-flex-div-child">
                  <Form.Select
                    aria-label="Default select example"
                    className="flag-select"
                    onChange={handleChange}
                    name="mobileCode"
                    value={formData.mobileCode}
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
                    className="mobile-input"
                    value={formData.mobile}
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
                    value={formData.surName}
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
                    value={formData.givenName}
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
                  value={formData.courseName}
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
                  value={formData.reason}
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
                  value={formData.outcome}
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
                <span className="mandate">*</span>

                <Form.Check
                  inline
                  label="I have attached supporting documents."
                  onChange={handleDecalaration2}
                  name="declaration2"
                  type="checkbox"
                />
                <span className="mandate">*</span>
                <Form.Check
                  inline
                  label="I understand my complaint will be acknowledged and will be forward to the relevant officer."
                  onChange={handleDecalaration3}
                  name="declaration3"
                  type="checkbox"
                />
                <span className="mandate">*</span>
                <Form.Check
                  inline
                  label="I declare that the information & documentation given is true and accurate to the best of my knowledge and I have not willfully suppressed any information."
                  onChange={handleDecalaration4}
                  name="declaration4"
                  type="checkbox"
                />
                <span className="mandate">*</span>
                {checkError ? (
                  <p style={{ color: 'red' }}>
                    Agree all the declarations to submit
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
                <p style={{ color: 'red' }}>Signature is required</p>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Date:<span className="mandate">*</span>
              </Form.Label>
              <br />
              <Form.Control
                type="date"
                onChange={handleChange}
                name="date"
                value={formData.date}
              />
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
                    value={formData.receivedBy}
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
                    value={formData.receivedDate}
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
                    value={formData.ProcessedBy}
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
                  <Form.Label className="office-use">
                    Processed Date:
                  </Form.Label>
                  <br />
                  <Form.Control
                    type="date"
                    onChange={handleChange}
                    name="ProcessedDate"
                    value={formData.ProcessedDate}
                  />
                </Form.Group>
              </div>
            </div>
            <button onClick={handleSubmit}>Submit</button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default ComplaintForm;
