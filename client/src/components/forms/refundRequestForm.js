import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import JsonData from '../../FormJSON/countryName.json';
import Container from 'react-bootstrap/Container';
import PhoneInput from 'react-phone-input-2';
import SignatureCanvas from 'react-signature-canvas';
import axios from 'axios';
import {
  IdValidation,
  addressValidation,
  altEmailValidator,
  dobValidation,
  emailValidator,
  genderValidation,
  handleAcknowledgement,
  handleCourseNameError,
  handleError,
  handleNameError,
  handleNullError,
  mobileValidation,
  refundTypeValidation,
  startDateValidation,
  telValidation,
  typeOfIdValidation,
  typeOfIdValidationArr,
} from '../errors/errorFun';
import { FileUploader } from 'react-drag-drop-files';

const RefundRequestForm = () => {
  const [signatureFile, setSignatureFile] = useState('');
  const [signatureImage, setSignatureImage] = useState('');
  const [signatureError, setSignatureError] = useState(false);
  const [fileNull, setFileNull] = useState(false);
  const [declaration1, setDeclaration1] = useState(false);
  const [checkError, setCheckError] = useState(false);

  const [radioNull, setRadioNull] = useState(false);

  const [sign, setSign] = useState();
  const [sign1, setSign1] = useState();
  const [sign2, setSign2] = useState();
  const [url, setUrl] = useState();
  const [url1, setUrl1] = useState();
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

  const handleDecalaration1 = () => {
    if (declaration1 === false) {
      setDeclaration1(true);
    } else {
      setDeclaration1(false);
    }
  };

  const [base64Images, setBase64Images] = useState([]);

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

  const fileTypes = ['JPG', 'PNG', 'PDF'];
  const [file, setFile] = useState(null);
  const imageArr = [];
  // const handleFileChange = (file) => {
  //   const size = (file.size / (1024 * 1024)).toFixed(2);

  //   if (size > 2) {
  //     setSignatureError(true);
  //   } else {
  //     setSignatureError(false);
  //     imageArr.push(file);
  //     setSignatureFile(file);
  //     previewSignatureFiles(imageArr);
  //   }
  //   setFile(file);
  // };

  // const previewSignatureFiles = (file) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setSignatureImage(reader.result);
  //   };
  // };

  const handleFileChange = async (file) => {
    console.log(file);
    const base64 = await convertBase64(file);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result);
        console.log(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const [formData, setFormData] = useState({
    courseName: '',
    courseStartDate: '',
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
    invoiceNumber: '',
    reason: '',
    bankName: '',
    accName: '',
    accNumber: '',
    bsb: '',
    bankAddress: '',
    swiftCode: '',
    bankDate: '',
    invoiceNumber: '',
    reason: '',
    bankName: '',
    accNumber: '',
    accName: '',
    bsb: '',
    bankAddress: '',
    swiftCode: '',
    bankDate: '',
    refundAmount: '',
    comments: '',
    refundMethod: '',
    position: '',
    printName: '',
    dateProcessed: '',
    refundRegister: '',
    logDate: '',
    loggedBy: '',
    formal: '',
    formalDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [refundType, setRefundType] = useState('');
  const [otherRefundInput, setOtherRefundInput] = useState('');
  const [otherRadioChange, setOtherRadioChange] = useState(false);

  const [changePageState, setChangePageState] = useState(false);

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
  const [invoiceNull, setInvoiceNull] = useState(false);
  const [reasonNull, setReasonNull] = useState(false);
  const [bankNameError, setBankNameError] = useState(false);
  const [bankNameNull, setBakNameNull] = useState(false);
  const [accNameNull, setAccNameNull] = useState(false);
  const [accNumberNull, setAccNumberNull] = useState(false);
  const [bsbNull, setBsbNull] = useState(false);
  const [bankAddressNull, setBankAddressNull] = useState(false);
  const [banktDateNull, setBankDateNull] = useState(false);
  const [refundTypeNull, setRefundTypeNull] = useState(false);
  const [refundAmountNull, setRefundAmountNull] = useState(false);
  const [refundMethodNull, setRefundMethodNull] = useState(false);
  const [positionNull, setPositionNull] = useState(false);
  const [printNameNull, setPrintNameNull] = useState(false);
  const [processedDateNull, setProcessedDateNull] = useState(false);
  const [refundRegisterNull, setRefundRegisterNull] = useState(false);
  const [logDateNull, setLogDateNull] = useState(false);
  const [loggedNull, setLoggedNull] = useState(false);
  const [formalNull, setFormalNull] = useState(false);
  const [formalDateNull, setFormalDateNull] = useState(false);
  const [signNull, setSignNull] = useState(false);
  const [signNull2, setSignNull2] = useState(false);

  const handleDelete = (e, index) => {
    e.preventDefault(e);
    base64Images.splice(index, 1);
  };

  const handleChangeState = (e) => {
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
    if (
      courseNameVer &&
      startDateVer &&
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
      setChangePageState(true);
    }
  };

  const handleChangePageBack = (e) => {
    setChangePageState(false);
  };

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
    const invoiceVer = typeOfIdValidation(
      formData.invoiceNumber,
      setInvoiceNull
    );
    const reasonVer = typeOfIdValidation(formData.reason, setReasonNull);
    const imageVer = typeOfIdValidationArr(base64Images, setFileNull);
    const acknowVer = handleAcknowledgement(declaration1, setCheckError);
    const bankNameVer = typeOfIdValidation(formData.bankName, setBankNameError);
    const accNumberVer = typeOfIdValidation(
      formData.accNumber,
      setAccNumberNull
    );
    const accNameVer = typeOfIdValidation(formData.accName, setAccNameNull);
    const bsbVer = typeOfIdValidation(formData.bsb, setBsbNull);
    const bankAddVer = typeOfIdValidation(
      formData.bankAddress,
      setBankAddressNull
    );
    const bankDateVer = typeOfIdValidation(formData.bankDate, setBankDateNull);
    const refundTypeVer = refundTypeValidation(
      refundType,
      otherRefundInput,
      setRadioNull
    );
    const refundAmtVer = typeOfIdValidation(
      formData.refundAmount,
      setRefundAmountNull
    );
    const refundMethodVer = typeOfIdValidation(
      formData.refundMethod,
      setRefundMethodNull
    );
    const positionVer = typeOfIdValidation(formData.position, setPositionNull);
    const printNameVer = typeOfIdValidation(
      formData.printName,
      setPrintNameNull
    );
    const processedDateVer = typeOfIdValidation(
      formData.dateProcessed,
      setProcessedDateNull
    );
    const loggedInVer = typeOfIdValidation(
      formData.refundRegister,
      setRefundRegisterNull
    );
    const loggedInDateVer = typeOfIdValidation(
      formData.logDate,
      setLogDateNull
    );
    const loggedByVer = typeOfIdValidation(formData.loggedBy, setLoggedNull);
    const signVer = typeOfIdValidation(url, setSignNull);
    const signVer2 = typeOfIdValidation(url2, setSignNull2);
    const formalVer = typeOfIdValidation(formData.formal, setFormalNull);
    const formDateVer = typeOfIdValidation(
      formData.formalDate,
      setFormalDateNull
    );

    const arr = [];
    if (url1 === '') {
      arr.push(url, url2);
    } else {
      arr.push(url, url1, url2);
    }

    if (
      loggedInVer &&
      formDateVer &&
      formalVer &&
      loggedByVer &&
      loggedInDateVer &&
      processedDateVer &&
      accNameVer &&
      bsbVer &&
      bankAddVer &&
      bankDateVer &&
      refundTypeVer &&
      refundAmtVer &&
      refundMethodVer &&
      positionVer &&
      printNameVer &&
      bankNameVer &&
      accNumberVer &&
      courseNameVer &&
      startDateVer &&
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
      invoiceVer &&
      reasonVer &&
      imageVer &&
      acknowVer &&
      signVer &&
      signVer2
    ) {
      await axios
        .post(`${process.env.REACT_APP_BACKEND_LINK}/forms/rrf`, {
          formData,
          refundType,
          otherRefundInput,
          base64Images,
          arr
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

  const handleRefundType = (e) => {
    setRefundType(e.target.value);
    if (refundType === 'other') {
      setOtherRadioChange(true);
    } else {
      setOtherRadioChange(false);
    }
  };

  return (
    <div className="outer-div">
      <Container>
        <h1 className="form-h1">Refund Request Form</h1>
        <div className="form-parent refund-req">
          <Form>
            {changePageState === false && (
              <>
                <p className="form-p">PART A – STUDENT DETAILS</p>
                <div className="input-flex">
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
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      Course Start Date:<span className="mandate">*</span>
                    </Form.Label>
                    <br />
                    <Form.Control
                      type="date"
                      onChange={handleChange}
                      name="courseStartDate"
                      value={formData.courseStartDate}
                    />
                    {startDateNull ? (
                      <p style={{ color: 'red' }}>Please select start date</p>
                    ) : null}
                  </Form.Group>
                </div>
                <div className="name-div">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      Name<span className="mandate">*</span>
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
                      value={formData.gender}
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
                    <Form.Label>Telephone:<span className="mandate">*</span></Form.Label>
                    <br />
                    <div className="mobile-flex-div-child">
                      <Form.Select
                        aria-label="Default select example"
                        className="flag-select"
                        defaultValue={formData.telCode}
                        onChange={handleChange}
                        name="telCode"
                        value={formData.telCode}
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
                        value={formData.telephone}
                      />
                    </div>
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
                <p className="form-p form-sub-p">IDENTIFICATION VERIFIED</p>
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
                      <p style={{ color: 'red' }}>Enter type of ID</p>
                    ) : null}
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
                      <p style={{ color: 'red' }}>Enter valid ID number</p>
                    ) : null}
                    {idNull ? (
                      <p style={{ color: 'red' }}>Enter your ID number</p>
                    ) : null}
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
                {/* <button onClick={handleSubmit}>Submit</button> */}
                <button onClick={handleChangeState}>Next</button>{' '}
              </>
            )}
            {changePageState === true && (
              <>
                <p className="form-p">PART B – REFUND DETAILS</p>
                <Form.Label>I request a refund for the following:</Form.Label>
                <Form.Group
                  // className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Invoice Number:<span className="mandate">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    name="invoiceNumber"
                    value={formData.invoiceNumber}
                  />
                  {invoiceNull ? (
                    <p style={{ color: 'red' }}>Invoice Number is required</p>
                  ) : null}
                </Form.Group>
                <div className="textarea-div">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      Reason:<span className="mandate">*</span>
                    </Form.Label>
                    <br />
                    <Form.Control
                      as="textarea"
                      onChange={handleChange}
                      name="reason"
                      value={formData.reason}
                    />
                    {reasonNull ? (
                      <p style={{ color: 'red' }}>Reason is required</p>
                    ) : null}
                  </Form.Group>
                </div>
                <div className="flex-width ">
                  <div className="textarea-div">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>
                        Please attach any supporting documentation:
                        <span className="mandate">*</span>
                      </Form.Label>
                      <br />
                      {/* <FileUploader
                        handleChange={handleImageUpload}
                        name="file"
                        types={fileTypes}
                        accept="image/png, image/jpeg, image/jpg, application/pdf"
                        multiple={true}
                      /> */}
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
                <div className="textarea-div check">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      Acknowledgement:<span className="mandate">*</span>
                    </Form.Label>
                    <Form.Check
                      inline
                      label="I understand that my request for a refund will be processed in accordance with Signet Institute Fees & Refund Policy and Procedure."
                      onChange={handleDecalaration1}
                      name="declaration1"
                      type="checkbox"
                      defaultChecked={declaration1}
                    />
                    {checkError ? (
                      <p style={{ color: 'red' }}>
                        Acknowledgement is required
                      </p>
                    ) : null}
                  </Form.Group>
                </div>
                <p className="form-p">Bank Details:</p>
                <div className="input-flex">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      Bank Name:<span className="mandate">*</span>
                    </Form.Label>
                    <br />
                    <Form.Control
                      type="text"
                      onChange={handleChange}
                      name="bankName"
                      value={formData.bankName}
                    />
                    {bankNameError ? (
                      <p style={{ color: 'red' }}>
                        Bank Name should contain only Alphabets
                      </p>
                    ) : null}
                    {bankNameNull ? (
                      <p style={{ color: 'red' }}>Bank Name is Required</p>
                    ) : null}
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      Account Name:<span className="mandate">*</span>
                    </Form.Label>
                    <br />
                    <Form.Control
                      type="text"
                      onChange={handleChange}
                      name="accName"
                      value={formData.accName}
                    />
                    {accNameNull ? (
                      <p style={{ color: 'red' }}>Account Name is required</p>
                    ) : null}
                  </Form.Group>
                </div>
                <div className="input-flex">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      Account Number:<span className="mandate">*</span>
                    </Form.Label>
                    <br />
                    <Form.Control
                      type="text"
                      onChange={handleChange}
                      name="accNumber"
                      value={formData.accNumber}
                    />
                    {accNumberNull ? (
                      <p style={{ color: 'red' }}>Account Number is Required</p>
                    ) : null}
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      BSB:<span className="mandate">*</span>
                    </Form.Label>
                    <br />
                    <Form.Control
                      type="text"
                      onChange={handleChange}
                      name="bsb"
                      value={formData.bsb}
                    />
                    {bsbNull ? (
                      <p style={{ color: 'red' }}>BSB is required</p>
                    ) : null}
                  </Form.Group>
                </div>
                <div className="input-flex">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      Bank Address:<span className="mandate">*</span>
                    </Form.Label>
                    <br />
                    <Form.Control
                      type="text"
                      onChange={handleChange}
                      name="bankAddress"
                      value={formData.bankAddress}
                    />
                    {bankAddressNull ? (
                      <p style={{ color: 'red' }}>Bank Address is Required</p>
                    ) : null}
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Swift Code:</Form.Label>
                    <br />
                    <Form.Control
                      type="text"
                      onChange={handleChange}
                      name="swiftCode"
                      value={formData.swiftCode}
                    />
                  </Form.Group>
                </div>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Date:<span className="mandate">*</span>
                  </Form.Label>
                  <br />
                  <Form.Control
                    type="date"
                    onChange={handleChange}
                    name="bankDate"
                    value={formData.bankDate}
                  />
                  <p className="input-p">Date</p>
                  {banktDateNull ? (
                    <p style={{ color: 'red' }}>Date is required</p>
                  ) : null}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
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
                  <button onClick={handleGenerate} className="sign-btn">
                    Save
                  </button>
                  <button onClick={handleClear} className="sign-btn">
                    Clear
                  </button>
                  {signNull ? (
                    <p style={{ color: 'red' }}>Signature is required</p>
                  ) : null}
                </Form.Group>
                <p className="form-p">PART C – AUTHORISATION</p>
                <div className="flex-width ">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      Please tick the type of Refund:
                      <span className="mandate">*</span>
                    </Form.Label>
                    <Form.Check
                      inline
                      label="Withdrawal"
                      name="refundType"
                      className="radio-input"
                      value="Withdrawal"
                      type="radio"
                      onChange={handleRefundType}
                    />
                    <Form.Check
                      inline
                      label="Cancellation"
                      name="refundType"
                      className="radio-input"
                      value="Cancellation"
                      type="radio"
                      onChange={handleRefundType}
                    />
                    <Form.Check
                      inline
                      label="Transfer"
                      name="refundType"
                      className="radio-input"
                      value="Transfer"
                      type="radio"
                      onChange={handleRefundType}
                    />
                    <Form.Check
                      inline
                      label="Other (Please specify):"
                      className="radio-input"
                      name="refundType"
                      value="other"
                      type="radio"
                      onChange={handleRefundType}
                    />
                    {refundType === 'other' ? (
                      <Form.Control
                        type="text"
                        onChange={(e) => {
                          setOtherRefundInput(e.target.value);
                        }}
                        name="otherRefundInput"
                        value={otherRefundInput}
                      />
                    ) : null}
                    {radioNull ? (
                      <p style={{ color: 'red' }}>Required</p>
                    ) : null}
                  </Form.Group>
                </div>
                <div className="flex-width ">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      This refund amount is:
                      <span className="mandate">*</span>
                    </Form.Label>
                    <Form.Check
                      inline
                      label="Approved"
                      name="refundAmount"
                      className="radio-input"
                      value="Approved"
                      type="radio"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="Denied"
                      name="refundAmount"
                      className="radio-input"
                      value="Denied"
                      type="radio"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="Adjusted to $"
                      name="refundAmount"
                      className="radio-input"
                      value="Adjusted to $"
                      type="radio"
                      onChange={handleChange}
                    />
                    {refundAmountNull ? (
                      <p style={{ color: 'red' }}>Required</p>
                    ) : null}
                  </Form.Group>
                </div>
                <div className="textarea-div">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      Comments/ Reason for decision / Calculations of refund:
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      onChange={handleChange}
                      name="comments"
                      value={formData.comments}
                    />
                  </Form.Group>
                </div>
                <div className="flex-width ">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      Refund method is:
                      <span className="mandate">*</span>
                    </Form.Label>
                    <Form.Check
                      inline
                      label="EFT / Credit Card"
                      name="refundMethod"
                      className="radio-input"
                      value="EFT / Credit Card"
                      type="radio"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="Cheque"
                      name="refundMethod"
                      className="radio-input"
                      value="Cheque"
                      type="radio"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="Direct Debit"
                      name="refundMethod"
                      className="radio-input"
                      value="Direct Debit"
                      type="radio"
                      onChange={handleChange}
                    />
                    {refundMethodNull ? (
                      <p style={{ color: 'red' }}>Refund Method is Required</p>
                    ) : null}
                  </Form.Group>
                </div>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
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
                      ref={(data) => setSign1(data)}
                    />
                  </div>
                  <button onClick={handleGenerate1} className="sign-btn">
                    Save
                  </button>
                  <button onClick={handleClear1} className="sign-btn">
                    Clear
                  </button>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Position:<span className="mandate">*</span>
                  </Form.Label>
                  <br />
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    name="position"
                    value={formData.position}
                  />
                  {positionNull ? (
                    <p style={{ color: 'red' }}>Position is Required</p>
                  ) : null}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Print Name:<span className="mandate">*</span>
                  </Form.Label>
                  <br />
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    name="printName"
                    value={formData.printName}
                  />
                  {printNameNull ? (
                    <p style={{ color: 'red' }}>Print Name is Required</p>
                  ) : null}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Date Processed:<span className="mandate">*</span>
                  </Form.Label>
                  <br />
                  <Form.Control
                    type="date"
                    onChange={handleChange}
                    name="dateProcessed"
                    value={formData.dateProcessed}
                  />
                  <p className="input-p">Date</p>
                  {processedDateNull ? (
                    <p style={{ color: 'red' }}>Processed Date is required</p>
                  ) : null}
                </Form.Group>
                <div className="input-flex">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      Logged in Refund Register:
                      <span className="mandate">*</span>
                    </Form.Label>
                    <br />
                    <Form.Check
                      inline
                      label="Yes"
                      name="refundRegister"
                      className="radio-input"
                      value="Yes"
                      type="radio"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="refundRegister"
                      className="radio-input"
                      value="No"
                      type="radio"
                      onChange={handleChange}
                    />
                    {refundRegisterNull ? (
                      <p style={{ color: 'red' }}>Required</p>
                    ) : null}
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      Date:<span className="mandate">*</span>
                    </Form.Label>
                    <br />
                    <Form.Control
                      type="date"
                      onChange={handleChange}
                      name="logDate"
                      value={formData.logDate}
                    />
                    <p className="input-p">Date</p>
                    {logDateNull ? (
                      <p style={{ color: 'red' }}>Date is required</p>
                    ) : null}
                  </Form.Group>
                </div>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Logged by:<span className="mandate">*</span>
                  </Form.Label>
                  <br />
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    name="loggedBy"
                    value={formData.loggedBy}
                  />
                  {loggedNull ? (
                    <p style={{ color: 'red' }}>Logged By Required</p>
                  ) : null}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
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
                      ref={(data) => setSign2(data)}
                    />
                  </div>
                  <button onClick={handleGenerate2} className="sign-btn">
                    Save
                  </button>
                  <button onClick={handleClear2} className="sign-btn">
                    Clear
                  </button>
                  {signNull2 ? (
                    <p style={{ color: 'red' }}>Signature is required</p>
                  ) : null}
                </Form.Group>
                <div className="input-flex">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      Formal Letter/ Email Sent:
                      <span className="mandate">*</span>
                    </Form.Label>
                    <br />
                    <Form.Check
                      inline
                      label="Yes"
                      name="formal"
                      className="radio-input"
                      value="Yes"
                      type="radio"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="No"
                      name="formal"
                      className="radio-input"
                      value="No"
                      type="radio"
                      onChange={handleChange}
                    />
                    {formalNull ? (
                      <p style={{ color: 'red' }}>Required</p>
                    ) : null}
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      Date:<span className="mandate">*</span>
                    </Form.Label>
                    <br />
                    <Form.Control
                      type="date"
                      onChange={handleChange}
                      name="formalDate"
                      value={formData.formalDate}
                    />
                    <p className="input-p">Date</p>
                    {formalDateNull ? (
                      <p style={{ color: 'red' }}>Date is required</p>
                    ) : null}
                  </Form.Group>
                </div>
                <div className="flex-width">
                  <button onClick={handleChangePageBack}>Back</button>
                  <button onClick={handleSubmit}>Submit</button>{' '}
                </div>
              </>
            )}
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default RefundRequestForm;
