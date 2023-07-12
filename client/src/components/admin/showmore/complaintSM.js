import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '../common/SideBar';
import Container from 'react-bootstrap/Container';
import { Table } from '@nextui-org/react';
import { IconButton } from '../common/IconButton';
import { EyeIcon } from '../common/EyeIcon';
import { PopModal, PopModal2 } from '../common/modal';
import Cookies from 'js-cookie';

const ComplaintSM = () => {
  const slug = useParams();
  const slugURL = slug.id;
  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);
  const [showData, setShowData] = useState(false);
  const [userData, setUserData] = useState();
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
                  `${process.env.REACT_APP_BACKEND_LINK}/admin/cf/${slugURL}`
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
                    <h1 className="heading">Complaint Form</h1>
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
                        <Table.Cell>COURSE NAME</Table.Cell>
                        <Table.Cell>{userData.courseName}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>STUDENT NUMBER</Table.Cell>
                        <Table.Cell>{userData.studentNumber}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>MOBILE</Table.Cell>
                        <Table.Cell>
                          {userData.mob.mobileCode} {userData.mob.mobile}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="sub-title">NAME</Table.Cell>
                        <Table.Cell></Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SUR
                          NAME
                        </Table.Cell>
                        <Table.Cell>{userData.name.surName}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;GIVEN
                          NAME
                        </Table.Cell>
                        <Table.Cell>{userData.name.givenName}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>EMAIL</Table.Cell>
                        <Table.Cell>{userData.email}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>REASON</Table.Cell>
                        <Table.Cell>
                          <IconButton onClick={() => setModalShow(true)}>
                            <EyeIcon size={20} fill="#979797" />
                          </IconButton>
                          <PopModal
                            show={modalShow}
                            title={'REASON'}
                            reason={'HELLO'}
                            onHide={() => setModalShow(false)}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>OUTCOME</Table.Cell>
                        <Table.Cell>
                          <IconButton onClick={() => setModalShow2(true)}>
                            <EyeIcon size={20} fill="#979797" />
                          </IconButton>
                          <PopModal2
                            show={modalShow2}
                            title={'OUTCOME'}
                            reason={userData.outcome}
                            onHide={() => setModalShow2(false)}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          STUDENT SIGNATURE
                        </Table.Cell>
                        <Table.Cell>
                          <a
                            href={`${process.env.REACT_APP_IMAGE_URL}${userData.sign}`}
                          >
                            Signature
                          </a>
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>DATE</Table.Cell>
                        <Table.Cell>{userData.date}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>RECEIVED BY</Table.Cell>
                        <Table.Cell>{userData.receivedBy}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>RECEIVED DATE</Table.Cell>
                        <Table.Cell>{userData.receivedDate}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>PROCESSED BY</Table.Cell>
                        <Table.Cell>{userData.ProcessedBy}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>PROCESSED DATE</Table.Cell>
                        <Table.Cell>{userData.ProcessedDate}</Table.Cell>
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

export default ComplaintSM;
