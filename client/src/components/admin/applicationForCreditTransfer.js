import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SideBar from './common/SideBar';
import Container from 'react-bootstrap/Container';
import { Table } from '@nextui-org/react';
import { IconButton } from './common/IconButton';
import { EyeIcon } from './common/EyeIcon';
import Cookies from 'js-cookie';
import { DeleteIcon } from './common/DeleteIcon';

const ApplicationForCreditTransferData = () => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);
  const [showData, setShowData] = useState(false);
  const [userData, setUserData] = useState();
  const [rowperPage, setRowPerPage] = useState(5);
  const [search, setSearch] = useState('');

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
                .get(`${process.env.REACT_APP_BACKEND_LINK}/admin/ctf`)
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

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await axios
      .delete(`${process.env.REACT_APP_BACKEND_LINK}/admin/ctf/delete/${id}`)
      .then((result) => {
        if (result.data.Status === 'Success') {
          alert('Deleted Successfully');
          window.location.reload();
        } else {
          alert('Failed to delete');
        }
      });
  };

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
                      Application For Credit Transfer Form
                    </h1>
                    <input
                      type="search"
                      placeholder="Search by ID Number"
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
                      <Table.Column>FIRST NAME</Table.Column>
                      <Table.Column>ID TYPE</Table.Column>
                      <Table.Column>ID NUMBER</Table.Column>
                      <Table.Column>VIEW MORE</Table.Column>
                      <Table.Column>DELETE</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      {userData
                        .filter((val) => {
                          const email = String(val.idNumber);
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
                        .map((val, index) => {
                          return (
                            <Table.Row>
                              <Table.Cell>{index + 1}</Table.Cell>
                              <Table.Cell>{val.name.firstName}</Table.Cell>
                              <Table.Cell>{val.typeOfId}</Table.Cell>
                              <Table.Cell>{val.idNumber}</Table.Cell>
                              <Table.Cell>
                                <Link
                                  to={`/admin/applicationForCreditTransferData/${val._id}`}
                                >
                                  <IconButton>
                                    <EyeIcon size={20} fill="#979797" />
                                  </IconButton>
                                </Link>
                              </Table.Cell>
                              <Table.Cell>
                                <IconButton
                                  onClick={(e) => {
                                    handleDelete(e, val._id);
                                  }}
                                >
                                  <DeleteIcon size={20} fill="#FF6A74" />
                                </IconButton>
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

export default ApplicationForCreditTransferData;
