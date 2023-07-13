import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import SignatureCanvas from 'react-signature-canvas';
import JsonData from '../../FormJSON/countryName.json';
import {
  IdValidation,
  OfficialCertificateVaidation,
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
  previousStudyVaidation,
  providedCertifiedCopyOfEvidenceVaidation,
  startDateValidation,
  telValidation,
  typeOfIdValidation,
} from '../errors/errorFun';
import { FileUploader } from 'react-drag-drop-files';

const GTEForm = () => {
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
    choosingNotToStudyInYourHomeCountry: '',
    whyChoosenToStudyInAustralia: '',
    whyChoosenToStudyInSignit: '',
    whatDoYouKnowAboutCourse: '',
    // choosingNotToStudyInYourHomeCountry: '',
    // whyChoosenToStudyInAustralia: '',
    // whyChoosenToStudyInSignit: '',
    // whatDoYouKnowAboutCourse: '',
    // changingAreaOfStudy: '',
    explainWhyChoosenToChange: '',
    // providedCertifiedCopyOfEvidence: '',
    providedCertifiedExplainWhy: '',
    firstYearCostperPerson: '',
    firstYearNumberOfPeople: '',
    firstYearTotalCost: '',
    applicantCostperPerson: '',
    applicantNumberOfPeople: '',
    applicantTotalCost: '',
    partnerCostperPerson: '',
    partnerNumberOfPeople: '',
    partnerTotalCost: '',
    childCostperPerson: '',
    childNumberOfPeople: '',
    childTotalCost: '',
    airfaresCostperPerson: '',
    airfaresNumberOfPeople: '',
    airfaresTotalCost: '',
    anticipatedCostperPerson: '',
    anticipatedNumberOfPeople: '',
    anticipatedTotalCost: '',
    selfProvide: '',
    selfCertified: '',
    sponserProvide: '',
    sponcerCertified: '',
    loanProvide: '',
    loanCertified: '',
    otherProvide: '',
    otherCertified: '',
    genuineStudent: '',
    declarationPrefix: 'Mr',
    declarationFirstName: '',
    declarationMiddleName: '',
    declarationLastName: '',
    declarationDate: '',
  });

  const [changePageState, setChangePageState] = useState(true);
  const [changePageState1, setChangePageState1] = useState(false);
  const [changePageState2, setChangePageState2] = useState(false);
  const [changePageState3, setChangePageState3] = useState(false);
  const [changePageState4, setChangePageState4] = useState(false);

  const [changingAreaOfStudy, setChangingAreaOfStudy] = useState('');
  const [providedCertifiedCopyOfEvidence, setProvidedCertifiedCopyOfEvidence] =
    useState('');

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [base64Images, setBase64Images] = useState([]);

  const deleteFile = (e) => {
    const s = base64Images.filter((item, index) => index !== e);
    setBase64Images(s);
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

  const [explainWhyChoosenToChangeNull, setExplainWhyChoosenToChangeNull] =
    useState(false);

  const [
    choosingNotToStudyInYourHomeCountryNull,
    setChoosingNotToStudyInYourHomeCountryNull,
  ] = useState(false);

  const [providedCertifiedExplainWhyNull, setProvidedCertifiedExplainWhyNull] =
    useState(false);

  const [
    whyChoosenToStudyInAustraliaNull,
    setWhyChoosenToStudyInAustraliaNull,
  ] = useState(false);
  const [whyChoosenToStudyInSignitNull, setWhyChoosenToStudyInSignitNull] =
    useState(false);
  const [whatDoYouKnowAboutCourseNull, setWhatDoYouKnowAboutCourseNull] =
    useState(false);
  const [genuineStudentNull, setGenuineStudentNull] = useState(false);
  const [declarationNameError, setDeclarationNameError] = useState(false);
  const [declarationNameNull, setDeclarationNameNull] = useState(false);
  const [declarationDateNull, setDeclarationDateNull] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const courseNameVer = handleCourseNameError(
    //   formData.courseName,
    //   setCourseNameError,
    //   setCourseNameNUll
    // );
    // const startDateVer = startDateValidation(
    //   formData.courseStartDate,
    //   setstartDateNull
    // );
    // const nameVer = handleNameError(
    //   formData.firstName,
    //   formData.lastName,
    //   setNameNull,
    //   setNameError
    // );
    // const dbVer = dobValidation(formData.dob, setDobNull, setDobError);
    // const genderVer = genderValidation(formData.gender, setGenderNull);
    // const telVer = telValidation(
    //   formData.telCode,
    //   formData.telephone,
    //   setCountryCodeNull,
    //   setTelError
    // );
    // const mobVer = mobileValidation(
    //   formData.mobCode,
    //   formData.mobile,
    //   setMobileCountryCodeNull,
    //   setMobileError,
    //   setMobileNUll
    // );
    // const emailVer = emailValidator(
    //   formData.email,
    //   setEmailError,
    //   setEmailNull
    // );
    // const altEmailVer = altEmailValidator(formData.altEmail, setAltEmailError);
    // const typeOfIdVer = typeOfIdValidation(formData.typeOfId, setTypeIdNull);
    // const idVer = IdValidation(formData.idNumber, setIdError, setIdNull);
    // const addressVer = addressValidation(
    //   formData.buildingName,
    //   formData.street,
    //   formData.town,
    //   formData.state,
    //   formData.postCode,
    //   formData.country,
    //   setAddressNull
    // );
    // const refVer = courseCodValidation(formData.ref, setRefNull);

    const genuineStudentVer = typeOfIdValidation(
      formData.genuineStudent,
      setGenuineStudentNull
    );
    const declarationNameVer = handleNameError(
      formData.declarationFirstName,
      formData.declarationLastName,
      setDeclarationNameNull,
      setDeclarationNameError
    );
    const declarationDateVer = typeOfIdValidation(
      formData.declarationDate,
      setDeclarationDateNull
    );
    const signVer = typeOfIdValidation(url, setSignNull);

    if (
      genuineStudentVer &&
      declarationNameVer &&
      declarationDateVer &&
      signVer
    ) {
      const arr = [url];

      await axios
        .post(`${process.env.REACT_APP_BACKEND_LINK}/forms/gtef`, {
          formData,
          base64Images,
          changingAreaOfStudy,
          providedCertifiedCopyOfEvidence,
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

  const handleChangePage = (e) => {
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
      setChangePageState(false);
      setChangePageState1(true);
      setChangePageState2(false);
      setChangePageState3(false);
      setChangePageState4(false);
    }
  };

  const handleChangePage0 = (e) => {
    e.preventDefault();
    const choosingNotToStudyInYourHomeCountryVer = typeOfIdValidation(
      formData.choosingNotToStudyInYourHomeCountry,
      setChoosingNotToStudyInYourHomeCountryNull
    );
    const whyChoosenToStudyInAustraliaVer = typeOfIdValidation(
      formData.whyChoosenToStudyInAustralia,
      setWhyChoosenToStudyInAustraliaNull
    );
    const whyChoosenToStudyInSignitVer = typeOfIdValidation(
      formData.whyChoosenToStudyInSignit,
      setWhyChoosenToStudyInSignitNull
    );
    const whatDoYouKnowAboutCourseVer = typeOfIdValidation(
      formData.whatDoYouKnowAboutCourse,
      setWhatDoYouKnowAboutCourseNull
    );
    const changingAreaOfStudyVer = OfficialCertificateVaidation(
      changingAreaOfStudy,
      formData.explainWhyChoosenToChange,
      setExplainWhyChoosenToChangeNull
    );

    if (
      choosingNotToStudyInYourHomeCountryVer &&
      whyChoosenToStudyInAustraliaVer &&
      whyChoosenToStudyInSignitVer &&
      whatDoYouKnowAboutCourseVer &&
      changingAreaOfStudyVer
    ) {
      setChangePageState(false);
      setChangePageState1(false);
      setChangePageState2(true);
      setChangePageState3(false);
      setChangePageState4(false);
    }
  };

  const handleChangePageBack0 = (e) => {
    e.preventDefault();
    setChangePageState(true);
    setChangePageState1(false);
    setChangePageState2(false);
    setChangePageState3(false);
    setChangePageState4(false);
  };

  const handleChangePage1 = (e) => {
    e.preventDefault();
    const providedCertifiedCopyOfEvidenceVer =
      providedCertifiedCopyOfEvidenceVaidation(
        providedCertifiedCopyOfEvidence,
        formData.providedCertifiedExplainWhy,
        setProvidedCertifiedExplainWhyNull
      );
    if (providedCertifiedCopyOfEvidenceVer) {
      setChangePageState(false);
      setChangePageState1(false);
      setChangePageState2(false);
      setChangePageState3(true);
      setChangePageState4(false);
    }
  };

  const handleChangePageBack1 = (e) => {
    e.preventDefault();
    setChangePageState(false);
    setChangePageState1(true);
    setChangePageState2(false);
    setChangePageState3(false);
    setChangePageState4(false);
  };

  const handleChangePage2 = (e) => {
    e.preventDefault();

    setChangePageState(false);
    setChangePageState1(false);
    setChangePageState2(false);
    setChangePageState3(false);
    setChangePageState4(true);
  };

  const handleChangePageBack2 = (e) => {
    e.preventDefault();

    setChangePageState(false);
    setChangePageState1(false);
    setChangePageState2(true);
    setChangePageState3(false);
    setChangePageState4(false);
  };

  const handleChangePageBack = (e) => {
    e.preventDefault();

    setChangePageState(false);
    setChangePageState1(false);
    setChangePageState2(false);
    setChangePageState3(true);
    setChangePageState4(false);
  };

  return (
    <div className="outer-div">
      <Container>
        {changePageState && (
          <>
            <h1 className="form-h1">GENUINE TEMPORARY ENTRANT (GTE) FORM</h1>
            <h5 className="form-p sub-p-marg">OVERVIEW</h5>
            <p className="sub-p">
              Genuine student is someone who has real intentions to study only
              and who intends to obtain an education degree from an Australian
              education provider. Factors that are considered under the existing
              requirement to be a genuine applicant for entry and study as a
              student include: English language proficiency, financial capacity,
              prerequisite schooling. Age requirements, and intention to comply
              with visa conditions.Student are requested to provide a statement
              or/and answer the following parameters in the application to
              satisfy the requirement of following criteria of GTE:• The
              applicant’s circumstances in their home country the applicant’s
              potential circumstances in Australia• The value of the course in
              relation to the applicant’s future the applicant’s immigration
              history• Any other relevant mattersApplicant personal statement
              must be in English addressing the GTE requirement. Where an
              applicant is not comfortable writing their statement in English,
              it can be written in their own language, however, a translated
              copy must be submitted. An applicant can provide details within
              the application form or attach a written statement along with
              supporting documents. Generic statements unsupported by evidence
              will not be weighed heavily in the GTE
              assessment.https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/student-500/genuine-temporary-entrant
            </p>
            <h5 className="form-p sub-p-marg">Note:</h5>
            <p className="sub-p">
              The agent must risk assess an applicant. Decision makers may
              request additional information and/or further evidence from the
              applicant to demonstrate that they are a genuine temporary
              entrant.
            </p>
            <h5 className="form-p sub-p-marg">INSTRUCTIONS</h5>
            <p className="sub-p">
              The purpose of this form is to enable the Institute to make
              assessment of the genuineness of an applicants’ intention to
              complete their studies at Signet Institute of Australia. Each
              section is targeting a specific area on which Signet Institute of
              Australia will base its assessment, and in which the Department of
              Home Affairs may be interested in during your visa application. In
              addition to completing this form you may be contacted by the
              institute for an interview or clarification on any information
              provided. Please note that you must answer all questions in full.
              Failure to complete any answers may result in your application
              being rejected. All answers must be your own and you cannot seek
              assistance from others. This includes education and/or migration
              agents as well. All answers must be typed in. Hand filled details
              will not be accepted and considered incomplete. Incomplete forms
              will NOT be processed until they are completed and submitted.
              Providing false or misleading information is a serious offence
              under Australian law. If any information on the form is found to
              be incorrect, this will result in your application being rejected
              and/or your enrolment being discontinued.
            </p>
            <h5 className="form-p sub-p-marg">
              Please fill in your details below:
            </h5>
            <div className="form-parent">
              <Form>
                <h5 className="form-p">Applicants Details</h5>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Student Reference #:<span className="mandate">*</span>
                  </Form.Label>
                  <br />
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    name="ref"
                    value={formData.ref}
                  />
                  {refNull ? (
                    <p style={{ color: 'red', fontStyle: 'italic' }}>
                      Reference is required
                    </p>
                  ) : null}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Full Name:<span className="mandate">*</span>
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
                      className="dob-input"
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
                </div>

                <button onClick={handleChangePage}>Next</button>
              </Form>
            </div>
          </>
        )}
        {changePageState1 && (
          <>
            <h5 className="form-p">Applicants Details</h5>
            <p className="sub-p">
              You are required to show that there is strong intention for you to
              return to your home country after completing your study in
              Australia. You can demonstrate this by addressing the following
              points:
              <ul>
                <li>Your future plans (such as career plan, further study)</li>
                <li>
                  Career prospects in your home country (position/roles,
                  industry/field of work and the estimated monthly salary in
                  AUD$ in your home country. Provide links or screenshots for
                  advertised jobs as evidence.
                </li>
                <li>
                  Ties to your home country. Show that there are strong ties to
                  your home country which indicate that you intend to return
                  home at the end of your study (e.g. family ties, addresses of
                  owned properties/real estate, family business etc.).
                </li>
              </ul>
            </p>

            <div className="form-parent">
              <h5 className="form-p">Your Choice of Study/Course:</h5>
              <Form>
                <div className="flex-width">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="complainet-p">
                      Why are you choosing not to study in your home country?
                      <span className="mandate">*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      onChange={handleChange}
                      name="choosingNotToStudyInYourHomeCountry"
                      value={formData.choosingNotToStudyInYourHomeCountry}
                    />
                    {choosingNotToStudyInYourHomeCountryNull ? (
                      <p style={{ color: 'red', fontStyle: 'italic' }}>
                        This Field is required
                      </p>
                    ) : null}
                  </Form.Group>
                </div>
                <div className="flex-width">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="complainet-p">
                      Why have you chosen to study in Australia over other
                      countries? Please provide evidence for your research such
                      as website links?
                      <span className="mandate">*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      onChange={handleChange}
                      name="whyChoosenToStudyInAustralia"
                      value={formData.whyChoosenToStudyInAustralia}
                    />
                    {whyChoosenToStudyInAustraliaNull ? (
                      <p style={{ color: 'red', fontStyle: 'italic' }}>
                        This Field is required
                      </p>
                    ) : null}
                  </Form.Group>
                </div>
                <div className="flex-width">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="complainet-p">
                      Why have you chosen to study at Signet Institute of
                      Australia over other providers in Australia? Please
                      provide evidence for your research such as website links
                      for at least one provider within Australia.
                      <span className="mandate">*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      onChange={handleChange}
                      name="whyChoosenToStudyInSignit"
                      value={formData.whyChoosenToStudyInSignit}
                    />
                    {whyChoosenToStudyInSignitNull ? (
                      <p style={{ color: 'red', fontStyle: 'italic' }}>
                        This Field is required
                      </p>
                    ) : null}
                  </Form.Group>
                </div>
                <div className="flex-width">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="complainet-p">
                      What do you know about the course content, course
                      structure, delivery modes and academic standards and
                      attendance requirements for the courses that you have
                      chosen to undertake at Signet Institute of Australia?
                      <span className="mandate">*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      onChange={handleChange}
                      name="whatDoYouKnowAboutCourse"
                      value={formData.whatDoYouKnowAboutCourse}
                    />
                    {whatDoYouKnowAboutCourseNull ? (
                      <p style={{ color: 'red', fontStyle: 'italic' }}>
                        This Field is required
                      </p>
                    ) : null}
                  </Form.Group>
                </div>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <div className="flex-width ">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>
                        Are you changing your area of study from previous
                        studies or work experience?
                        <span className="mandate">*</span>
                      </Form.Label>
                      <Form.Check
                        inline
                        label="Yes"
                        name="changingAreaOfStudy"
                        className="radio-input"
                        value="Yes"
                        type="radio"
                        onChange={(e) => {
                          setChangingAreaOfStudy(e.target.value);
                        }}
                        checked={changingAreaOfStudy === 'Yes' ? true : false}
                      />
                      <Form.Check
                        inline
                        label="No"
                        name="changingAreaOfStudy"
                        className="radio-input"
                        value="No"
                        type="radio"
                        onChange={(e) => {
                          setChangingAreaOfStudy(e.target.value);
                        }}
                        checked={changingAreaOfStudy === 'No' ? true : false}
                      />
                    </Form.Group>
                  </div>
                  {changingAreaOfStudy === 'Yes' && (
                    <div className="flex-width">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className="complainet-p">
                          please explain why you have chosen to change:
                          <span className="mandate">*</span>
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          onChange={handleChange}
                          name="explainWhyChoosenToChange"
                          value={formData.explainWhyChoosenToChange}
                        />
                      </Form.Group>
                    </div>
                  )}
                  {explainWhyChoosenToChangeNull ? (
                    <p style={{ color: 'red', fontStyle: 'italic' }}>
                      This Field is required
                    </p>
                  ) : null}
                </Form.Group>
                <div className="flex-width">
                  <button onClick={handleChangePageBack0}>Back</button>
                  <button onClick={handleChangePage0}>Next</button>
                </div>
              </Form>
            </div>
          </>
        )}
        {changePageState2 && (
          <>
            <h5 className="form-p">SECTION 2 – ENGLISH LANGUAGE</h5>
            <p className="sub-p">
              To meet GTE requirements, you will need to prove that you have
              sufficient level of English language proficiency to be able to
              complete the chosen courses of study successfully. You can prove
              this by proving evidence of:
              <ul>
                <li>
                  IELTS score of overall 6.0 (with no band less than 5.5) or
                  equivalent score from another acceptable English language
                  proficiency test or ELICOS (English Language Intensive Courses
                  for Overseas Students) course provider. (Refer to English
                  Proficiency Equivalence Table)
                </li>
                <li>
                  Evident that you are enrolling in an ELICOS program before
                  commencing course at Signet Institute of Australia.
                </li>
                <li>
                  Successful completion of the Senior Secondary Certificate of
                  Education in Australia within the last two years
                </li>
                <li>
                  Substantial component (75% or more units completed) of a
                  course leading to an AQF qualification at the Certificate IV
                  or higher level in the English language in Australia within
                  the last two years.
                </li>
                <li>
                  Successful completion of at least five years’ study (including
                  year 12 or equivalent) in one or more of the following
                  countries: Australia, Canada, New Zealand, South Africa, the
                  Republic of Ireland, UK and USA.
                </li>
              </ul>
            </p>
            <div className="form-parent">
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <div className="flex-width ">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>
                        Have you provided a certified copy of the evidence of
                        one or more of the above?
                        <span className="mandate">*</span>
                      </Form.Label>
                      <Form.Check
                        inline
                        label="Yes"
                        name="providedCertifiedCopyOfEvidence"
                        className="radio-input"
                        value="Yes"
                        type="radio"
                        onChange={(e) => {
                          setProvidedCertifiedCopyOfEvidence(e.target.value);
                        }}
                        checked={
                          providedCertifiedCopyOfEvidence === 'Yes'
                            ? true
                            : false
                        }
                      />
                      <Form.Check
                        inline
                        label="No"
                        name="providedCertifiedCopyOfEvidence"
                        className="radio-input"
                        value="No"
                        type="radio"
                        onChange={(e) => {
                          setProvidedCertifiedCopyOfEvidence(e.target.value);
                        }}
                        checked={
                          providedCertifiedCopyOfEvidence === 'No'
                            ? true
                            : false
                        }
                      />
                    </Form.Group>
                  </div>
                  {providedCertifiedCopyOfEvidence === 'No' && (
                    <div className="flex-width">
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label className="complainet-p">
                          please explain why:
                          <span className="mandate">*</span>
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          onChange={handleChange}
                          name="providedCertifiedExplainWhy"
                          value={formData.providedCertifiedExplainWhy}
                        />
                      </Form.Group>
                    </div>
                  )}
                  {providedCertifiedExplainWhyNull ? (
                    <p style={{ color: 'red', fontStyle: 'italic' }}>
                      This Field is required
                    </p>
                  ) : null}
                </Form.Group>
                <div className="flex-width">
                  <button onClick={handleChangePageBack1}>Back</button>
                  <button onClick={handleChangePage1}>Next</button>
                </div>
              </Form>
            </div>
          </>
        )}
        {changePageState3 && (
          <>
            <h5 className="form-p">SECTION 3 - FINANCE</h5>
            <p className="sub-p">
              Please demonstrate that you are aware of the funds that you need
              to have access to for the first year of your study in Signet
              Institute of Australia are as follows:
            </p>
            <div className="form-parent">
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Course Fee</Form.Label>
                  <table className="gte-table">
                    <tr className="gte-table">
                      <th></th>
                      <th>Cost per person (AUD)</th>
                      <th>Number of People</th>
                      <th>Total Cost (AUD)</th>
                    </tr>
                    <tr className="gte-table">
                      <td className="gte-table">First year course fee</td>
                      <td className="gte-table">
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          name="firstYearCostperPerson"
                          className="dob-input"
                          value={formData.firstYearCostperPerson}
                        />
                      </td>
                      <td className="gte-table">
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          name="firstYearNumberOfPeople"
                          className="dob-input"
                          value={formData.firstYearNumberOfPeople}
                        />
                      </td>
                      <td className="gte-table">
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          name="firstYearTotalCost"
                          className="dob-input"
                          value={formData.firstYearTotalCost}
                        />
                      </td>
                    </tr>
                  </table>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Living Costs (12 months)</Form.Label>
                  <table className="gte-table">
                    <tr className="gte-table">
                      <th></th>
                      <th>Cost per person (AUD)</th>
                      <th>Number of People</th>
                      <th>Total Cost (AUD)</th>
                    </tr>
                    <tr className="gte-table">
                      <td className="gte-table">Applicant</td>
                      <td className="gte-table">
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          name="applicantCostperPerson"
                          className="dob-input"
                          value={formData.applicantCostperPerson}
                        />
                      </td>
                      <td className="gte-table">
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          name="applicantNumberOfPeople"
                          className="dob-input"
                          value={formData.applicantNumberOfPeople}
                        />
                      </td>
                      <td className="gte-table">
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          name="applicantTotalCost"
                          className="dob-input"
                          value={formData.applicantTotalCost}
                        />
                      </td>
                    </tr>
                    <tr className="gte-table">
                      <td className="gte-table">Partner / Spouse</td>
                      <td className="gte-table">
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          name="partnerCostperPerson"
                          className="dob-input"
                          value={formData.partnerCostperPerson}
                        />
                      </td>
                      <td className="gte-table">
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          name="partnerNumberOfPeople"
                          className="dob-input"
                          value={formData.partnerNumberOfPeople}
                        />
                      </td>
                      <td className="gte-table">
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          name="partnerTotalCost"
                          className="dob-input"
                          value={formData.partnerTotalCost}
                        />
                      </td>
                    </tr>
                    <tr className="gte-table">
                      <td className="gte-table">Each dependent child</td>
                      <td className="gte-table">
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          name="childCostperPerson"
                          className="dob-input"
                          value={formData.childCostperPerson}
                        />
                      </td>
                      <td className="gte-table">
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          name="childNumberOfPeople"
                          className="dob-input"
                          value={formData.childNumberOfPeople}
                        />
                      </td>
                      <td className="gte-table">
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          name="childTotalCost"
                          className="dob-input"
                          value={formData.childTotalCost}
                        />
                      </td>
                    </tr>
                  </table>
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Travel Expenses</Form.Label>
                  <table className="gte-table">
                    <tr className="gte-table">
                      <th></th>
                      <th>Cost per person (AUD)</th>
                      <th>Number of People</th>
                      <th>Total Cost (AUD)</th>
                    </tr>
                    <tr className="gte-table">
                      <td className="gte-table">Airfares / Return Tickets</td>
                      <td className="gte-table">
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          name="airfaresCostperPerson"
                          className="dob-input"
                          value={formData.airfaresCostperPerson}
                        />
                      </td>
                      <td className="gte-table">
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          name="airfaresNumberOfPeople"
                          className="dob-input"
                          value={formData.airfaresNumberOfPeople}
                        />
                      </td>
                      <td className="gte-table">
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          name="airfaresTotalCost"
                          className="dob-input"
                          value={formData.airfaresTotalCost}
                        />
                      </td>
                    </tr>
                  </table>
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Anticipated Total Costs</Form.Label>
                  <table className="gte-table">
                    <tr className="gte-table">
                      <th></th>
                      <th>Cost per person (AUD)</th>
                      <th>Number of People</th>
                      <th>Total Cost (AUD)</th>
                    </tr>
                    <tr className="gte-table">
                      <td className="gte-table">Anticipated Total Costs</td>
                      <td className="gte-table">
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          name="anticipatedCostperPerson"
                          className="dob-input"
                          value={formData.anticipatedCostperPerson}
                        />
                      </td>
                      <td className="gte-table">
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          name="anticipatedNumberOfPeople"
                          className="dob-input"
                          value={formData.anticipatedNumberOfPeople}
                        />
                      </td>
                      <td className="gte-table">
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          name="anticipatedTotalCost"
                          className="dob-input"
                          value={formData.anticipatedTotalCost}
                        />
                      </td>
                    </tr>
                  </table>
                </Form.Group>
                <h5 className="form-p">Evidence of Funds</h5>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Living Costs (12 months)</Form.Label>

                  <table>
                    <tr className="gte-table">
                      <th className="gte-table"></th>
                      <th className="gte-table">
                        Provide details of the source (Example: Bank
                        Name/Branch)
                      </th>
                      <th className="gte-table">
                        Certified copies of Proof of Funds (Examples: Bank
                        statements, loan documents, scholarship letter)
                      </th>
                    </tr>
                    <tr className="gte-table">
                      <td className="gte-table">Self</td>
                      <td className="gte-table">
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          name="selfProvide"
                          className="dob-input"
                          value={formData.selfProvide}
                        />
                      </td>
                      <td className="gte-table">
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          name="selfCertified"
                          className="dob-input"
                          value={formData.selfCertified}
                        />
                      </td>
                    </tr>
                    <tr className="gte-table">
                      <td className="gte-table">Sponsor</td>
                      <td className="gte-table">
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          name="sponserProvide"
                          className="dob-input"
                          value={formData.sponserProvide}
                        />
                      </td>
                      <td className="gte-table">
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          name="sponcerCertified"
                          className="dob-input"
                          value={formData.sponcerCertified}
                        />
                      </td>
                    </tr>
                    <tr className="gte-table">
                      <td className="gte-table">Loan</td>
                      <td className="gte-table">
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          name="loanProvide"
                          className="dob-input"
                          value={formData.loanProvide}
                        />
                      </td>
                      <td className="gte-table">
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          name="loanCertified"
                          className="dob-input"
                          value={formData.loanCertified}
                        />
                      </td>
                    </tr>
                    <tr className="gte-table">
                      <td className="gte-table">Other – specify</td>
                      <td className="gte-table">
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          name="otherProvide"
                          className="dob-input"
                          value={formData.otherProvide}
                        />
                      </td>
                      <td className="gte-table">
                        <Form.Control
                          type="text"
                          onChange={handleChange}
                          name="otherCertified"
                          className="dob-input"
                          value={formData.otherCertified}
                        />
                      </td>
                    </tr>
                  </table>
                </Form.Group>
                <p className="sub-p">
                  <strong>Notes:</strong> You must provide evidence of the
                  relationship between yourself and the person who is supplying
                  your funds; example: Birth Certificate.
                </p>
                <div className="flex-width">
                  <button onClick={handleChangePageBack2}>Back</button>
                  <button onClick={handleChangePage2}>Next</button>
                </div>
              </Form>
            </div>
          </>
        )}
        {changePageState4 && (
          <>
            <h5 className="form-p">SECTION 4 - OTHER</h5>
            <p className="sub-p">
              Please demonstrate that you are aware of the funds that you need
              to have access to for the first year of your study in Signet
              Institute of Australia are as follows:
            </p>
            <div className="form-parent">
              <Form>
                <div className="flex-width">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label className="complainet-p">
                      Please indicate any additional information that can be
                      used to verify that you are genuine temporary entrant
                      (genuine student).
                      <span className="mandate">*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      onChange={handleChange}
                      name="genuineStudent"
                      value={formData.genuineStudent}
                    />
                    {genuineStudentNull ? (
                      <p style={{ color: 'red', fontStyle: 'italic' }}>
                        This Field is required
                      </p>
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
                        Please attach evidence (if applicable).
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
                    </Form.Group>
                  </div>
                </div>
                <h5 className="form-p">STUDENT DECLARATION</h5>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    Full Name:<span className="mandate">*</span>
                  </Form.Label>
                  <div className="d-flex gte-name-align">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Select
                        aria-label="Default select example"
                        onChange={handleChange}
                        name="declarationPrefix"
                        value={formData.declarationPrefix}
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
                        name="declarationFirstName"
                        value={formData.declarationFirstName}
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
                        name="declarationMiddleName"
                        value={formData.declarationMiddleName}
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
                        name="declarationLastName"
                        value={formData.declarationLastName}
                      />
                      <p className="input-p">Last Name</p>
                    </Form.Group>
                  </div>
                  {declarationNameError ? (
                    <p style={{ color: 'red', fontStyle: 'italic' }}>
                      First Name and Last Name should contain only alphabets
                    </p>
                  ) : null}
                  {declarationNameNull ? (
                    <p style={{ color: 'red', fontStyle: 'italic' }}>
                      Please enter First Name and Last Name
                    </p>
                  ) : null}
                </Form.Group>
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
                    Date:<span className="mandate">*</span>
                  </Form.Label>
                  <br />
                  <Form.Control
                    type="date"
                    onChange={handleChange}
                    name="declarationDate"
                    className="dob-input"
                    value={formData.declarationDate}
                  />
                  {declarationDateNull ? (
                    <p style={{ color: 'red', fontStyle: 'italic' }}>
                      Please select DOB
                    </p>
                  ) : null}
                </Form.Group>
                <div className="flex-width">
                  <button onClick={handleChangePageBack}>Back</button>
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

export default GTEForm;
