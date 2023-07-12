import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import JsonData from '../../FormJSON/countryName.json';
import Container from 'react-bootstrap/Container';
import SignatureCanvas from 'react-signature-canvas';
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
  typeOfIdValidationArr,
} from '../errors/errorFun';

const ApplicationToCancelEnrolment = () => {
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

  const [signatureFile, setSignatureFile] = useState('');
  const [signatureImage, setSignatureImage] = useState('');
  const [signatureError, setSignatureError] = useState(false);

  const [signNull, setSignNull] = useState(false);

  const fileTypes = ['JPG', 'PNG', 'PDF'];
  const [file, setFile] = useState(null);
  const handleFileChange = (file) => {
    const size = (file.size / (1024 * 1024)).toFixed(2);
    if (size > 2) {
      setSignatureError(true);
    } else {
      setSignatureError(false);
      setSignatureFile(file);
      previewSignatureFiles(file);
    }
    setFile(file);
  };

  const previewSignatureFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSignatureImage(reader.result);
    };
  };

  const [base64Images, setBase64Images] = useState([]);
  const [base64Images1, setBase64Images1] = useState([]);

  const handleImageUpload = (event) => {
    const files = event.target.files;

    const imagesArray = Array.from(files);
    Promise.all(
      imagesArray.map((image) => {
        return new Promise((resolve, reject) => {
          if (image.size > 2 * 1024 * 1024) {
            alert('Image Shoud be less than 2 mb');
            reject(new Error('Image size exceeds 2 MB limit.'));
            return;
          }
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve(e.target.result);
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsDataURL(image);
        });
      })
    )
      .then((results) => {
        setBase64Images((prevImages) => [...prevImages, ...results]);
      })
      .catch((error) => {
        console.log('Error converting images to base64:', error);
      });
  };

  const handleImageUpload2 = (event) => {
    const files = event.target.files;

    const imagesArray = Array.from(files);
    Promise.all(
      imagesArray.map((image) => {
        return new Promise((resolve, reject) => {
          if (image.size > 2 * 1024 * 1024) {
            alert('Image Shoud be less than 2 mb');
            reject(new Error('Image size exceeds 2 MB limit.'));
            return;
          }
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve(e.target.result);
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsDataURL(image);
        });
      })
    )
      .then((results) => {
        setBase64Images1((prevImages) => [...prevImages, ...results]);
      })
      .catch((error) => {
        console.log('Error converting images to base64:', error);
      });
  };

  const [intSignatureImage, setIntSignatureImage] = useState('');
  const [intSignatureFile, setIntSignatureFile] = useState('');

  const [file2, setFile2] = useState(null);
  const handleFileChange2 = (file) => {
    const size = (file.size / (1024 * 1024)).toFixed(2);
    if (size > 2) {
      setIntSignatureError(true);
    } else {
      setIntSignatureError(false);
      setIntSignatureFile(file);
      previewSignatureFiles2(file);
    }
    setFile2(file);
  };

  const previewSignatureFiles2 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setIntSignatureImage(reader.result);
    };
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
    // intStudent: '',
    reasonsForReleaseRequest: '',
    intPrefix: 'Mr',
    intFirstName: '',
    intMiddleName: '',
    intLastName: '',
    intDate: '',
  });

  const [changePageState, setChangePageState] = useState(false);

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

  const [intDateNull, setIntDateNull] = useState(false);

  const [explanationOfDecisionNull, setExplanationOfDecisionNull] =
    useState(false);
  const [intNameError, setIntNameError] = useState(false);
  const [intNameNull, setIntNameNull] = useState(false);
  const [intSignatureError, setIntSignatureError] = useState(false);
  const [intFileNull, setIntFileNull] = useState(false);
  const [intStudent, setIntStudent] = useState('No');

  const handleNext = async (e) => {
    e.preventDefault();
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
    // const telVer = telValidation(
    //   formData.telCode,
    //   formData.telephone,
    //   setCountryCodeNull,
    //   setTelError
    // );
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
    const imageVer = typeOfIdValidationArr(base64Images, setFileNull);
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
    const radioVer = courseCodValidation(intStudent, setRadioNull);

    if (
      courseNameVer &&
      startDateVer &&
      nameVer &&
      dbVer &&
      mobVer &&
      emailVer &&
      // altEmailVer &&
      addressVer &&
      courseCodeVer &&
      qualCodeVer &&
      qualName &&
      reasonVer &&
      detailVer &&
      radioVer &&
      imageVer
    ) {
      setChangePageState(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    const imageVer = typeOfIdValidationArr(base64Images, setFileNull);
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
    const reasonsForReleaseRequestVer = courseCodValidation(
      formData.reasonsForReleaseRequest,
      setExplanationOfDecisionNull
    );
    const IntImageVer = typeOfIdValidationArr(base64Images1, setIntFileNull);
    const IntNameVer = handleNameError(
      formData.intFirstName,
      formData.intLastName,
      setIntNameNull,
      setIntNameError
    );
    const IntDateVer = typeOfIdValidation(formData.intDate, setIntDateNull);
    const signVer = typeOfIdValidation(url, setSignNull);

    if (
      // courseNameVer &&
      // startDateVer &&
      // nameVer &&
      // dbVer &&
      // mobVer &&
      // emailVer &&
      // addressVer &&
      // courseCodeVer &&
      // qualCodeVer &&
      // qualName &&
      // reasonVer &&
      // detailVer &&
      // radioVer &&
      // imageVer &&
      reasonsForReleaseRequestVer &&
      IntImageVer &&
      IntNameVer &&
      IntDateVer &&
      signVer
    ) {
      const arr = [url];

      await axios
        .post(`${process.env.REACT_APP_BACKEND_LINK}/forms/cef`, {
          formData,
          base64Images,
          intStudent,
          base64Images1,
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

  const handleChangePageStateBack = (e) => {
    e.preventDefault();
    setChangePageState(false);
  };

  return (
    <div className="outer-div">
      <Container>
        {changePageState === false && (
          <>
            <h1 className="form-h1">APPLICATION TO CANCEL ENROLMENT</h1>
            <p className="sub-p">
              Please read the information and complete all relevant pages of
              this form, sign the declaration, and submit this form in person
              Signet Institute reception counter or via email:
              info@signet.edu.auYou must refer to your Student Agreement for the
              Signet Institute Fees and Refunds Policy to confirm if you are
              liable to pay any course fees or eligible to apply for refund.Only
              form cancellation requests will be considered.
            </p>
            <div className="form-parent">
              <Form className="cancel-enrollment-form-div">
                <p className="form-p">STUDENT DETAILS</p>
                <div className="name-div">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      Full Name<span className="mandate">*</span>
                    </Form.Label>
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
                          value={formData.prefix}
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
                          value={formData.firstName}
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
                          value={formData.middleName}
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
                          value={formData.lastName}
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
                      <Form.Label>
                        Date of Birth:<span className="mandate">*</span>
                      </Form.Label>
                      <br />
                      <Form.Control
                        type="date"
                        onChange={handleChange}
                        name="dob"
                        className="dob-input"
                        value={formData.dob}
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
                          value={formData.mobile}
                        />
                      </div>
                      {mobileContryCodeNull ? (
                        <p style={{ color: 'red' }}>
                          Please select country dail code
                        </p>
                      ) : null}
                      {mobileError ? (
                        <p style={{ color: 'red' }}>
                          Enter valid mobile number
                        </p>
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
                      <Form.Label>Alternative Email:</Form.Label>
                      <br />
                      <Form.Control
                        type="email"
                        onChange={handleChange}
                        name="altEmail"
                        value={formData.altEmail}
                      />
                      <p className="input-p">example@example.com</p>
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
                      <Form.Label>
                        Address<span className="mandate">*</span>
                      </Form.Label>
                      <br />
                      <div className="input-flex ">
                        <div>
                          <Form.Control
                            type="text"
                            onChange={handleChange}
                            name="buildingName"
                            value={formData.buildingName}
                          />
                          <p className="input-p">Building name, Unit name</p>
                        </div>
                        <div>
                          <Form.Control
                            type="text"
                            onChange={handleChange}
                            name="street"
                            value={formData.street}
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
                            value={formData.town}
                          />
                          <p className="input-p">Suburb/Town</p>
                        </div>
                        <div>
                          <Form.Control
                            type="text"
                            onChange={handleChange}
                            name="state"
                            value={formData.state}
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
                            value={formData.postCode}
                          />
                          <p className="input-p">Postcode</p>
                        </div>
                        <div>
                          <Form.Select
                            aria-label="Default select example"
                            onChange={handleChange}
                            name="country"
                            className="country-select select-country"
                            value={formData.country}
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
                        <p style={{ color: 'red' }}>
                          Enter all fields of Address
                        </p>
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
                      <Form.Label>
                        Course Code:<span className="mandate">*</span>
                      </Form.Label>
                      <br />
                      <Form.Control
                        type="text"
                        onChange={handleChange}
                        name="courseCode"
                        value={formData.courseCode}
                      />
                      {courseCodeNull ? (
                        <p style={{ color: 'red' }}>Course Code is required</p>
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
                        onChange={handleChange}
                        name="courseName"
                        value={formData.courseName}
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
                        <Form.Label>
                          Course / Qualification Code
                          <span className="mandate">*</span>
                        </Form.Label>
                        <br />
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          name="qualCode"
                          value={formData.qualCode}
                        />
                        {qualeCodeNull ? (
                          <p style={{ color: 'red' }}>
                            Course Code is required
                          </p>
                        ) : null}
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>
                          Course / Qualification Name
                          <span className="mandate">*</span>
                        </Form.Label>
                        <br />
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          name="qualName"
                          value={formData.qualName}
                        />
                        {qualeNameNull ? (
                          <p style={{ color: 'red' }}>
                            Please enter course name
                          </p>
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
                      <span className="mandate">*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      onChange={handleChange}
                      name="detail"
                      value={formData.detail}
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
                    <Form.Label>
                      Date effective from:<span className="mandate">*</span>
                    </Form.Label>
                    <br />
                    <Form.Control
                      type="date"
                      onChange={handleChange}
                      name="date"
                      value={formData.date}
                    />
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
                      <span className="mandate">*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      onChange={handleChange}
                      name="reason"
                      value={formData.reason}
                    />
                    {reasonsNull ? (
                      <p style={{ color: 'red' }}>Reason is required</p>
                    ) : null}
                  </Form.Group>
                </div>

                <div className="flex-width ">
                  <div className="textarea-div">
                    <h5>
                      Supporting Documents:<span className="mandate">*</span>
                    </h5>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>
                        Your request will only be considered if you have
                        provided evidence of the reasons for your request.
                        Please list the documents attached:
                      </Form.Label>
                      <label for="inputField" class="btn btn-info">
                        Upload File
                      </label>
                      <input
                        type="file"
                        style={{ display: 'none' }}
                        id="inputField"
                        multiple
                        onChange={handleImageUpload}
                        accept="image/png, image/jpeg, image/jpg, application/pdf"
                      />
                      <p>
                        <i className="file-sub">
                          Image should be less than 2MB
                        </i>
                      </p>
                      <div>
                        {base64Images.map((base64, index) => (
                          <>
                            <img
                              key={index}
                              src={base64}
                              alt={`Image ${index}`}
                              width={100}
                            />
                          </>
                        ))}
                      </div>
                      {signatureError ? (
                        <p style={{ color: 'red' }}>
                          Image Size should be less than 2MB
                        </p>
                      ) : null}
                      {fileNull ? (
                        <p style={{ color: 'red' }}>
                          Supporting Document is required
                        </p>
                      ) : null}
                    </Form.Group>
                  </div>
                </div>

                <div className="flex-width ">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Are you an International student?</Form.Label>
                    <Form.Check
                      inline
                      label="Yes"
                      name="intStudent"
                      className="radio-input"
                      value="Yes"
                      type="radio"
                      onChange={(e) => {
                        setIntStudent(e.target.value);
                      }}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="intStudent"
                      className="radio-input"
                      value="No"
                      type="radio"
                      onChange={(e) => {
                        setIntStudent(e.target.value);
                      }}
                    />
                  </Form.Group>
                </div>

                {intStudent === 'Yes' && (
                  <div className="flex-width btn-mar-top">
                    <button onClick={handleNext}>Next</button>
                  </div>
                )}
              </Form>
            </div>
          </>
        )}
        {changePageState && (
          <>
            <h1 className="form-h1">
              Release Request (International Student only):
            </h1>
            <p className="sub-p">
              Complete this section only if you wish to transfer to another
              registered provider and require to be released from Signet
              Institute. You must attach a Letter of offer from new training
              provider. Refer to Overseas Student Transfer Policy on Signet
              Institute Student Portal for more details.
            </p>
            <div className="form-parent">
              <Form className="cancel-enrollment-form-div">
                <p className="form-p">Reasons for Release Request:</p>
                <div className="textarea-div">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      Signet Institute has cancelled or no longer offers the
                      program Do not meet the requirements for entry into the
                      program (academic /English language)Sponsor related
                      considerations Compassionate or compelling reasons
                      (explain below)Others - please explain.
                      <span className="mandate">*</span>
                    </Form.Label>
                    <br />
                    <Form.Control
                      as="textarea"
                      onChange={handleChange}
                      name="reasonsForReleaseRequest"
                      value={formData.reasonsForReleaseRequest}
                    />
                    {explanationOfDecisionNull ? (
                      <p style={{ color: 'red' }}>
                        Reasons for Release Request is required
                      </p>
                    ) : null}
                  </Form.Group>
                </div>
                <p className="form-p">Supporting Documents:</p>
                <div className="flex-width ">
                  <div className="textarea-div">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>
                        You must provide the following documents to support your
                        release request. Please tick to indicate the documents
                        provided Letter of offer from new training provider
                        Support documents - providing information to support
                        reason provided above Personal statement explaining
                        reason for release request Others - please indicate.
                        <span className="mandate">*</span>
                      </Form.Label>
                      <label for="inputField1" class="btn btn-info">
                        Upload File
                      </label>
                      <input
                        type="file"
                        style={{ display: 'none' }}
                        id="inputField1"
                        multiple
                        onChange={handleImageUpload2}
                        accept="image/png, image/jpeg, image/jpg, application/pdf"
                      />
                      <p>
                        <i className="file-sub">
                          Image should be less than 2MB
                        </i>
                      </p>
                      <div>
                        {base64Images1.map((base64, index) => (
                          <>
                            <img
                              key={index}
                              src={base64}
                              alt={`Image ${index}`}
                              width={100}
                            />
                          </>
                        ))}
                      </div>
                      {intSignatureError ? (
                        <p style={{ color: 'red' }}>
                          Image Size should be less than 2MB
                        </p>
                      ) : null}
                      {intFileNull ? (
                        <p style={{ color: 'red' }}>
                          Supporting Documents is required
                        </p>
                      ) : null}
                    </Form.Group>
                  </div>
                </div>
                <p className="form-p">Student Declaration:</p>
                <p>I understand and agree that:</p>
                <ul>
                  <li>
                    any change to my enrolments at Signet Institute (CoEs for
                    Overseas Students) is not finalised until my complete
                    application has been received and approved by Signet
                    Institute. I will be advised in writing of the outcome of my
                    completed application within ten (10) business days.
                  </li>
                  <li>
                    it is my responsibility to ensure that Signet Institute has
                    my current contact details. Signet Institute will not be
                    responsible for delays in responding to my request if I
                    change my contact details and do not notify Signet Institute
                    of this;
                  </li>
                  <li>
                    if there are any due or outstanding fees or charges
                    (according to my student agreement), I am still liable to
                    pay those. Signet Institute may approach debt collection
                    agencies and/or credit bureaus to recover outstanding debts
                    if I fail to do so;
                  </li>
                  <li>
                    I declare that my application for cancelation of enrolment
                    and/or my request for release is for genuine reasons and
                    that I have attached the required documentation to support
                    my application. I declare that the information I have
                    provided is true and correct. Applicable to Overseas
                    Students only:
                  </li>
                  <li>
                    I understand and accept that the approval of my request for
                    enrolment cancellation and/or request for release may affect
                    my current student visa and that Signet Institute will be
                    advising the Department of Home Affairs (DHA) of changes to
                    my enrolment with Signet Institute.
                  </li>
                </ul>
                <div className="name-div">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      Student Name:<span className="mandate">*</span>
                    </Form.Label>
                    <br />
                    <div className="d-flex">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Select
                          aria-label="Default select example"
                          onChange={handleChange}
                          name="intPrefix"
                          value={formData.intPrefix}
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
                          name="intFirstName"
                          value={formData.intFirstName}
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
                          name="intMiddleName"
                          value={formData.intMiddleName}
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
                          name="intLastName"
                          value={formData.intLastName}
                        />
                        <p className="input-p">Last Name</p>
                      </Form.Group>
                    </div>
                    {intNameError ? (
                      <p style={{ color: 'red' }}>
                        First Name and Last Name should contain only alphabets
                      </p>
                    ) : null}
                    {intNameNull ? (
                      <p style={{ color: 'red' }}>
                        Please enter First Name and Last Name
                      </p>
                    ) : null}
                  </Form.Group>
                </div>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Student Signature<span className="mandate">*</span>
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
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Date<span className="mandate">*</span>
                  </Form.Label>
                  <br />
                  <Form.Control
                    type="date"
                    onChange={handleChange}
                    name="intDate"
                    value={formData.intDate}
                  />
                  {intDateNull ? (
                    <p style={{ color: 'red' }}>Date is required</p>
                  ) : null}
                </Form.Group>
                <div className="input-flex">
                  <button onClick={handleChangePageStateBack}>Back</button>
                  <button onClick={handleSubmit}>Submit</button>
                </div>
              </Form>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default ApplicationToCancelEnrolment;
