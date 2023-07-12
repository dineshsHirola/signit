import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SideBar from '../common/SideBar';
import Container from 'react-bootstrap/Container';
import { Table } from '@nextui-org/react';
import { IconButton } from '../common/IconButton';
import { EyeIcon } from '../common/EyeIcon';
import { ImageLinkModal2, PopModal, PopModal2 } from '../common/modal';
import Cookies from 'js-cookie';

const CancelSM = () => {
  const slug = useParams();
  const slugURL = slug.id;
  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);
  const [showData, setShowData] = useState(false);
  const [userData, setUserData] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);
  const [modalShow4, setModalShow4] = useState(false);

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
                  `${process.env.REACT_APP_BACKEND_LINK}/admin/cef/${slugURL}`
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
                    <h1 className="heading">
                      Application To Cancel Enrolment Data
                    </h1>
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
                        <Table.Cell>COURSE NAME</Table.Cell>
                        <Table.Cell>{userData.courseName}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>COURSE CODE</Table.Cell>
                        <Table.Cell>{userData.courseCode}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>COURSE/QUALIFICATION NAME</Table.Cell>
                        <Table.Cell>{userData.qualName}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>COURSE/QUALIFICATION CODE</Table.Cell>
                        <Table.Cell>{userData.qualCode}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          DETAILS OF WHEN TO CANCEL ENROLLMENT
                        </Table.Cell>
                        <Table.Cell>
                          <IconButton onClick={() => setModalShow(true)}>
                            <EyeIcon size={20} fill="#979797" />
                          </IconButton>
                          <PopModal
                            show={modalShow}
                            reason={userData.detail}
                            onHide={() => setModalShow(false)}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>DATE EFFECTIVE FROM</Table.Cell>
                        <Table.Cell>{userData.date}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>REASONS FOR REQUEST</Table.Cell>
                        <Table.Cell>
                          <IconButton onClick={() => setModalShow2(true)}>
                            <EyeIcon size={20} fill="#979797" />
                          </IconButton>
                          <PopModal2
                            show={modalShow2}
                            reason={userData.reason}
                            onHide={() => setModalShow2(false)}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>SUPPORTING DOCUMENT</Table.Cell>
                        <Table.Cell>
                          <IconButton onClick={() => setModalShow3(true)}>
                            <EyeIcon size={20} fill="#979797" />
                          </IconButton>
                          <ImageLinkModal2
                            show={modalShow3}
                            link={userData.image}
                            onHide={() => setModalShow3(false)}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>INTERNATIONAL STUDENT ?</Table.Cell>
                        <Table.Cell>{userData.intStudent}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>REASONS FOR RELEASE REQUEST</Table.Cell>
                        <Table.Cell>
                          {userData.reasonsForReleaseRequest}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SUPPORTING
                          DOCUMENTS
                        </Table.Cell>
                        <Table.Cell>
                          <IconButton onClick={() => setModalShow4(true)}>
                            <EyeIcon size={20} fill="#979797" />
                          </IconButton>
                          <ImageLinkModal2
                            show={modalShow4}
                            link={userData.image2}
                            onHide={() => setModalShow4(false)}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>STUDENT DECLARATION</Table.Cell>
                        <Table.Cell></Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;STUDENT
                          NAME
                        </Table.Cell>
                        <Table.Cell></Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PREFIX
                        </Table.Cell>
                        <Table.Cell>{userData.intPrefix}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FIRST
                          NAME
                        </Table.Cell>
                        <Table.Cell>{userData.intFirstName}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MIDDLE
                          NAME
                        </Table.Cell>
                        <Table.Cell>{userData.intMiddleName}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LAST
                          NAME
                        </Table.Cell>
                        <Table.Cell>{userData.intLastName}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DATE
                        </Table.Cell>
                        <Table.Cell>{userData.intDate}</Table.Cell>
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

export default CancelSM;
