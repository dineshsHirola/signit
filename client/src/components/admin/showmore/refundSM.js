import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SideBar from '../common/SideBar';
import Container from 'react-bootstrap/Container';
import { Table } from '@nextui-org/react';
import Cookies from 'js-cookie';
import { IconButton } from '../common/IconButton';
import { EyeIcon } from '../common/EyeIcon';
import { ImageLinkModal2 } from '../common/modal';
import { PopModal, PopModal2 } from '../common/modal';

const RefundSM = () => {
  const slug = useParams();
  const slugURL = slug.id;
  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);
  const [showData, setShowData] = useState(false);
  const [userData, setUserData] = useState();

  const [modalShow, setModalShow] = useState(false);

  const [modalShow1, setModalShow1] = useState(false);
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
                  `${process.env.REACT_APP_BACKEND_LINK}/admin/rrf/${slugURL}`
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
                        <Table.Cell className="table-gold-p">
                          INVOICE NUMBER
                        </Table.Cell>
                        <Table.Cell>{userData.invoiceNumber}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">REASON</Table.Cell>
                        <Table.Cell>{userData.reason}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          SUPPORTING DOCUMENTS
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
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          BANK DETAILS
                        </Table.Cell>
                        <Table.Cell></Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BANK
                          NAME
                        </Table.Cell>
                        <Table.Cell>{userData.bankName}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ACCOUNT
                          NAME
                        </Table.Cell>
                        <Table.Cell>{userData.accName}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ACCOUNT
                          NUMBER
                        </Table.Cell>
                        <Table.Cell>{userData.accNumber}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BSB:
                        </Table.Cell>
                        <Table.Cell>{userData.bsb}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BANK
                          ADDRESS
                        </Table.Cell>
                        <Table.Cell>
                          {/* {userData.bankAddress} */}
                          <IconButton onClick={() => setModalShow2(true)}>
                            <EyeIcon size={20} fill="#979797" />
                          </IconButton>
                          <PopModal
                            show={modalShow2}
                            title={'BANK ADDRESS'}
                            reason={userData.bankAddress}
                            onHide={() => setModalShow2(false)}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SWIFT
                          CODE
                        </Table.Cell>
                        <Table.Cell>{userData.swiftCode}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SIGNATURE
                        </Table.Cell>
                        <Table.Cell>
                          <a
                            href={`${process.env.REACT_APP_IMAGE_URL}${userData.sign[0]}`}
                          >
                            Signature
                          </a>
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DATE
                        </Table.Cell>
                        <Table.Cell>{userData.bankDate}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          REFUND TYPE
                        </Table.Cell>
                        <Table.Cell>{userData.refundType}</Table.Cell>
                      </Table.Row>
                      {userData.refundType === 'other' ? (
                        <Table.Row>
                          <Table.Cell className="table-gold-p">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Other
                            (Please specify):
                          </Table.Cell>
                          <Table.Cell>{userData.otherRefundInput}</Table.Cell>
                        </Table.Row>
                      ) : null}
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          THIS REFUND AMOUNT IS
                        </Table.Cell>
                        <Table.Cell>{userData.refundAmount}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          Comments/ Reason for decision / Calculations of
                          refund:
                        </Table.Cell>
                        <Table.Cell>
                          {/* {userData.comments} */}
                          <IconButton onClick={() => setModalShow1(true)}>
                            <EyeIcon size={20} fill="#979797" />
                          </IconButton>
                          <PopModal
                            show={modalShow1}
                            title={
                              'Comments/ Reason for decision / Calculations of'
                            }
                            reason={userData.comments}
                            onHide={() => setModalShow1(false)}
                          />
                        </Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          REFUND METHOD IS
                        </Table.Cell>
                        <Table.Cell>{userData.refundMethod}</Table.Cell>
                      </Table.Row>
                      {userData.sign.length === 3 && (
                        <Table.Row>
                          <Table.Cell className="table-gold-p">
                            SIGNATURE
                          </Table.Cell>
                          <Table.Cell>
                            <a
                              href={`${process.env.REACT_APP_IMAGE_URL}${userData.sign[1]}`}
                            >
                              Signature
                            </a>
                          </Table.Cell>
                        </Table.Row>
                      )}

                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          POSITION
                        </Table.Cell>
                        <Table.Cell>{userData.position}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          PRINT NAME
                        </Table.Cell>
                        <Table.Cell>{userData.printName}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          DATE PROCESSED
                        </Table.Cell>
                        <Table.Cell>{userData.dateProcessed}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          LOGGED IN REFUND REGISTER
                        </Table.Cell>
                        <Table.Cell>{userData.refundRegister}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">DATE</Table.Cell>
                        <Table.Cell>{userData.logDate}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          LOGGED BY
                        </Table.Cell>
                        <Table.Cell>{userData.loggedBy}</Table.Cell>
                      </Table.Row>
                      {userData.sign[2] && (
                        <Table.Row>
                          <Table.Cell className="table-gold-p">
                            SIGNATURE
                          </Table.Cell>
                          <Table.Cell>
                            <a
                              href={`${process.env.REACT_APP_IMAGE_URL}${userData.sign[2]}`}
                            >
                              Signature
                            </a>
                          </Table.Cell>
                        </Table.Row>
                      )}
                      <Table.Row>
                        <Table.Cell className="table-gold-p">
                          FORMAL LETTER/EMAIL SENT
                        </Table.Cell>
                        <Table.Cell>{userData.formal}</Table.Cell>
                      </Table.Row>
                      <Table.Row>
                        <Table.Cell className="table-gold-p">DATE</Table.Cell>
                        <Table.Cell>{userData.formalDate}</Table.Cell>
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
