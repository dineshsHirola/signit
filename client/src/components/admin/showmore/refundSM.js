import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '../common/SideBar';
import Container from 'react-bootstrap/Container';
import { Table } from '@nextui-org/react';

const RefundSM = () => {
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
                .get(`http://localhost:8000/admin/rrf/${slugURL}`)
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
                    <h1 className="heading">Refund Request Form</h1>
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
                        <Table.Cell>COURSE START DATE</Table.Cell>
                        <Table.Cell>{userData.courseStartDate}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="sub-title">NAME</Table.Cell>
                        <Table.Cell></Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PREFIX</Table.Cell>
                        <Table.Cell>{userData.name.prefix}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FIRST NAME</Table.Cell>
                        <Table.Cell>{userData.name.firstName}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MIDDLE NAME</Table.Cell>
                        <Table.Cell>{userData.name.middleName}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LAST NAME</Table.Cell>
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
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BUILDING NAME
                        </Table.Cell>
                        <Table.Cell>{userData.address.buildingName}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;STREET</Table.Cell>
                        <Table.Cell>{userData.address.street}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TOWN</Table.Cell>
                        <Table.Cell>{userData.address.town}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;STATE</Table.Cell>
                        <Table.Cell>{userData.address.state}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POST CODE
                        </Table.Cell>
                        <Table.Cell>{userData.address.postCode}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;COUNTRY
                        </Table.Cell>
                        <Table.Cell>{userData.address.country}</Table.Cell>
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

export default RefundSM;
