import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import {
  IdValidation,
  OtherRequestCheck,
  RequestDobValidation,
  RquestLeaveOnCheck,
  handleNameError,
  handleProcessedNameError,
} from '../errors/errorFun';

const StudentRequestForm = () => {
  const [formData, setFormData] = useState({
    studentID: '',
    surName: '',
    givenName: '',
    dob: '',
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

  const [idError, setIdError] = useState(false);
  const [idNull, setIdNull] = useState(false);

  const [nameNull, setNameNull] = useState(false);
  const [nameError, setNameError] = useState(false);

  const [dobError, setDobError] = useState(false);

  const [courseError, setCourseError] = useState(false);

  const [leaveError, setLeaveError] = useState(false);

  const [otherError, setOtherError] = useState(false);

  const [dateError, setDateError] = useState(false);

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
      // setUpdateContactValue('Update contact details');
    } else {
      setUpdateContact(false);
      // setUpdateContactValue('');
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
    const courseNameVer = handleProcessedNameError(
      formData.courseName,
      setCourseError
    );
    const leaveVer = RquestLeaveOnCheck(
      leave,
      leaveFrom,
      leaveTo,
      setLeaveError
    );
    const OtherVer = OtherRequestCheck(otherReq, otherInput, setOtherError);
    const dateVer = RequestDobValidation(formData.date, setDateError);
    if (
      IdVer &&
      namVer &&
      dobVer &&
      courseNameVer &&
      leaveVer &&
      OtherVer &&
      dateVer
    ) {
      await axios
        .post('http://localhost:8000/forms/srf', {
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
        <div className="form-parent reqForm-parent">
          <Form>
            <p className="form-p">STUDENT DETAILS</p>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Student ID:</Form.Label>
              <br />
              <Form.Control
                type="text"
                name="studentID"
                onChange={handleChange}
              />
              {idError ? (
                <p style={{ color: 'red' }}>Enter valid Student number</p>
              ) : null}
              {idNull ? (
                <p style={{ color: 'red' }}>Enter Student number</p>
              ) : null}
            </Form.Group>
            <div className="name-div complaint-input">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Student Name:</Form.Label>
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
                    {nameError ? (
                      <p style={{ color: 'red' }}>
                        surname and givenname should contain only alphabets
                      </p>
                    ) : null}
                    {nameNull ? (
                      <p style={{ color: 'red' }}>
                        Student Name field is required
                      </p>
                    ) : null}
                  </Form.Group>
                </div>
              </Form.Group>
            </div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Date of Birth:</Form.Label>
              <br />
              <Form.Control type="date" name="dob" onChange={handleChange} />
              {dobError ? (
                <p style={{ color: 'red' }}>Select valid DOB</p>
              ) : null}
            </Form.Group>
            <div className="input-flex course-code-flex">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Course Code:</Form.Label>
                <br />
                <Form.Control
                  type="text"
                  name="courseCode"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Course Name:</Form.Label>
                <br />
                <Form.Control
                  type="text"
                  name="courseName"
                  onChange={handleChange}
                />
                {courseError ? (
                  <p style={{ color: 'red' }}>
                    Course should containe only alphabets
                  </p>
                ) : null}
              </Form.Group>
            </div>
            <div className="textarea-div check">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>REQUEST TYPE (Tick below)</Form.Label>
                <Form.Check
                  inline
                  label="Update contact details"
                  name="group1"
                  type="checkbox"
                  onChange={handleUpateContact}
                />
                <Form.Check
                  inline
                  label="Request for enrolment letter"
                  name="group1"
                  type="checkbox"
                  onChange={handleEnrollmentLetter}
                />
                <Form.Check
                  inline
                  label="Request for Certificate"
                  name="group1"
                  type="checkbox"
                  onChange={handleCertificate}
                />
                <Form.Check
                  inline
                  label="Request for SOA"
                  name="group1"
                  type="checkbox"
                  onChange={handleSOA}
                />
                <Form.Check
                  inline
                  label="Request for Course progress report"
                  name="group1"
                  type="checkbox"
                  onChange={handleProgressReport}
                />
                <Form.Check
                  inline
                  label="Request for Leave"
                  name="group1"
                  type="checkbox"
                  onChange={handleLeave}
                />
                {leave ? (
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Leave Date(From):</Form.Label>
                    <br />
                    <Form.Control
                      type="date"
                      value={leaveFrom}
                      onChange={(e) => {
                        setLeaveFrom(e.target.value);
                      }}
                    />
                    <Form.Label>Leave Date(To):</Form.Label>
                    <Form.Control
                      type="date"
                      value={leaveTo}
                      onChange={(e) => {
                        setLeaveTo(e.target.value);
                      }}
                    />
                    {leaveError ? (
                      <p style={{ color: 'red' }}>
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
                      <p style={{ color: 'red' }}>
                        Other request field should not be empty
                      </p>
                    ) : null}
                  </Form.Group>
                ) : null}
              </Form.Group>
            </div>

            <Form.Group className="mb-3 date" controlId="exampleForm.ControlInput1">
              <Form.Label>Date:</Form.Label>
              <br />
              <Form.Control type="date" onChange={handleChange} name="date" />
              {dateError ? (
                <p style={{ color: 'red' }}>Select valid date</p>
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
