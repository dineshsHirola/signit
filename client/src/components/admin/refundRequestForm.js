import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SideBar from './common/SideBar';
import Container from 'react-bootstrap/Container';
import { Table } from '@nextui-org/react';

const RefundRequestFormData = () => {
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
                .get('http://localhost:8000/admin/rrf')
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
                  <h1>Refund Request Form</h1>
                  {userData.map((val) => {
                    return (
                      <>
                        <p>{val.email}</p>
                        <Link to={`/admin/refundRequestFormData/${val._id}`}>
                          showmore
                        </Link>
                      </>
                    );
                  })}
                  <Table
                    aria-label="Example table with static content"
                    css={{
                      height: 'auto',
                      minWidth: '100%',
                    }}
                  >
                    <Table.Header>
                      <Table.Column>SL.NO</Table.Column>
                      <Table.Column>FIRST NAME</Table.Column>
                      <Table.Column>COURSE NAME</Table.Column>
                      <Table.Column>ID NUMBER</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      {userData.map((val) => {
                        return (
                          <Table.Row>
                            <Table.Cell>01</Table.Cell>
                            <Table.Cell>{val.name.firstName}</Table.Cell>
                            <Table.Cell>{val.courseName}</Table.Cell>
                            <Table.Cell>{val.idNumber}</Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table.Body>
                    <Table.Pagination
                      shadow
                      noMargin
                      align="center"
                      rowsPerPage={2}
                    />
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

export default RefundRequestFormData;
