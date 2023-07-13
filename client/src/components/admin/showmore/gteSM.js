import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '../common/SideBar';
import Container from 'react-bootstrap/Container';
import { Table } from '@nextui-org/react';
import Cookies from 'js-cookie';
import { ImageLinkModal2 } from '../common/modal';
import { IconButton } from '../common/IconButton';
import { EyeIcon } from '../common/EyeIcon';

const GteSM = () => {
  const slug = useParams();
  const slugURL = slug.id;
  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);
  const [showData, setShowData] = useState(false);
  const [userData, setUserData] = useState();

  const [modalShow, setModalShow] = useState(false);

  axios.defaults.withCredentials = true;

  const fetchAPI2 = async (url) => {
    const cookie = Cookies.get('signetAdmintoken');
    try {
      await axios
        .post(url, { cookie: cookie })
        .then((result) => {
          if (result.data.Status === 'Success') {
            setAuth(true);
            try {
              axios
                .get(
                  `${process.env.REACT_APP_BACKEND_LINK}/admin/gtef/${slugURL}`
                )
                .then((result) => {
                  if (result.data.Status === 'Success') {
                    if (result.data.result === null) {
                      setShowData(false);
                      alert('No Data found');
                    } else {
                      setShowData(true);
                      setUserData(result.data.result);
                    }
                  } else {
                    navigate('/admin/login');
                  }
                })
                .catch((e) => {
                  console.log('axios', e);
                });
            } catch (e) {
              console.log(e);
            }
          } else {
            setAuth(false);
            navigate('/admin/login');
          }
        })
        .catch((e) => {
          console.log('axios', e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const API2 = `${process.env.REACT_APP_BACKEND_LINK}/admin/authControll`;
    fetchAPI2(API2);
  }, []);

  return (
    <>
      {auth && (
        <>
          {showData ? (
            <div className="flex-div">
              <SideBar />
              <div className="main-div">
                <Container>
                  <div className="headflex">
                    <h1 className="heading">GTE Form</h1>
                  </div>
                  <Table
                    aria-label="Example table with static content"
                    css={{
                      height: 'auto',
                      minWidth: '100%',
                    }}
                    selectionMode="single"
                  >
                    <Table.Header>
                      <Table.Column>NAME</Table.Column>
                      <Table.Column>DETAILS</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>STUDENT REFERENCE</Table.Cell>
                        <Table.Cell>{userData.ref}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="sub-title">NAME</Table.Cell>
                        <Table.Cell></Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PREFIX
                        </Table.Cell>
                        <Table.Cell>{userData.name.prefix}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FIRST
                          NAME
                        </Table.Cell>
                        <Table.Cell>{userData.name.firstName}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MIDDLE
                          NAME
                        </Table.Cell>
                        <Table.Cell>{userData.name.middleName}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LAST
                          NAME
                        </Table.Cell>
                        <Table.Cell>{userData.name.lastName}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>DOB</Table.Cell>
                        <Table.Cell>{userData.dob}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>GENDER</Table.Cell>
                        <Table.Cell>{userData.gender}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>MOBILE</Table.Cell>
                        <Table.Cell>
                          {userData.mob.mobCode} {userData.mob.mobile}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>EMAIL</Table.Cell>
                        <Table.Cell>{userData.email}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          CHANGING AREA OF STUDY FROM PREVIOUS STUDIES/WORK
                          EXPREIENCE?
                        </Table.Cell>
                        <Table.Cell>{userData.changingAreaOfStudy}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          PROVIDED CERTIFICATE COPY OF EVIDENCE?
                        </Table.Cell>
                        <Table.Cell>
                          {userData.providedCertifiedCopyOfEvidence}
                        </Table.Cell>
                      </Table.Row>
                      {userData.signatureImage && (
                        <Table.Row>
                          <Table.Cell>
                            Please attach evidence (if applicable).
                          </Table.Cell>
                          <Table.Cell>
                            <IconButton onClick={() => setModalShow(true)}>
                              <EyeIcon size={20} fill="#979797" />
                            </IconButton>
                            <ImageLinkModal2
                              show={modalShow}
                              link={userData.signatureImage}
                              onHide={() => setModalShow(false)}
                            />
                          </Table.Cell>
                        </Table.Row>
                      )}
                      <Table.Row>
                        <Table.Cell>SIGNATURE</Table.Cell>
                        <Table.Cell>
                          <a
                            href={`${process.env.REACT_APP_IMAGE_URL}${userData.sign[0]}`}
                          >
                            Signature
                          </a>
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                  {userData.changingAreaOfStudy === 'Yes' && (
                    <Table
                      aria-label="Example table with static content"
                      css={{
                        height: 'auto',
                        minWidth: '100%',
                      }}
                      selectionMode="single"
                    >
                      <Table.Header>
                        <Table.Column>
                          please explain why you have chosen to change:
                        </Table.Column>
                      </Table.Header>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            {userData.explainWhyChoosenToChange}
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  )}
                  {userData.providedCertifiedCopyOfEvidence === 'No' && (
                    <Table
                      aria-label="Example table with static content"
                      css={{
                        height: 'auto',
                        minWidth: '100%',
                      }}
                      selectionMode="single"
                    >
                      <Table.Header>
                        <Table.Column>please explain why:</Table.Column>
                      </Table.Header>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            {userData.providedCertifiedExplainWhy}
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  )}
                  <Table
                    aria-label="Example table with static content"
                    css={{
                      height: 'auto',
                      minWidth: '100%',
                    }}
                    selectionMode="single"
                  >
                    <Table.Header>
                      <Table.Column>
                        Why are you choosing not to study in your home country?
                      </Table.Column>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          {userData.choosingNotToStudyInYourHomeCountry}
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                  <Table
                    aria-label="Example table with static content"
                    css={{
                      height: 'auto',
                      minWidth: '100%',
                    }}
                    selectionMode="single"
                  >
                    <Table.Header>
                      <Table.Column>
                        Why have you chosen to study in Australia over other
                        countries? Please provide evidence for your research
                        such as website links?
                      </Table.Column>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          {userData.whyChoosenToStudyInAustralia}
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                  <Table
                    aria-label="Example table with static content"
                    css={{
                      height: 'auto',
                      minWidth: '100%',
                    }}
                    selectionMode="single"
                  >
                    <Table.Header>
                      <Table.Column>
                        Why have you chosen to study at Signet Institute of
                        Australia over other providers in Australia? Please
                        provide evidence for your research such as website links
                        for at least one provider within Australia.
                      </Table.Column>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          {userData.whyChoosenToStudyInSignit}
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                  <Table
                    aria-label="Example table with static content"
                    css={{
                      height: 'auto',
                      minWidth: '100%',
                    }}
                    selectionMode="single"
                  >
                    <Table.Header>
                      <Table.Column>
                        What do you know about the course content, course
                        structure, delivery modes and academic standards and
                        attendance requirements for the courses that you have
                        chosen to undertake at Signet Institute of Australia?
                      </Table.Column>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>
                          {userData.whatDoYouKnowAboutCourse}
                        </Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                  <Table
                    aria-label="Example table with static content"
                    css={{
                      height: 'auto',
                      minWidth: '100%',
                    }}
                    selectionMode="single"
                  >
                    <Table.Header>
                      <Table.Column>COURSE FEE</Table.Column>
                      <Table.Column>COST PER PERSON (AUD)</Table.Column>
                      <Table.Column>NUMBER OF PEOPLE</Table.Column>
                      <Table.Column>TOTAL Cost (AUD)</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>First year course fee</Table.Cell>
                        <Table.Cell>
                          {userData.firstYearCostperPerson}
                        </Table.Cell>
                        <Table.Cell>
                          {userData.firstYearNumberOfPeople}
                        </Table.Cell>
                        <Table.Cell>{userData.firstYearTotalCost}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                  <Table
                    aria-label="Example table with static content"
                    css={{
                      height: 'auto',
                      minWidth: '100%',
                    }}
                    selectionMode="single"
                  >
                    <Table.Header>
                      <Table.Column>LIVING COSTS (12 MONTHS)</Table.Column>
                      <Table.Column>COST PER PERSON (AUD)</Table.Column>
                      <Table.Column>NUMBER OF PEOPLE</Table.Column>
                      <Table.Column>TOTAL Cost (AUD)</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>Applicant</Table.Cell>
                        <Table.Cell>
                          {userData.applicantCostperPerson}
                        </Table.Cell>
                        <Table.Cell>
                          {userData.applicantNumberOfPeople}
                        </Table.Cell>
                        <Table.Cell>{userData.applicantTotalCost}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Partner / Spouse</Table.Cell>
                        <Table.Cell>{userData.partnerCostperPerson}</Table.Cell>
                        <Table.Cell>
                          {userData.partnerNumberOfPeople}
                        </Table.Cell>
                        <Table.Cell>{userData.partnerTotalCost}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Each dependent child</Table.Cell>
                        <Table.Cell>{userData.childCostperPerson}</Table.Cell>
                        <Table.Cell>{userData.childNumberOfPeople}</Table.Cell>
                        <Table.Cell>{userData.childTotalCost}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                  <Table
                    aria-label="Example table with static content"
                    css={{
                      height: 'auto',
                      minWidth: '100%',
                    }}
                    selectionMode="single"
                  >
                    <Table.Header>
                      <Table.Column>TRAVEL EXPENSES</Table.Column>
                      <Table.Column>COST PER PERSON (AUD)</Table.Column>
                      <Table.Column>NUMBER OF PEOPLE</Table.Column>
                      <Table.Column>TOTAL Cost (AUD)</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>Airfares / Return Tickets</Table.Cell>
                        <Table.Cell>
                          {userData.airfaresCostperPerson}
                        </Table.Cell>
                        <Table.Cell>
                          {userData.airfaresNumberOfPeople}
                        </Table.Cell>
                        <Table.Cell>{userData.airfaresTotalCost}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                  <Table
                    aria-label="Example table with static content"
                    css={{
                      height: 'auto',
                      minWidth: '100%',
                    }}
                    selectionMode="single"
                  >
                    <Table.Header>
                      <Table.Column>ANTICIPATED TOTAL COSTS</Table.Column>
                      <Table.Column>COST PER PERSON (AUD)</Table.Column>
                      <Table.Column>NUMBER OF PEOPLE</Table.Column>
                      <Table.Column>TOTAL Cost (AUD)</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>Anticipated Total Costs</Table.Cell>
                        <Table.Cell>
                          {userData.anticipatedCostperPerson}
                        </Table.Cell>
                        <Table.Cell>
                          {userData.anticipatedNumberOfPeople}
                        </Table.Cell>
                        <Table.Cell>{userData.anticipatedTotalCost}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                  <p className="tablesub-p">Evidence Of Funds</p>
                  <Table
                    aria-label="Example table with static content"
                    css={{
                      height: 'auto',
                      minWidth: '100%',
                    }}
                    selectionMode="single"
                  >
                    <Table.Header>
                      <Table.Column>LIVING COSTS (12 MONTHS)</Table.Column>
                      <Table.Column>
                        PROVIDE DETAILS OF THE SOURCE(EXAMPLE: BANK NAME/BRANCH)
                      </Table.Column>
                      <Table.Column>
                        CERTIFIED COPIES OF PROOF OF FUNDS(EXAMPLE: BANK
                        STATEMENTS, LOAD DOCUMENTS, SCHOLARSHIP LETTER)
                      </Table.Column>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>Self</Table.Cell>
                        <Table.Cell>{userData.selfProvide}</Table.Cell>
                        <Table.Cell>{userData.selfCertified}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Sponsor</Table.Cell>
                        <Table.Cell>{userData.sponserProvide}</Table.Cell>
                        <Table.Cell>{userData.sponcerCertified}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Loan</Table.Cell>
                        <Table.Cell>{userData.loanProvide}</Table.Cell>
                        <Table.Cell>{userData.loanCertified}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Other – specify</Table.Cell>
                        <Table.Cell>{userData.otherProvide}</Table.Cell>
                        <Table.Cell>{userData.otherCertified}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                  <Table
                    aria-label="Example table with static content"
                    css={{
                      height: 'auto',
                      minWidth: '100%',
                    }}
                    selectionMode="single"
                  >
                    <Table.Header>
                      <Table.Column>
                        Please indicate any additional information that can be
                        used to verify that you are genuine temporary entrant
                        (genuine student).
                      </Table.Column>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell>{userData.genuineStudent}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                  <p className="tablesub-p">Student Declaration</p>
                  <Table
                    aria-label="Example table with static content"
                    css={{
                      height: 'auto',
                      minWidth: '100%',
                    }}
                    selectionMode="single"
                  >
                    <Table.Header>
                      <Table.Column>NAME</Table.Column>
                      <Table.Column>DETAIL</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell className="sub-title">FULL NAME</Table.Cell>
                        <Table.Cell></Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PREFIX
                        </Table.Cell>
                        <Table.Cell>{userData.declarationPrefix}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FIRST
                          NAME
                        </Table.Cell>
                        <Table.Cell>{userData.declarationFirstName}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MIDDLE
                          NAME
                        </Table.Cell>
                        <Table.Cell>
                          {userData.declarationMiddleName}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LAST
                          NAME
                        </Table.Cell>
                        <Table.Cell>{userData.declarationLastName}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>DATA</Table.Cell>
                        <Table.Cell>{userData.declarationDate}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Container>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </>
      )}
    </>
  );
};

export default GteSM;
