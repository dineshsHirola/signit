import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '../common/SideBar';
import Container from 'react-bootstrap/Container';
import { Table } from '@nextui-org/react';

const StudentReqSM = () => {
  const slug = useParams();
  const slugURL = slug.id;
  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);
  const [showData, setShowData] = useState(false);
  const [userData, setUserData] = useState();

  axios.defaults.withCredentials = true;

  const fetchAPI2 = async (url) => {
    try {
      await axios
        .get(url)
        .then((result) => {
          if (result.data.Status === 'Success') {
            setAuth(true);
            try {
              axios
                .get(`http://localhost:8000/admin/srf/${slugURL}`)
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
    const API2 = 'http://localhost:8000/admin/authControll';
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
                        <Table.Cell>COURSE CODE</Table.Cell>
                        <Table.Cell>{userData.courseCode}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>Date</Table.Cell>
                        <Table.Cell>{userData.date}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>UPDATE CONTACT DETAILS</Table.Cell>

                        {userData.updateContact ? (
                          <Table.Cell>YES</Table.Cell>
                        ) : (
                          <Table.Cell>No</Table.Cell>
                        )}
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>REQUEST FOR EMROLLMENT LETTER</Table.Cell>
                        {userData.enrollmentLetter ? (
                          <Table.Cell>YES</Table.Cell>
                        ) : (
                          <Table.Cell>No</Table.Cell>
                        )}
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>REQUEST FOR CERTIFICATE</Table.Cell>
                        {userData.certificate ? (
                          <Table.Cell>YES</Table.Cell>
                        ) : (
                          <Table.Cell>No</Table.Cell>
                        )}
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>REQUEST FOR SOA</Table.Cell>
                        {userData.soa ? (
                          <Table.Cell>YES</Table.Cell>
                        ) : (
                          <Table.Cell>No</Table.Cell>
                        )}
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          REQUEST FOR COURS PROGRESS REPORT
                        </Table.Cell>
                        {userData.progressReport ? (
                          <Table.Cell>YES</Table.Cell>
                        ) : (
                          <Table.Cell>No</Table.Cell>
                        )}
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>REQUEST FOR LEAVE</Table.Cell>
                        {userData.leave.leave ? (
                          <Table.Cell>YES</Table.Cell>
                        ) : (
                          <Table.Cell>No</Table.Cell>
                        )}
                      </Table.Row>
                      {userData.leave.leave ? (
                        <Table.Row>
                          <Table.Cell>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FROM
                          </Table.Cell>
                          <Table.Cell>{userData.leave.leaveFrom}</Table.Cell>
                        </Table.Row>
                      ) : null}
                      {userData.leave.leave ? (
                        <Table.Row>
                          <Table.Cell>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TO
                          </Table.Cell>
                          <Table.Cell>{userData.leave.leaveTo}</Table.Cell>
                        </Table.Row>
                      ) : null}
                      <Table.Row>
                        <Table.Cell>OTHER REQUEST</Table.Cell>
                        {userData.otherReq.otherReq ? (
                          <Table.Cell>YES</Table.Cell>
                        ) : (
                          <Table.Cell>No</Table.Cell>
                        )}
                      </Table.Row>
                      {userData.otherReq.otherReq ? (
                        <Table.Row>
                          <Table.Cell>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;REQUEST
                          </Table.Cell>
                          <Table.Cell>
                            {userData.otherReq.otherInput}
                          </Table.Cell>
                        </Table.Row>
                      ) : null}
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
