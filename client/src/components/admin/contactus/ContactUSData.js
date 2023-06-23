import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table } from '@nextui-org/react';
import SideBar from '../common/SideBar';
import Container from 'react-bootstrap/esm/Container';
import { IconButton } from '../common/IconButton';
import { EyeIcon } from '../common/EyeIcon';
import ContactUsModal from './ContactUsModal';

const ContactUSData = () => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);
  const [showData, setShowData] = useState(false);
  const [userData, setUserData] = useState();
  const [rowperPage, setRowPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [modalShow, setModalShow] = useState(false);

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
                .get('http://localhost:8000/admin/contactUs')
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
                    <h1 className="heading">Contact Us Forms</h1>
                    <input
                      type="search"
                      placeholder="Search by Email"
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                    />
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
                      <Table.Column>SL.NO</Table.Column>
                      <Table.Column>NAME</Table.Column>
                      <Table.Column>EMAIL</Table.Column>
                      <Table.Column>MOBILE</Table.Column>
                      <Table.Column>SHOW MORE</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      {userData
                        .filter((val) => {
                          const email = String(val.email);
                          if (search === '') {
                            return val;
                          } else if (
                            email
                              .toLocaleLowerCase()
                              .includes(search.toLocaleLowerCase())
                          ) {
                            return val;
                          }
                        })
                        .map((val) => {
                          return (
                            <Table.Row>
                              <Table.Cell>01</Table.Cell>
                              <Table.Cell>{val.name}</Table.Cell>
                              <Table.Cell>{val.email}</Table.Cell>
                              <Table.Cell>{val.mobile}</Table.Cell>
                              <Table.Cell>
                                <IconButton onClick={() => setModalShow(true)}>
                                  <EyeIcon size={20} fill="#979797" />
                                </IconButton>
                                <ContactUsModal
                                    show={modalShow}
                                    data={val}
                                    onHide={() => setModalShow(false)}
                                  />
                              </Table.Cell>
                            </Table.Row>
                          );
                        })}
                    </Table.Body>
                    <Table.Pagination
                      shadow
                      noMargin
                      align="center"
                      rowsPerPage={rowperPage}
                    />
                  </Table>
                  <div className="row-select-flex">
                    <p>ROWS PER PAGE</p>
                    <select
                      onChange={(e) => {
                        setRowPerPage(e.target.value);
                      }}
                    >
                      <option value={5} selected>
                        5
                      </option>
                      <option value={15}>15</option>
                      <option value={15}>10</option>
                      <option value={20}>20</option>
                    </select>
                  </div>
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

export default ContactUSData;
