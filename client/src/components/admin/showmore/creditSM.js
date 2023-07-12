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

const CreditSM = () => {
  const slug = useParams();
  const slugURL = slug.id;
  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);
  const [showData, setShowData] = useState(false);
  const [userData, setUserData] = useState();
  const [newAr, setNewArr] = useState('');
  const [newAr2, setNewArr2] = useState('');

  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);

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
                  `${process.env.REACT_APP_BACKEND_LINK}/admin/ctf/${slugURL}`
                )
                .then((result) => {
                  if (result.data.Status === 'Success') {
                    if (result.data.result === null) {
                      setShowData(false);
                      alert('No Data found');
                    } else {
                      setShowData(true);
                      setUserData(result.data.result);
                      const newArr = result.data.result.unitCode;
                      const newArrComma = newArr.join(', ');
                      setNewArr(newArrComma);

                      const newArr2 = result.data.result.unitTitle;
                      const newArr2Comma = newArr2.join(', ');
                      setNewArr2(newArr2Comma);
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
                    <h1 className="heading">Credit Transfer Application</h1>
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
                        <Table.Cell>TELEPHONE</Table.Cell>
                        <Table.Cell>
                          {userData.tel.telCode} {userData.tel.telephone}
                        </Table.Cell>
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
                        <Table.Cell>ALT EMAIL</Table.Cell>
                        <Table.Cell>{userData.altEmail}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>ID TYPE</Table.Cell>
                        <Table.Cell>{userData.typeOfId}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>ID NUMBER</Table.Cell>
                        <Table.Cell>{userData.idNumber}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          ADDRESS
                        </Table.Cell>
                        <Table.Cell></Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BUILDING
                          NAME
                        </Table.Cell>
                        <Table.Cell>{userData.address.buildingName}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;STREET
                        </Table.Cell>
                        <Table.Cell>{userData.address.street}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TOWN
                        </Table.Cell>
                        <Table.Cell>{userData.address.town}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;STATE
                        </Table.Cell>
                        <Table.Cell>{userData.address.state}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POST
                          CODE
                        </Table.Cell>
                        <Table.Cell>{userData.address.postCode}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;COUNTRY
                        </Table.Cell>
                        <Table.Cell>{userData.address.country}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="sub-title">
                          COURSE CODE AND TITLE
                        </Table.Cell>
                        <Table.Cell>{userData.courseCodeTitle}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="sub-title">
                          NAME OF THE COLLEGE THAT ISSUED QUALIFICATION
                        </Table.Cell>
                        <Table.Cell>{userData.statementOfAttenment}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="sub-title">
                          OFFICIAL CERTIFICATE
                        </Table.Cell>
                        <Table.Cell>{userData.officialCertificate}</Table.Cell>
                      </Table.Row>
                      {userData.officialCertificate === 'Yes' && (
                        <Table.Row>
                          <Table.Cell className="sub-title">
                            CERTIFICATE UPLOADED
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
                        <Table.Cell className="sub-title">
                          OFFICIAL TRANSCRIPT
                        </Table.Cell>
                        <Table.Cell>{userData.officialTranscript}</Table.Cell>
                      </Table.Row>
                      {userData.officialTranscript === 'Yes' && (
                        <Table.Row>
                          <Table.Cell className="sub-title">
                            TRANSCRIPT UPLOADED
                          </Table.Cell>
                          <Table.Cell>
                            <IconButton onClick={() => setModalShow2(true)}>
                              <EyeIcon size={20} fill="#979797" />
                            </IconButton>
                            <ImageLinkModal2
                              show={modalShow2}
                              link={userData.signatureImage2}
                              onHide={() => setModalShow2(false)}
                            />
                          </Table.Cell>
                        </Table.Row>
                      )}
                      <Table.Row>
                        <Table.Cell className="sub-title">
                          HEAD OF COMPLIANCE
                        </Table.Cell>
                        <Table.Cell>{userData.headOfCompliance}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="sub-title">
                          EXPLANATION OF DECISION
                        </Table.Cell>
                        <Table.Cell>
                          {userData.explanationOfDecision}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>STUDENT SIGNATURE</Table.Cell>
                        <Table.Cell>
                          <a
                            href={`${process.env.REACT_APP_IMAGE_URL}${userData.sign[0]}`}
                          >
                            Signature
                          </a>
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="sub-title">DATE</Table.Cell>
                        <Table.Cell>{userData.courseSectionDate}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>UNIT CODE</Table.Cell>
                        <Table.Cell>{newAr}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>UNIT TITLE</Table.Cell>
                        <Table.Cell>{newAr2}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>SIGNET INSTITUTE REPRESENTATIVE</Table.Cell>
                        <Table.Cell></Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          {' '}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FIRST
                          NAME
                        </Table.Cell>
                        <Table.Cell>{userData.repFirstName}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LAST
                          NAME
                        </Table.Cell>
                        <Table.Cell>{userData.repLastName}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>DATE</Table.Cell>
                        <Table.Cell>{userData.unitsDate}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>ADMINISTRATIVE RECORDS</Table.Cell>
                        <Table.Cell></Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;STUDENT
                          ADVISED IN WRITING
                        </Table.Cell>
                        {userData.studentAdvisedInWriting === 'true' ? (
                          <Table.Cell>YES</Table.Cell>
                        ) : (
                          <Table.Cell>NO</Table.Cell>
                        )}
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CT
                          RECORDED IN SMS
                        </Table.Cell>
                        {userData.ctRecordedInSms === 'true' ? (
                          <Table.Cell>YES</Table.Cell>
                        ) : (
                          <Table.Cell>NO</Table.Cell>
                        )}
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;APPLICATION
                          CLOSED
                        </Table.Cell>
                        {userData.applicationClosed === 'true' ? (
                          <Table.Cell>YES</Table.Cell>
                        ) : (
                          <Table.Cell>NO</Table.Cell>
                        )}
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>INITIALS</Table.Cell>
                        <Table.Cell>{userData.initials}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>DATE</Table.Cell>
                        <Table.Cell>{userData.initialsDate}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>ADMINISTRATIVE OFFICER</Table.Cell>
                        <Table.Cell></Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          {' '}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FIRST
                          NAME
                        </Table.Cell>
                        <Table.Cell>{userData.adminFirstName}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LAST
                          NAME
                        </Table.Cell>
                        <Table.Cell>{userData.adminLastName}</Table.Cell>
                      </Table.Row>
                      {userData.adminSign.length > 0 && (
                        <Table.Row>
                          <Table.Cell>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ADMINSTRATOR
                            SIGNATURE
                          </Table.Cell>
                          <Table.Cell>
                            <a
                              href={`${process.env.REACT_APP_IMAGE_URL}${userData.adminSign[0]}`}
                            >
                              Signature
                            </a>
                          </Table.Cell>
                        </Table.Row>
                      )}
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DATE
                        </Table.Cell>
                        <Table.Cell>{userData.adminDate}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>CAMPUS MANAGER</Table.Cell>
                        <Table.Cell></Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          {' '}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FIRST
                          NAME
                        </Table.Cell>
                        <Table.Cell>{userData.managerFirstName}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LAST
                          NAME
                        </Table.Cell>
                        <Table.Cell>{userData.managerLastName}</Table.Cell>
                      </Table.Row>
                      {userData.campusSign.length > 0 && (
                        <Table.Row>
                          <Table.Cell>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CAMPUS
                            MANAGER SIGNATURE
                          </Table.Cell>
                          <Table.Cell>
                            <a
                              href={`${process.env.REACT_APP_IMAGE_URL}${userData.campusSign[0]}`}
                            >
                              Signature
                            </a>
                          </Table.Cell>
                        </Table.Row>
                      )}
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DATE
                        </Table.Cell>
                        <Table.Cell>{userData.managerDate}</Table.Cell>
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

export default CreditSM;
