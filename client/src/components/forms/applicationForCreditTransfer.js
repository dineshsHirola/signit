import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import JsonData from '../../FormJSON/countryName.json';
import Container from 'react-bootstrap/Container';
import SignatureCanvas from 'react-signature-canvas';
import axios from 'axios';
import {
  CredittelValidation,
  IdValidation,
  OfficialCertificateVaidation,
  OfficialCertificateVaidationArr,
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
  const [sign, setSign] = useState();
  const [url, setUrl] = useState();

  const [sign1, setSign1] = useState();
  const [url1, setUrl1] = useState();

  const [sign2, setSign2] = useState();
  const [url2, setUrl2] = useState();

  const handleClear = (e) => {
    e.preventDefault();
    sign.clear();
    setUrl('');
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    setUrl(sign.getTrimmedCanvas().toDataURL('image/png'));
  };

  const handleClear1 = (e) => {
    e.preventDefault();
    sign1.clear();
    setUrl1('');
  };

  const handleGenerate1 = (e) => {
    e.preventDefault();
    setUrl1(sign1.getTrimmedCanvas().toDataURL('image/png'));
  };
  const handleClear2 = (e) => {
    e.preventDefault();
    sign2.clear();
    setUrl2('');
  };

  const handleGenerate2 = (e) => {
    e.preventDefault();
    setUrl2(sign2.getTrimmedCanvas().toDataURL('image/png'));
  };

  const [changePageState, setChangePageState] = useState(true);
  const [changePageState1, setChangePageState1] = useState(false);
  const [changePageState2, setChangePageState2] = useState(false);
  const [declaration1, setDeclaration1] = useState(false);
  const [declaration2, setDeclaration2] = useState(false);
  const [declaration3, setDeclaration3] = useState(false);

  const [checkError, setCheckError] = useState(false);

  const [base64Images, setBase64Images] = useState([]);
  const [base64Images1, setBase64Images1] = useState([]);

  const deleteFile = (e) => {
    const s = base64Images.filter((item, index) => index !== e);
    setBase64Images(s);
  };

  const deleteFile1 = (e) => {
    const s = base64Images1.filter((item, index) => index !== e);
    setBase64Images1(s);
  };

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

  const [signNull, setSignNull] = useState(false);
  const [signNull1, setSignNull1] = useState(false);
  const [signNull2, setSignNull2] = useState(false);

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
      // telVer &&
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
    const certificateVer = OfficialCertificateVaidationArr(
      officialCertificate,
      base64Images,
      setOfficialCertificateNull
    );
    const transcriptVer = OfficialCertificateVaidationArr(
      officialTranscript,
      base64Images1,
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
    const signVer = typeOfIdValidation(url, setSignNull);

    if (
      nameVer &&
      dbVer &&
      genderVer &&
      // telVer &&
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
      signVer
    ) {
      setChangePageState(false);
      setChangePageState1(false);
      setChangePageState2(true);
    }
  };

  const handleback2 = (e) => {
    e.preventDefault();
    setChangePageState(true);
    setChangePageState1(false);
    setChangePageState2(false);
  };

  const handleBack3 = (e) => {
    e.preventDefault();
    setChangePageState(false);
    setChangePageState1(true);
    setChangePageState2(false);
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
    const certificateVer = OfficialCertificateVaidationArr(
      officialCertificate,
      base64Images,
      setOfficialCertificateNull
    );
    const transcriptVer = OfficialCertificateVaidationArr(
      officialTranscript,
      base64Images1,
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

    console.log(
      nameVer,
      dbVer,
      genderVer,
      telVer,
      mobVer,
      emailVer,
      altEmailVer,
      typeOfIdVer,
      idVer,
      addressVer,
      courseCodeTitleVer,
      qualificationVer,
      certificateVer,
      transcriptVer,
      headOfComplianceVer,
      explanationOfDecisionVer,
      courseSectionDateVer,
      representativeVer,
      adminCheckVer,
      initialsVer,
      initialsDateVer
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
      const arr = [url];
      const arr1 = [url1];
      const arr2 = [url2];
      // if (!url1 && !url2) {
      //   arr.push(url);
      // } else if (url1 && !url2) {
      //   arr.push(url, url1);
      // } else if (!url1 && url2) {
      //   arr.push(url, url2);
      // } else {
      //   arr.push(url, url1, url2);
      // }

      await axios
        .post(`${process.env.REACT_APP_BACKEND_LINK}/forms/ctf`, {
          formData,
          declaration1,
          declaration2,
          declaration3,
          inputArr,
          officialCertificate,
          officialTranscript,
          base64Images,
          base64Images1,
          arr,
          arr1,
          arr2,
        })
        .then((res) => {
          if (res.data.Status === 'Success') {
            alert('Data Submitted Successfully');
          } else {
            alert('Failed To Submit Data');
          }
        })
        .catch((e) => {
          console.log('Axios error', e);
        });
    } else {
      alert('Not filled');
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
                    <p style={{ color: 'red', fontStyle: 'italic' }}>
                      First Name and Last Name should contain only alphabets
                    </p>
                  ) : null}
                  {nameNull ? (
                    <p style={{ color: 'red', fontStyle: 'italic' }}>
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
                      value={formData.dob}
                    />
                    {dobError ? (
                      <p style={{ color: 'red', fontStyle: 'italic' }}>
                        Select valid DOB
                      </p>
                    ) : null}
                    {dobNull ? (
                      <p style={{ color: 'red', fontStyle: 'italic' }}>
                        Please select DOB
                      </p>
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
                      value={formData.gender}
                    >
                      <option selected hidden>
                        Please Select
                      </option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="PNTS">Prefer not to say</option>
                    </Form.Select>
                    {genderNull ? (
                      <p style={{ color: 'red', fontStyle: 'italic' }}>
                        Please select your gender
                      </p>
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
                        value={formData.telCode}
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
                        name="telephone"
                        minLength={10}
                        value={formData.telephone}
                      />
                      {contryCodeNull ? (
                        <p style={{ color: 'red', fontStyle: 'italic' }}>
                          Please select country dail code
                        </p>
                      ) : null}
                      {TelError ? (
                        <p style={{ color: 'red', fontStyle: 'italic' }}>
                          Enter valid tel number
                        </p>
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
                      <p style={{ color: 'red', fontStyle: 'italic' }}>
                        Enter valid alt email
                      </p>
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
                      value={formData.typeOfId}
                    />
                    {typeIdNull ? (
                      <p style={{ color: 'red', fontStyle: 'italic' }}>
                        Enter type of ID
                      </p>
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
                      value={formData.idNumber}
                    />
                    {idError ? (
                      <p style={{ color: 'red', fontStyle: 'italic' }}>
                        Enter valid ID number
                      </p>
                    ) : null}
                    {idNull ? (
                      <p style={{ color: 'red', fontStyle: 'italic' }}>
                        Enter your ID number
                      </p>
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
                    <div className="input-flex ">
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
                    <div className="input-flex ">
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
                          value={formData.country}
                        >
                          <option selected hidden>
                            Please Select
                          </option>
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
                      <p style={{ color: 'red', fontStyle: 'italic' }}>
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
                      checked={
                        formData.courseCodeTitle ===
                        'AUR30620 Certificate III in Light Vehicle Mechanical Technology'
                          ? true
                          : false
                      }
                    />
                    <Form.Check
                      inline
                      label="AUR31520 Certificate III in Automotive Diesel Engine Technology"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="AUR31520 Certificate III in Automotive Diesel Engine Technology"
                      type="radio"
                      onChange={handleChange}
                      checked={
                        formData.courseCodeTitle ===
                        'AUR31520 Certificate III in Automotive Diesel Engine Technology'
                          ? true
                          : false
                      }
                    />
                    <Form.Check
                      inline
                      label="AUR40216 Certificate IV in AutomotiveMechanical Diagnosis"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="AUR40216 Certificate IV in AutomotiveMechanical Diagnosis"
                      type="radio"
                      onChange={handleChange}
                      checked={
                        formData.courseCodeTitle ===
                        'AUR40216 Certificate IV in AutomotiveMechanical Diagnosis'
                          ? true
                          : false
                      }
                    />
                    <Form.Check
                      inline
                      label="BSB50420 Diploma of Leadership and Management"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="BSB50420 Diploma of Leadership and Management"
                      type="radio"
                      onChange={handleChange}
                      checked={
                        formData.courseCodeTitle ===
                        'BSB50420 Diploma of Leadership and Management'
                          ? true
                          : false
                      }
                    />
                    <Form.Check
                      inline
                      label="BSB60420 Advanced Diploma of Leadership and Management"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="BSB60420 Advanced Diploma of Leadership and Management"
                      type="radio"
                      onChange={handleChange}
                      checked={
                        formData.courseCodeTitle ===
                        'BSB60420 Advanced Diploma of Leadership and Management'
                          ? true
                          : false
                      }
                    />

                    <Form.Check
                      inline
                      label="BSB80120 Graduate Diploma of Management (Learning)"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="BSB80120 Graduate Diploma of Management (Learning)"
                      type="radio"
                      onChange={handleChange}
                      checked={
                        formData.courseCodeTitle ===
                        'BSB80120 Graduate Diploma of Management (Learning)'
                          ? true
                          : false
                      }
                    />
                    <Form.Check
                      inline
                      label="CHC33015 Certificate III in Individual Support"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="CHC33015 Certificate III in Individual Support"
                      type="radio"
                      onChange={handleChange}
                      checked={
                        formData.courseCodeTitle ===
                        'CHC33015 Certificate III in Individual Support'
                          ? true
                          : false
                      }
                    />
                    <Form.Check
                      inline
                      label="CHC43015 Certificate IV in Ageing Support"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="CHC43015 Certificate IV in Ageing Support"
                      type="radio"
                      onChange={handleChange}
                      checked={
                        formData.courseCodeTitle ===
                        'CHC43015 Certificate IV in Ageing Support'
                          ? true
                          : false
                      }
                    />

                    <Form.Check
                      inline
                      label="CHC43115 Certificate IV in Disability"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="CHC43115 Certificate IV in Disability"
                      type="radio"
                      onChange={handleChange}
                      checked={
                        formData.courseCodeTitle ===
                        'CHC43115 Certificate IV in Disability'
                          ? true
                          : false
                      }
                    />
                    <Form.Check
                      inline
                      label="CHC52015 Diploma of Community Services"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="CHC52015 Diploma of Community Services"
                      type="radio"
                      onChange={handleChange}
                      checked={
                        formData.courseCodeTitle ===
                        'CHC52015 Diploma of Community Services'
                          ? true
                          : false
                      }
                    />
                    <Form.Check
                      inline
                      label="CHC53315 Diploma of Mental Health"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="CHC53315 Diploma of Mental Health"
                      type="radio"
                      onChange={handleChange}
                      checked={
                        formData.courseCodeTitle ===
                        'CHC53315 Diploma of Mental Health'
                          ? true
                          : false
                      }
                    />
                    <Form.Check
                      inline
                      label="CPC31320 Certificate III in Wall and Floor Tiling"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="CPC31320 Certificate III in Wall and Floor Tiling"
                      type="radio"
                      onChange={handleChange}
                      checked={
                        formData.courseCodeTitle ===
                        'CPC31320 Certificate III in Wall and Floor Tiling'
                          ? true
                          : false
                      }
                    />
                    <Form.Check
                      inline
                      label="CPC33020 Certificate III in Bricklaying and Blocklaying"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="CPC33020 Certificate III in Bricklaying and Blocklaying"
                      type="radio"
                      onChange={handleChange}
                      checked={
                        formData.courseCodeTitle ===
                        'CPC33020 Certificate III in Bricklaying and Blocklaying'
                          ? true
                          : false
                      }
                    />
                    <Form.Check
                      inline
                      label="CPC50220 Diploma of Building and Construction (Building)"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="CPC50220 Diploma of Building and Construction (Building)"
                      type="radio"
                      onChange={handleChange}
                      checked={
                        formData.courseCodeTitle ===
                        'CPC50220 Diploma of Building and Construction (Building)'
                          ? true
                          : false
                      }
                    />
                    <Form.Check
                      inline
                      label="RII60520 Advanced Diploma of Civil Construction Design"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="RII60520 Advanced Diploma of Civil Construction Design"
                      type="radio"
                      onChange={handleChange}
                      checked={
                        formData.courseCodeTitle ===
                        'RII60520 Advanced Diploma of Civil Construction Design'
                          ? true
                          : false
                      }
                    />
                    <Form.Check
                      inline
                      label="HLT37215 Certificate III in Pathology Collection"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="HLT37215 Certificate III in Pathology Collection"
                      type="radio"
                      onChange={handleChange}
                      checked={
                        formData.courseCodeTitle ===
                        'HLT37215 Certificate III in Pathology Collection'
                          ? true
                          : false
                      }
                    />
                    <Form.Check
                      inline
                      label="HLT45021 Certificate IV in Dental Assisting"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="HLT45021 Certificate IV in Dental Assisting"
                      type="radio"
                      onChange={handleChange}
                      checked={
                        formData.courseCodeTitle ===
                        'HLT45021 Certificate IV in Dental Assisting'
                          ? true
                          : false
                      }
                    />
                    <Form.Check
                      inline
                      label="HLT51020 Diploma of Emergency Health Care"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="HLT51020 Diploma of Emergency Health Care"
                      type="radio"
                      onChange={handleChange}
                      checked={
                        formData.courseCodeTitle ===
                        'HLT51020 Diploma of Emergency Health Care'
                          ? true
                          : false
                      }
                    />
                    <Form.Check
                      inline
                      label="HLT54115 Diploma of Nursing (Superseded)"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="HLT54115 Diploma of Nursing (Superseded)"
                      type="radio"
                      onChange={handleChange}
                      checked={
                        formData.courseCodeTitle ===
                        'HLT54115 Diploma of Nursing (Superseded)'
                          ? true
                          : false
                      }
                    />
                    <Form.Check
                      inline
                      label="HLT55118 Diploma of Dental Technology"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="HLT55118 Diploma of Dental Technology"
                      type="radio"
                      onChange={handleChange}
                      checked={
                        formData.courseCodeTitle ===
                        'HLT55118 Diploma of Dental Technology'
                          ? true
                          : false
                      }
                    />
                    <Form.Check
                      inline
                      label="English for Academic Purposes 1"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="English for Academic Purposes 1"
                      type="radio"
                      onChange={handleChange}
                      checked={
                        formData.courseCodeTitle ===
                        'English for Academic Purposes 1'
                          ? true
                          : false
                      }
                    />
                    <Form.Check
                      inline
                      label="English for Academic Purposes 2"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="English for Academic Purposes 2"
                      type="radio"
                      onChange={handleChange}
                      checked={
                        formData.courseCodeTitle ===
                        'English for Academic Purposes 2'
                          ? true
                          : false
                      }
                    />
                    <Form.Check
                      inline
                      label="English for Academic Purposes 3"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="English for Academic Purposes 3"
                      type="radio"
                      onChange={handleChange}
                      checked={
                        formData.courseCodeTitle ===
                        'English for Academic Purposes 3'
                          ? true
                          : false
                      }
                    />
                    <Form.Check
                      inline
                      label="General English (Elementary to Advanced)"
                      name="courseCodeTitle"
                      className="radio-input"
                      value="General English (Elementary to Advanced)"
                      type="radio"
                      onChange={handleChange}
                      checked={
                        formData.courseCodeTitle ===
                        'General English (Elementary to Advanced)'
                          ? true
                          : false
                      }
                    />
                    {radioNull ? (
                      <p style={{ color: 'red', fontStyle: 'italic' }}>
                        This filed is Required
                      </p>
                    ) : null}
                  </Form.Group>
                </div>
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
                    value={formData.statementOfAttenment}
                  />
                  {qualificationNull ? (
                    <p style={{ color: 'red', fontStyle: 'italic' }}>
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
                    checked={officialCertificate === 'Yes' ? true : false}
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
                    checked={officialCertificate === 'No' ? true : false}
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
                          <div className="prev-img-parent">
                            {base64Images.map((base64, index) => (
                              <div className="prev-img">
                                <img
                                  key={index}
                                  src={base64}
                                  alt={`Image ${index}`}
                                  width={100}
                                />
                                <button
                                  type="button"
                                  className=""
                                  onClick={() => deleteFile(index)}
                                >
                                  <i class="fa-solid fa-trash"></i>
                                </button>
                              </div>
                            ))}
                          </div>
                          {signatureError ? (
                            <p style={{ color: 'red', fontStyle: 'italic' }}>
                              Image Size should be less than 2MB
                            </p>
                          ) : null}
                          {fileNull ? (
                            <p style={{ color: 'red', fontStyle: 'italic' }}>
                              Official Certificate is required
                            </p>
                          ) : null}
                        </Form.Group>
                      </div>
                    </div>
                  ) : null}
                  {officialCertificateNull ? (
                    <p style={{ color: 'red', fontStyle: 'italic' }}>
                      This field is Required
                    </p>
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
                    checked={officialTranscript === 'Yes' ? true : false}
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
                    checked={officialTranscript === 'No' ? true : false}
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
                          <div className="prev-img-parent">
                            {base64Images1.map((base64, index) => (
                              <div className="prev-img">
                                <img
                                  key={index}
                                  src={base64}
                                  alt={`Image ${index}`}
                                  width={100}
                                />
                                <button
                                  type="button"
                                  className=""
                                  onClick={() => deleteFile1(index)}
                                >
                                  <i class="fa-solid fa-trash"></i>
                                </button>
                              </div>
                            ))}
                          </div>
                          {signatureError2 ? (
                            <p style={{ color: 'red', fontStyle: 'italic' }}>
                              Image Size should be less than 2MB
                            </p>
                          ) : null}
                          {fileNull2 ? (
                            <p style={{ color: 'red', fontStyle: 'italic' }}>
                              Transcript is required
                            </p>
                          ) : null}
                        </Form.Group>
                      </div>
                    </div>
                  ) : null}
                  {officialTranscriptNull ? (
                    <p style={{ color: 'red', fontStyle: 'italic' }}>
                      This field is Required
                    </p>
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
                    checked={
                      formData.headOfCompliance === 'Credit Transfer Approved'
                        ? true
                        : false
                    }
                  />
                  <Form.Check
                    inline
                    label="Credit Transfer Not Approved"
                    name="headOfCompliance"
                    className="radio-input"
                    value="Credit Transfer Not Approved"
                    type="radio"
                    onChange={handleChange}
                    checked={
                      formData.headOfCompliance ===
                      'Credit Transfer Not Approved'
                        ? true
                        : false
                    }
                  />
                  {headOfComplianceNull ? (
                    <p style={{ color: 'red', fontStyle: 'italic' }}>
                      This field is Required
                    </p>
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
                      value={formData.explanationOfDecision}
                    />
                    {explanationOfDecisionNull ? (
                      <p style={{ color: 'red', fontStyle: 'italic' }}>
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
                    <p style={{ color: 'red', fontStyle: 'italic' }}>
                      Signature is required
                    </p>
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
                    name="courseSectionDate"
                    value={formData.courseSectionDate}
                  />
                  {courseSectionDateNull ? (
                    <p style={{ color: 'red', fontStyle: 'italic' }}>
                      Date is required
                    </p>
                  ) : null}
                </Form.Group>
                <button onClick={handleback2}>Back</button>
                <button onClick={handleNext2}>Next</button>
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
                        value={inputArr.unitCode1}
                      />
                    </div>
                    <div>
                      <Form.Label>Unit Title</Form.Label>
                      <Form.Control
                        type="text"
                        onChange={handleInputAddChange}
                        name="unitTitle1"
                        value={inputArr.unitTitle1}
                      />
                    </div>
                  </div>
                  <div className="input-flex">
                    <Form.Control
                      type="text"
                      onChange={handleInputAddChange}
                      name="unitCode2"
                      value={inputArr.unitCode2}
                    />
                    <Form.Control
                      type="text"
                      onChange={handleInputAddChange}
                      name="unitTitle2"
                      value={inputArr.unitTitle2}
                    />
                  </div>
                  <div className="input-flex">
                    <Form.Control
                      type="text"
                      onChange={handleInputAddChange}
                      name="unitCode3"
                      value={inputArr.unitCode3}
                    />
                    <Form.Control
                      type="text"
                      onChange={handleInputAddChange}
                      name="unitTitle3"
                      value={inputArr.unitTitle3}
                    />
                  </div>
                  <div className="input-flex">
                    <Form.Control
                      type="text"
                      onChange={handleInputAddChange}
                      name="unitCode4"
                      value={inputArr.unitCode4}
                    />
                    <Form.Control
                      type="text"
                      onChange={handleInputAddChange}
                      name="unitTitle4"
                      value={inputArr.unitTitle4}
                    />
                  </div>
                  <div className="input-flex">
                    <Form.Control
                      type="text"
                      onChange={handleInputAddChange}
                      name="unitCode5"
                      value={inputArr.unitCode5}
                    />
                    <Form.Control
                      type="text"
                      onChange={handleInputAddChange}
                      name="unitTitle5"
                      value={inputArr.unitTitle5}
                    />
                  </div>
                  <div className="input-flex">
                    <Form.Control
                      type="text"
                      onChange={handleInputAddChange}
                      name="unitCode6"
                      value={inputArr.unitCode6}
                    />
                    <Form.Control
                      type="text"
                      onChange={handleInputAddChange}
                      name="unitTitle6"
                      value={inputArr.unitTitle6}
                    />
                  </div>
                  <div className="input-flex">
                    <Form.Control
                      type="text"
                      onChange={handleInputAddChange}
                      name="unitCode7"
                      value={inputArr.unitCode7}
                    />
                    <Form.Control
                      type="text"
                      onChange={handleInputAddChange}
                      name="unitTitle7"
                      value={inputArr.unitTitle7}
                    />
                  </div>
                  <div className="input-flex">
                    <Form.Control
                      type="text"
                      onChange={handleInputAddChange}
                      name="unitCode8"
                      value={inputArr.unitCode8}
                    />
                    <Form.Control
                      type="text"
                      onChange={handleInputAddChange}
                      name="unitTitle8"
                      value={inputArr.unitTitle8}
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
                        value={formData.repFirstName}
                      />
                      <p className="input-p">First Name</p>
                    </div>
                    <div>
                      <Form.Control
                        type="text"
                        onChange={handleChange}
                        name="repLastName"
                        value={formData.repLastName}
                      />
                      <p className="input-p">Last Name</p>
                    </div>
                  </div>
                  {representativeNull ? (
                    <p style={{ color: 'red', fontStyle: 'italic' }}>
                      This field is required
                    </p>
                  ) : null}
                  {repNameError ? (
                    <p style={{ color: 'red', fontStyle: 'italic' }}>
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
                    value={formData.unitsDate}
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
                    {declaration1 ? (
                      <Form.Check
                        inline
                        label="Student Advised in writing"
                        onChange={handleDecalaration1}
                        name="Student Advised in writing"
                        type="checkbox"
                        checked={true}
                      />
                    ) : (
                      <Form.Check
                        inline
                        label="Student Advised in writing"
                        onChange={handleDecalaration1}
                        name="Student Advised in writing"
                        type="checkbox"
                      />
                    )}
                    {declaration2 ? (
                      <Form.Check
                        inline
                        label="CT recorded in SMS"
                        onChange={handleDecalaration2}
                        name="CT recorded in SMS"
                        type="checkbox"
                        checked={true}
                      />
                    ) : (
                      <Form.Check
                        inline
                        label="CT recorded in SMS"
                        onChange={handleDecalaration2}
                        name="CT recorded in SMS"
                        type="checkbox"
                      />
                    )}
                    {declaration3 ? (
                      <Form.Check
                        inline
                        label="Application Closed"
                        onChange={handleDecalaration3}
                        name="Application Closed"
                        type="checkbox"
                        checked={true}
                      />
                    ) : (
                      <Form.Check
                        inline
                        label="Application Closed"
                        onChange={handleDecalaration3}
                        name="Application Closed"
                        type="checkbox"
                      />
                    )}

                    {adminRecordsNull ? (
                      <p style={{ color: 'red', fontStyle: 'italic' }}>
                        This field is required
                      </p>
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
                    value={formData.initials}
                  />
                  {initialsNull ? (
                    <p style={{ color: 'red', fontStyle: 'italic' }}>
                      Initials is required
                    </p>
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
                    value={formData.initialsDate}
                  />
                  <p className="input-p">Date</p>
                  {initialsDateNull ? (
                    <p style={{ color: 'red', fontStyle: 'italic' }}>
                      Date is required
                    </p>
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
                        value={formData.adminFirstName}
                      />
                      <p className="input-p">First Name</p>
                    </div>
                    <div>
                      <Form.Control
                        type="text"
                        onChange={handleChange}
                        name="adminLastName"
                        value={formData.adminLastName}
                      />
                      <p className="input-p">Last Name</p>
                    </div>
                  </div>
                  {adminNameNull ? (
                    <p style={{ color: 'red', fontStyle: 'italic' }}>
                      This field is required
                    </p>
                  ) : null}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Administrators's Signature</Form.Label>
                  <br />
                  <div className="sign_div">
                    <SignatureCanvas
                      canvasProps={{
                        width: 300,
                        height: 100,
                        className: 'sigCanvas',
                      }}
                      ref={(data) => setSign1(data)}
                    />
                  </div>
                  {!url1 ? (
                    <button onClick={handleGenerate1} className="sign-btn">
                      Save
                    </button>
                  ) : (
                    <button className="sign-btn saved-btn" disabled={true}>
                      Saved
                    </button>
                  )}
                  <button onClick={handleClear1} className="sign-btn">
                    Clear
                  </button>
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
                    value={formData.adminDate}
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
                        value={formData.managerFirstName}
                      />
                      <p className="input-p">First Name</p>
                    </div>
                    <div>
                      <Form.Control
                        type="text"
                        onChange={handleChange}
                        name="managerLastName"
                        value={formData.managerLastName}
                      />
                      <p className="input-p">Last Name</p>
                    </div>
                  </div>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Campus manager's Signature</Form.Label>
                  <br />
                  <div className="sign_div">
                    <SignatureCanvas
                      canvasProps={{
                        width: 300,
                        height: 100,
                        className: 'sigCanvas',
                      }}
                      ref={(data) => setSign2(data)}
                    />
                  </div>
                  {!url2 ? (
                    <button onClick={handleGenerate2} className="sign-btn">
                      Save
                    </button>
                  ) : (
                    <button className="sign-btn saved-btn" disabled={true}>
                      Saved
                    </button>
                  )}
                  <button onClick={handleClear2} className="sign-btn">
                    Clear
                  </button>
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
                    value={formData.managerDate}
                  />
                  <p className="input-p">Date</p>
                </Form.Group>
                <button onClick={handleBack3}>Back</button>
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
