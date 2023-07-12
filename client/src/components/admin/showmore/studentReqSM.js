import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '../common/SideBar';
import Container from 'react-bootstrap/Container';
import { Table } from '@nextui-org/react';
import Cookies from 'js-cookie';

const StudentReqSM = () => {
  const slug = useParams();
  const slugURL = slug.id;
  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);
  const [showData, setShowData] = useState(false);
  const [userData, setUserData] = useState();

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
                  `${process.env.REACT_APP_BACKEND_LINK}/admin/srf/${slugURL}`
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
                    <h1 className="heading">Student Request Form</h1>
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
                        <Table.Cell>STUDENT ID</Table.Cell>
                        <Table.Cell>{userData.studentID}</Table.Cell>
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
                        <Table.Cell>DOB</Table.Cell>
                        <Table.Cell>{userData.dob}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>CONTACT NUMBER</Table.Cell>
                        <Table.Cell>
                          {userData.mob.mobileCode}&nbsp;{userData.mob.mobile}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>EMAIL</Table.Cell>
                        <Table.Cell>{userData.email}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>COURSE CODE</Table.Cell>
                        <Table.Cell>{userData.courseCode}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>REQUEST TYPE</Table.Cell>
                        <Table.Cell></Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;UPDATE
                          CONTACT DETAILS
                        </Table.Cell>
                        {userData.updateContact ? (
                          <Table.Cell>Yes</Table.Cell>
                        ) : (
                          <Table.Cell>No</Table.Cell>
                        )}
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REQUEST
                          FOR ENROLLMENT LETTER
                        </Table.Cell>
                        {userData.enrollmentLetter ? (
                          <Table.Cell>Yes</Table.Cell>
                        ) : (
                          <Table.Cell>No</Table.Cell>
                        )}
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REQUEST
                          FOR CERTIFICATE
                        </Table.Cell>
                        {userData.certificate ? (
                          <Table.Cell>Yes</Table.Cell>
                        ) : (
                          <Table.Cell>No</Table.Cell>
                        )}
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REQUEST
                          FOR SOA
                        </Table.Cell>
                        {userData.soa ? (
                          <Table.Cell>Yes</Table.Cell>
                        ) : (
                          <Table.Cell>No</Table.Cell>
                        )}
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REQUEST
                          FOR COURSE PROGRESS REPORT
                        </Table.Cell>
                        {userData.progressReport ? (
                          <Table.Cell>Yes</Table.Cell>
                        ) : (
                          <Table.Cell>No</Table.Cell>
                        )}
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REQUEST
                          FOR LEAVE
                        </Table.Cell>
                        {userData.leave.leave ? (
                          <Table.Cell>Yes</Table.Cell>
                        ) : (
                          <Table.Cell>No</Table.Cell>
                        )}
                      </Table.Row>
                      {userData.leave.leave && (
                        <>
                          <Table.Row>
                            <Table.Cell>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LEAVE
                              FROM
                            </Table.Cell>
                            <Table.Cell>{userData.leave.leaveFrom}</Table.Cell>
                          </Table.Row>
                          <Table.Row>
                            <Table.Cell>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LEAVE
                              TO
                            </Table.Cell>
                            <Table.Cell>{userData.leave.leaveTo}</Table.Cell>
                          </Table.Row>
                        </>
                      )}
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OTHER
                          REQUEST
                        </Table.Cell>
                        {userData.otherReq.otherReq ? (
                          <Table.Cell>Yes</Table.Cell>
                        ) : (
                          <Table.Cell>No</Table.Cell>
                        )}
                      </Table.Row>
                      {userData.otherReq.otherReq && (
                        <Table.Row>
                          <Table.Cell>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LEAVE
                            FROM
                          </Table.Cell>
                          <Table.Cell>
                            {userData.otherReq.otherInput}
                          </Table.Cell>
                        </Table.Row>
                      )}
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
                        <Table.Cell>Date</Table.Cell>
                        <Table.Cell>{userData.date}</Table.Cell>
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

export default StudentReqSM;
