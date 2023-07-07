import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import JsonData from '../../FormJSON/countryName.json';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import {
  CredittelValidation,
  IdValidation,
  OfficialCertificateVaidation,
  addressValidation,
  altEmailValidator,
  dobValidation,
  emailValidator,
  genderValidation,
  handleAdminCheckboxSubmit,
  handleCourseNameError,
  handleError,
  handleNameError,
  handleNullError,
  mobileValidation,
  startDateValidation,
  telValidation,
  typeOfIdValidation,
} from '../errors/errorFun';
import { FileUploader } from 'react-drag-drop-files';

const ApplicationForCreditTransfer = () => {
  const [changePageState, setChangePageState] = useState(true);
  const [changePageState1, setChangePageState1] = useState(false);
  const [changePageState2, setChangePageState2] = useState(false);
  const [declaration1, setDeclaration1] = useState(false);
  const [declaration2, setDeclaration2] = useState(false);
  const [declaration3, setDeclaration3] = useState(false);

  const [checkError, setCheckError] = useState(false);

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
    courseCodeTitle: '',
    statementOfAttenment: '',
    headOfCompliance: '',
    explanationOfDecision: '',
    courseSectionDate: '',
    repFirstName: '',
    repLastName: '',
    unitsDate: '',
    initials: '',
    initialsDate: '',
    adminFirstName: '',
    adminLastName: '',
    adminDate: '',
    managerFirstName: '',
    managerLastName: '',
    managerDate: '',
  });

  const [officialCertificate, setOfficialCertificate] = useState('');
  const [officialTranscript, setOfficialTranscript] = useState('');

  const [signatureFile, setSignatureFile] = useState('');
  const [signatureImage, setSignatureImage] = useState('');
  const [signatureError, setSignatureError] = useState(false);
  const [fileNull, setFileNull] = useState(false);

  const [signatureFile2, setSignatureFile2] = useState('');
  const [signatureImage2, setSignatureImage2] = useState('');
  const [signatureError2, setSignatureError2] = useState(false);
  const [fileNull2, setFileNull2] = useState(false);

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

  const [file2, setFile2] = useState(null);
  const handleFileChange2 = (file) => {
    const size = (file.size / (1024 * 1024)).toFixed(2);
    if (size > 2) {
      setSignatureError2(true);
    } else {
      setSignatureError2(false);
      setSignatureFile2(file);
      previewSignatureFiles2(file);
    }
    setFile2(file);
  };

  const previewSignatureFiles2 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSignatureImage2(reader.result);
    };
  };

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
  const [radioNull, setRadioNull] = useState(false);

  const [qualificationNull, setQualificationNull] = useState(false);
  const [officialCertificateNull, setOfficialCertificateNull] = useState(false);
  const [officialTranscriptNull, setOfficialTranscriptNull] = useState(false);
  const [headOfComplianceNull, setHeadOfComplianceNull] = useState(false);
  const [explanationOfDecisionNull, setExplanationOfDecisionNull] =
    useState(false);
  const [courseSectionDateNull, setCourseSectionDateNull] = useState(false);
  const [representativeNull, setRepresentativeNull] = useState(false);
  const [adminRecordsNull, setAdminRecordsNull] = useState(false);
  const [initialsNull, setInitialsNull] = useState(false);
  const [initialsDateNull, setInitialsDateNull] = useState(false);
  const [adminNameNull, setAdminNameNull] = useState(false);
  const [repNameError, setRepNameError] = useState(false);
  const [inputArr, setInputArr] = useState({
    unitCode1: '',
    unitTitle1: '',
    unitCode2: '',
    unitTitle2: '',
    unitCode3: '',
    unitTitle3: '',
    unitCode4: '',
    unitTitle4: '',
    unitCode5: '',
    unitTitle5: '',
    unitCode6: '',
    unitTitle6: '',
    unitCode7: '',
    unitTitle7: '',
    unitCode8: '',
    unitTitle8: '',
  });

  const handleNext = async (e) => {
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
      setChangePageState(false);
      setChangePageState1(true);
      setChangePageState2(false);
    }
  };

  const handleNext2 = (e) => {
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
    const courseCodeTitleVer = typeOfIdValidation(
      formData.courseCodeTitle,
      setRadioNull
    );
    const qualificationVer = typeOfIdValidation(
      formData.statementOfAttenment,
      setQualificationNull
    );
    const certificateVer = OfficialCertificateVaidation(
      officialCertificate,
      signatureImage,
      setOfficialCertificateNull
    );
    const transcriptVer = OfficialCertificateVaidation(
      officialTranscript,
      signatureImage2,
      setOfficialTranscriptNull
    );
    const headOfComplianceVer = typeOfIdValidation(
      formData.headOfCompliance,
      setHeadOfComplianceNull
    );
    const explanationOfDecisionVer = typeOfIdValidation(
      formData.explanationOfDecision,
      setExplanationOfDecisionNull
    );
    const courseSectionDateVer = typeOfIdValidation(
      formData.courseSectionDate,
      setCourseSectionDateNull
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
      addressVer &&
      courseCodeTitleVer &&
      qualificationVer &&
      certificateVer &&
      transcriptVer &&
      headOfComplianceVer &&
      explanationOfDecisionVer &&
      courseSectionDateVer
    ) {
      setChangePageState(false);
      setChangePageState1(false);
      setChangePageState2(true);
    }
  };

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
    const courseCodeTitleVer = typeOfIdValidation(
      formData.courseCodeTitle,
      setRadioNull
    );
    const qualificationVer = typeOfIdValidation(
      formData.statementOfAttenment,
      setQualificationNull
    );
    const certificateVer = OfficialCertificateVaidation(
      officialCertificate,
      signatureImage,
      setOfficialCertificateNull
    );
    const transcriptVer = OfficialCertificateVaidation(
      officialTranscript,
      signatureImage2,
      setOfficialTranscriptNull
    );
    const headOfComplianceVer = typeOfIdValidation(
      formData.headOfCompliance,
      setHeadOfComplianceNull
    );
    const explanationOfDecisionVer = typeOfIdValidation(
      formData.explanationOfDecision,
      setExplanationOfDecisionNull
    );
    const courseSectionDateVer = typeOfIdValidation(
      formData.courseSectionDate,
      setCourseSectionDateNull
    );
    const representativeVer = handleNameError(
      formData.repFirstName,
      formData.repLastName,
      setRepresentativeNull,
      setRepNameError
    );
    const adminCheckVer = handleAdminCheckboxSubmit(
      declaration1,
      declaration2,
      declaration3,
      setAdminRecordsNull
    );
    const initialsVer = typeOfIdValidation(formData.initials, setInitialsNull);
    const initialsDateVer = typeOfIdValidation(
      formData.initialsDate,
      setInitialsDateNull
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
      addressVer &&
      courseCodeTitleVer &&
      qualificationVer &&
      certificateVer &&
      transcriptVer &&
      headOfComplianceVer &&
      explanationOfDecisionVer &&
      courseSectionDateVer &&
      representativeVer &&
      adminCheckVer &&
      initialsVer &&
      initialsDateVer
    ) {
      await axios
        .post('http://localhost:8000/forms/ctf', {
          formData,
          declaration1,
          declaration2,
          declaration3,
          inputArr,
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

  const handleInputAddChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputArr({
      ...inputArr,
      [name]: value,
    });
  };

  return (
    <div className="outer-div">
      <Container>
        <h1 className="form-h1">APPLICATION FOR CREDIT TRANSFER</h1>
        <div className="form-parent creditTransfer">
          <Form>
            {changePageState && (
              <>
                <p className="form-p">SECTION 1 - STUDENT DETAILS</p>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Full Name<span className="mandate">*</span>
                  </Form.Label>
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
                    <Form.Label>
                      Date of Birth:<span className="mandate">*</span>
                    </Form.Label>
                    <br />
                    <Form.Control
                      type="date"
                      onChange={handleChange}
                      name="dob"
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
                      Gender:<span className="mandate">*</span>
                    </Form.Label>
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
                    <div className="mobile-flex-div-child">
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
                    </div>
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
                    <Form.Label>
                      Type of ID:<span className="mandate">*</span>
                    </Form.Label>
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
                    <Form.Label>
                      ID Number:<span className="mandate">*</span>
                    </Form.Label>
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
                        <p className="input-p">Postcode</p>
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
                <button onClick={handleNext}>Next</button>
              </>
            )}
            {changePageState1 && (
              <>
                <p className="form-p">SECTION 2 - COURSE</p>
                <h5 className="h5">
                  Please select the Course you want to receive a Credit Transfer
                  for?
                </h5>
                <div className="flex-width ">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      COURSE CODE AND TITLE
                      <span className="mandate">*</span>
                    </Form.Label>
                    <Form.Check
                      inline
                      label="AUR30620 Certificate III in Light Vehicle Mechanical Technology"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="AUR30620 Certificate III in Light Vehicle Mechanical Technology"
                      type="radio"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="AUR31520 Certificate III in Automotive Diesel Engine Technology"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="AUR31520 Certificate III in Automotive Diesel Engine Technology"
                      type="radio"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="AUR40216 Certificate IV in AutomotiveMechanical Diagnosis"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="AUR40216 Certificate IV in AutomotiveMechanical Diagnosis"
                      type="radio"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="BSB50420 Diploma of Leadership and Management"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="BSB50420 Diploma of Leadership and Management"
                      type="radio"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="BSB60420 Advanced Diploma of Leadership and Management"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="BSB60420 Advanced Diploma of Leadership and Management"
                      type="radio"
                      onChange={handleChange}
                    />

                    <Form.Check
                      inline
                      label="BSB80120 Graduate Diploma of Management (Learning)"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="BSB80120 Graduate Diploma of Management (Learning)"
                      type="radio"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="CHC33015 Certificate III in Individual Support"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="CHC33015 Certificate III in Individual Support"
                      type="radio"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="CHC43015 Certificate IV in Ageing Support"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="CHC43015 Certificate IV in Ageing Support"
                      type="radio"
                      onChange={handleChange}
                    />

                    <Form.Check
                      inline
                      label="CHC43115 Certificate IV in Disability"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="CHC43115 Certificate IV in Disability"
                      type="radio"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="CHC52015 Diploma of Community Services"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="CHC52015 Diploma of Community Services"
                      type="radio"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="CHC53315 Diploma of Mental Health"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="CHC53315 Diploma of Mental Health"
                      type="radio"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="CPC31320 Certificate III in Wall and Floor Tiling"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="CPC31320 Certificate III in Wall and Floor Tiling"
                      type="radio"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="CPC33020 Certificate III in Bricklaying and Blocklaying"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="CPC33020 Certificate III in Bricklaying and Blocklaying"
                      type="radio"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="CPC50220 Diploma of Building and Construction (Building)"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="CPC50220 Diploma of Building and Construction (Building)"
                      type="radio"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="RII60520 Advanced Diploma of Civil Construction Design"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="RII60520 Advanced Diploma of Civil Construction Design"
                      type="radio"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="HLT37215 Certificate III in Pathology Collection"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="HLT37215 Certificate III in Pathology Collection"
                      type="radio"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="HLT45021 Certificate IV in Dental Assisting"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="HLT45021 Certificate IV in Dental Assisting"
                      type="radio"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="HLT51020 Diploma of Emergency Health Care"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="HLT51020 Diploma of Emergency Health Care"
                      type="radio"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="HLT54115 Diploma of Nursing (Superseded)"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="HLT54115 Diploma of Nursing (Superseded)"
                      type="radio"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="HLT55118 Diploma of Dental Technology"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="HLT55118 Diploma of Dental Technology"
                      type="radio"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="English for Academic Purposes 1"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="English for Academic Purposes 1"
                      type="radio"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="English for Academic Purposes 2"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="English for Academic Purposes 2"
                      type="radio"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="English for Academic Purposes 3"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="English for Academic Purposes 3"
                      type="radio"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="General English (Elementary to Advanced)"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="General English (Elementary to Advanced)"
                      type="radio"
                      onChange={handleChange}
                    />
                    {radioNull ? (
                      <p style={{ color: 'red' }}>This filed is Required</p>
                    ) : null}
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      Name of the College that has issued your Qualification or
                      Statement of Attainment<span className="mandate">*</span>
                    </Form.Label>
                    <br />
                    <Form.Control
                      type="text"
                      onChange={handleChange}
                      name="statementOfAttenment"
                    />
                    {qualificationNull ? (
                      <p style={{ color: 'red' }}>
                        Qualification/Statement of Attainment is required
                      </p>
                    ) : null}
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      Official Certificate Attached:
                      <span className="mandate">*</span>
                    </Form.Label>
                    <Form.Check
                      inline
                      label="Yes"
                      name="officialCertificate"
                      className="radio-input"
                      value="Yes"
                      type="radio"
                      onChange={(e) => {
                        setOfficialCertificate(e.target.value);
                      }}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="officialCertificate"
                      className="radio-input"
                      value="No"
                      type="radio"
                      onChange={(e) => {
                        setOfficialCertificate(e.target.value);
                      }}
                    />

                    {officialCertificate === 'Yes' ? (
                      <div className="flex-width ">
                        <div className="textarea-div">
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>
                              Certificate Upload
                              <span className="mandate">*</span>
                            </Form.Label>
                            <FileUploader
                              handleChange={handleFileChange}
                              name="file"
                              types={fileTypes}
                              accept="image/png, image/jpeg, image/jpg, application/pdf"
                            />
                            <p>
                              <i>Image should be less than 2MB</i>
                            </p>
                            {signatureError ? (
                              <p style={{ color: 'red' }}>
                                Image Size should be less than 2MB
                              </p>
                            ) : null}
                            {fileNull ? (
                              <p style={{ color: 'red' }}>
                                Official Certificate is required
                              </p>
                            ) : null}
                          </Form.Group>
                        </div>
                      </div>
                    ) : null}
                    {officialCertificateNull ? (
                      <p style={{ color: 'red' }}>This field is Required</p>
                    ) : null}
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      Official Transcript Attached:
                      <span className="mandate">*</span>
                    </Form.Label>
                    <Form.Check
                      inline
                      label="Yes"
                      name="officialTranscript"
                      className="radio-input"
                      value="Yes"
                      type="radio"
                      onChange={(e) => {
                        setOfficialTranscript(e.target.value);
                      }}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="officialTranscript"
                      className="radio-input"
                      value="No"
                      type="radio"
                      onChange={(e) => {
                        setOfficialTranscript(e.target.value);
                      }}
                    />

                    {officialTranscript === 'Yes' ? (
                      <div className="flex-width ">
                        <div className="textarea-div">
                          <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                          >
                            <Form.Label>
                              Transcript Upload
                              <span className="mandate">*</span>
                            </Form.Label>
                            <FileUploader
                              handleChange={handleFileChange2}
                              name="file2"
                              types={fileTypes}
                              accept="image/png, image/jpeg, image/jpg, application/pdf"
                            />
                            <p>
                              <i>Image should be less than 2MB</i>
                            </p>
                            {signatureError2 ? (
                              <p style={{ color: 'red' }}>
                                Image Size should be less than 2MB
                              </p>
                            ) : null}
                            {fileNull2 ? (
                              <p style={{ color: 'red' }}>
                                Transcript is required
                              </p>
                            ) : null}
                          </Form.Group>
                        </div>
                      </div>
                    ) : null}
                    {officialTranscriptNull ? (
                      <p style={{ color: 'red' }}>This field is Required</p>
                    ) : null}
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      Head of Compliance/Academic Manager Determination:
                      <span className="mandate">*</span>
                    </Form.Label>
                    <Form.Check
                      inline
                      label="Credit Transfer Approved"
                      name="headOfCompliance"
                      className="radio-input"
                      value="Credit Transfer Approved"
                      type="radio"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="Credit Transfer Not Approved"
                      name="headOfCompliance"
                      className="radio-input"
                      value="Credit Transfer Not Approved"
                      type="radio"
                      onChange={handleChange}
                    />
                    {headOfComplianceNull ? (
                      <p style={{ color: 'red' }}>This field is Required</p>
                    ) : null}
                  </Form.Group>
                  <div className="textarea-div">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>
                        If NOT Approved, explanation for decision:
                        <span className="mandate">*</span>
                      </Form.Label>
                      <br />
                      <Form.Control
                        as="textarea"
                        onChange={handleChange}
                        name="explanationOfDecision"
                      />
                      {explanationOfDecisionNull ? (
                        <p style={{ color: 'red' }}>
                          Explanation Of Decision is required
                        </p>
                      ) : null}
                    </Form.Group>
                  </div>
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
                      name="courseSectionDate"
                    />
                    {courseSectionDateNull ? (
                      <p style={{ color: 'red' }}>Date is required</p>
                    ) : null}
                  </Form.Group>
                  <button onClick={handleNext2}>Next</button>
                </div>
              </>
            )}
            {changePageState2 && (
              <>
                <p className="form-p">SECTION 3 - UNITS</p>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Credit Transfer to be applied</Form.Label>
                  <br />
                  <p>
                    Please complete the table below with the required
                    information on the units of competency that you which to
                    apply for credit transfer:
                  </p>
                  <div className="input-flex"></div>
                  <div className="input-flex">
                    <div>
                      <Form.Label>Unit Code</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={handleInputAddChange}
                        name="unitCode1"
                      />
                    </div>
                    <div>
                      <Form.Label>Unit Title</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={handleInputAddChange}
                        name="unitTitle1"
                      />
                    </div>
                  </div>
                  <div className="input-flex">
                    <Form.Control
                      type="text"
                      onChange={handleInputAddChange}
                      name="unitCode2"
                    />
                    <Form.Control
                      type="text"
                      onChange={handleInputAddChange}
                      name="unitTitle2"
                    />
                  </div>
                  <div className="input-flex">
                    <Form.Control
                      type="text"
                      onChange={handleInputAddChange}
                      name="unitCode3"
                    />
                    <Form.Control
                      type="text"
                      onChange={handleInputAddChange}
                      name="unitTitle3"
                    />
                  </div>
                  <div className="input-flex">
                    <Form.Control
                      type="text"
                      onChange={handleInputAddChange}
                      name="unitCode4"
                    />
                    <Form.Control
                      type="text"
                      onChange={handleInputAddChange}
                      name="unitTitle4"
                    />
                  </div>
                  <div className="input-flex">
                    <Form.Control
                      type="text"
                      onChange={handleInputAddChange}
                      name="unitCode5"
                    />
                    <Form.Control
                      type="text"
                      onChange={handleInputAddChange}
                      name="unitTitle5"
                    />
                  </div>
                  <div className="input-flex">
                    <Form.Control
                      type="text"
                      onChange={handleInputAddChange}
                      name="unitCode6"
                    />
                    <Form.Control
                      type="text"
                      onChange={handleInputAddChange}
                      name="unitTitle6"
                    />
                  </div>
                  <div className="input-flex">
                    <Form.Control
                      type="text"
                      onChange={handleInputAddChange}
                      name="unitCode7"
                    />
                    <Form.Control
                      type="text"
                      onChange={handleInputAddChange}
                      name="unitTitle7"
                    />
                  </div>
                  <div className="input-flex">
                    <Form.Control
                      type="text"
                      onChange={handleInputAddChange}
                      name="unitCode8"
                    />
                    <Form.Control
                      type="text"
                      onChange={handleInputAddChange}
                      name="unitTitle8"
                    />
                  </div>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    SIGNET INSTITUTE REPRESENTATIVE:
                    <span className="mandate">*</span>
                  </Form.Label>
                  <div className="input-flex">
                    <div>
                      <Form.Control
                        type="text"
                        onChange={handleChange}
                        name="repFirstName"
                      />
                      <p className="input-p">First Name</p>
                    </div>
                    <div>
                      <Form.Control
                        type="text"
                        onChange={handleChange}
                        name="repLastName"
                      />
                      <p className="input-p">Last Name</p>
                    </div>
                  </div>
                  {representativeNull ? (
                    <p style={{ color: 'red' }}>This field is required</p>
                  ) : null}
                  {repNameError ? (
                    <p style={{ color: 'red' }}>
                      First Name and Last Name should contain only alphabets
                    </p>
                  ) : null}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={handleChange}
                    name="unitsDate"
                  />
                  <p className="input-p">Date</p>
                </Form.Group>
                <p className="form-p">SECTION 4 – APPLICATION PROCESSING</p>
                <div className="textarea-div check">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      Administrative Records<span className="mandate">*</span>
                    </Form.Label>
                    <Form.Check
                      inline
                      label="Student Advised in writing"
                      onChange={handleDecalaration1}
                      name="Student Advised in writing"
                      type="checkbox"
                    />
                    <Form.Check
                      inline
                      label="CT recorded in SMS"
                      onChange={handleDecalaration2}
                      name="CT recorded in SMS"
                      type="checkbox"
                    />
                    <Form.Check
                      inline
                      label="Application Closed"
                      onChange={handleDecalaration3}
                      name="Application Closed"
                      type="checkbox"
                    />
                    {adminRecordsNull ? (
                      <p style={{ color: 'red' }}>This field is required</p>
                    ) : null}
                  </Form.Group>
                </div>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Initials:<span className="mandate">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    name="initials"
                  />
                  {initialsNull ? (
                    <p style={{ color: 'red' }}>Initials is required</p>
                  ) : null}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Date:<span className="mandate">*</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    onChange={handleChange}
                    name="initialsDate"
                  />
                  <p className="input-p">Date</p>
                  {initialsDateNull ? (
                    <p style={{ color: 'red' }}>Date is required</p>
                  ) : null}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>ADMINISTRATIVE OFFICER</Form.Label>
                  <div className="input-flex">
                    <div>
                      <Form.Control
                        type="text"
                        onChange={handleChange}
                        name="adminFirstName"
                      />
                      <p className="input-p">First Name</p>
                    </div>
                    <div>
                      <Form.Control
                        type="text"
                        onChange={handleChange}
                        name="adminLastName"
                      />
                      <p className="input-p">Last Name</p>
                    </div>
                  </div>
                  {adminNameNull ? (
                    <p style={{ color: 'red' }}>This field is required</p>
                  ) : null}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Date:</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={handleChange}
                    name="adminDate"
                  />
                  <p className="input-p">Date</p>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>CAMPUS MANAGER</Form.Label>
                  <div className="input-flex">
                    <div>
                      <Form.Control
                        type="text"
                        onChange={handleChange}
                        name="managerFirstName"
                      />
                      <p className="input-p">First Name</p>
                    </div>
                    <div>
                      <Form.Control
                        type="text"
                        onChange={handleChange}
                        name="managerLastName"
                      />
                      <p className="input-p">Last Name</p>
                    </div>
                  </div>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Date:</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={handleChange}
                    name="managerDate"
                  />
                  <p className="input-p">Date</p>
                </Form.Group>
                <button onClick={handleSubmit}>Submit</button>
              </>
            )}
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default ApplicationForCreditTransfer;
