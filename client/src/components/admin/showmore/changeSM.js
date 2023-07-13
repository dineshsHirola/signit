import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '../common/SideBar';
import Container from 'react-bootstrap/Container';
import { Table } from '@nextui-org/react';
import Cookies from 'js-cookie';

const ChangeSM = () => {
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
                  `${process.env.REACT_APP_BACKEND_LINK}/admin/csdf/${slugURL}`
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
                    <h1 className="heading">Change Of Student Details Form</h1>
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
                      <Table.Column>TITLE</Table.Column>
                      <Table.Column>DETAILS</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell className="sub-title">ID TYPE</Table.Cell>
                        <Table.Cell>{userData.typeOfId}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="sub-title">ID NUMBER</Table.Cell>
                        <Table.Cell>{userData.idNumber}</Table.Cell>
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
                      <Table.Column>TITLE</Table.Column>
                      <Table.Column>FILE DATA</Table.Column>
                      <Table.Column>NEW DATA</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      <Table.Row>
                        <Table.Cell className="sub-title">
                          COURSE ENROLLED
                        </Table.Cell>
                        <Table.Cell>
                          {userData.oldDetail.courseEnrolledFile}
                        </Table.Cell>
                        <Table.Cell>
                          {userData.newDetail.courseEnrolledFileNew}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="sub-title">NAME</Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PREFIX
                        </Table.Cell>
                        <Table.Cell>
                          {userData.oldDetail.name.prefix}
                        </Table.Cell>
                        <Table.Cell>
                          {userData.newDetail.name.prefixNew}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;FIRST
                          NAME
                        </Table.Cell>
                        <Table.Cell>
                          {userData.oldDetail.name.firstName}
                        </Table.Cell>
                        <Table.Cell>
                          {userData.newDetail.name.firstNameNew}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MIDDLE
                          NAME
                        </Table.Cell>
                        <Table.Cell>
                          {userData.oldDetail.name.middleName}
                        </Table.Cell>
                        <Table.Cell>
                          {userData.newDetail.name.middleNameNew}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LAST
                          NAME
                        </Table.Cell>
                        <Table.Cell>
                          {userData.oldDetail.name.lastName}
                        </Table.Cell>
                        <Table.Cell>
                          {userData.newDetail.name.lastNameNew}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="sub-title">DOB</Table.Cell>
                        <Table.Cell>{userData.oldDetail.dob}</Table.Cell>
                        <Table.Cell>{userData.newDetail.dobNew}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="sub-title">GENDER</Table.Cell>
                        <Table.Cell>{userData.oldDetail.gender}</Table.Cell>
                        <Table.Cell>{userData.newDetail.genderNew}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="sub-title">MOBILE</Table.Cell>
                        <Table.Cell>
                          {userData.oldDetail.mob.mobCode}{' '}
                          {userData.oldDetail.mob.mobile}
                        </Table.Cell>
                        <Table.Cell>
                          {userData.newDetail.mob.mobCodeNew}{' '}
                          {userData.newDetail.mob.mobileNew}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="sub-title">EMAIL</Table.Cell>
                        <Table.Cell>{userData.oldDetail.email}</Table.Cell>
                        <Table.Cell>{userData.newDetail.emailNew}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="sub-title">ALT EMAIL</Table.Cell>
                        <Table.Cell>{userData.oldDetail.altEmail}</Table.Cell>
                        <Table.Cell>
                          {userData.newDetail.altEmailNew}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="sub-title">
                          EMERGENCY CONTACT
                        </Table.Cell>
                        <Table.Cell>
                          {userData.oldDetail.emergencyContact}
                        </Table.Cell>
                        <Table.Cell>
                          {userData.newDetail.emergencyContactNew}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="sub-title">
                          COURSE ENROLLED
                        </Table.Cell>
                        <Table.Cell>{userData.oldDetail.kin}</Table.Cell>
                        <Table.Cell>{userData.newDetail.kinNew}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="sub-title">EMPLOYER</Table.Cell>
                        <Table.Cell>{userData.oldDetail.employer}</Table.Cell>
                        <Table.Cell>
                          {userData.newDetail.employerNew}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="sub-title">ADDRESS</Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BUILDING
                          NAME
                        </Table.Cell>
                        <Table.Cell>
                          {userData.oldDetail.address.buildingName}
                        </Table.Cell>
                        <Table.Cell>
                          {userData.newDetail.address.buildingNameNew}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;STREET
                        </Table.Cell>
                        <Table.Cell>
                          {userData.oldDetail.address.street}
                        </Table.Cell>
                        <Table.Cell>
                          {userData.newDetail.address.streetNew}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TOWN
                        </Table.Cell>
                        <Table.Cell>
                          {userData.oldDetail.address.town}
                        </Table.Cell>
                        <Table.Cell>
                          {userData.newDetail.address.townNew}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;STATE
                        </Table.Cell>
                        <Table.Cell>
                          {userData.oldDetail.address.state}
                        </Table.Cell>
                        <Table.Cell>
                          {userData.newDetail.address.stateNew}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POSTCODE
                        </Table.Cell>
                        <Table.Cell>
                          {userData.oldDetail.address.postCode}
                        </Table.Cell>
                        <Table.Cell>
                          {userData.newDetail.address.postCodeNew}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;COUNTRY
                        </Table.Cell>
                        <Table.Cell>
                          {userData.oldDetail.address.country}
                        </Table.Cell>
                        <Table.Cell>
                          {userData.newDetail.address.countryNew}
                        </Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell className="sub-title">
                          OVERSEAS ADDRESS
                        </Table.Cell>
                        <Table.Cell></Table.Cell>
                        <Table.Cell></Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BUILDING
                          NAME
                        </Table.Cell>
                        <Table.Cell>
                          {
                            userData.oldDetail.overSeasAddress
                              .overSeasBuildingName
                          }
                        </Table.Cell>
                        <Table.Cell>
                          {
                            userData.newDetail.overSeasAddress
                              .overSeasBuildingNameNew
                          }
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;STREET
                        </Table.Cell>
                        <Table.Cell>
                          {userData.oldDetail.overSeasAddress.overSeasStreet}
                        </Table.Cell>
                        <Table.Cell>
                          {userData.newDetail.overSeasAddress.overSeasStreetNew}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TOWN
                        </Table.Cell>
                        <Table.Cell>
                          {userData.oldDetail.overSeasAddress.overSeasTown}
                        </Table.Cell>
                        <Table.Cell>
                          {userData.newDetail.overSeasAddress.overSeasTownNew}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;STATE
                        </Table.Cell>
                        <Table.Cell>
                          {userData.oldDetail.overSeasAddress.overSeasState}
                        </Table.Cell>
                        <Table.Cell>
                          {userData.newDetail.overSeasAddress.overSeasStateNew}
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;POSTCODE
                        </Table.Cell>
                        <Table.Cell>
                          {userData.oldDetail.overSeasAddress.overSeasPostCode}
                        </Table.Cell>
                        <Table.Cell>
                          {
                            userData.newDetail.overSeasAddress
                              .overSeasPostCodeNew
                          }
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;COUNTRY
                        </Table.Cell>
                        <Table.Cell>
                          {userData.oldDetail.overSeasAddress.overSeasCountry}
                        </Table.Cell>
                        <Table.Cell>
                          {
                            userData.newDetail.overSeasAddress
                              .overSeasCountryNew
                          }
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

export default ChangeSM;
