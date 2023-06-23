import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import { Table } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import SideBar from './common/SideBar';

const AdminProfile = () => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);
  const [showData, setShowData] = useState(false);
  const [userData, setUserData] = useState();
  const [showInputs, setShowInputs] = useState(false);
  const [adminUserName, setAdminUserName] = useState('');
  const [adminExistingPassword, setAdminExistingPassword] = useState('');
  const [adminNewPassword, setAdminNewPassword] = useState('');
  const [adminConfirmPassword, setAdminConfirmPassword] = useState('');

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
                .get('http://localhost:8000/admin/profile')
                .then((result) => {
                  if (result.data.Status === 'Success') {
                    if (result.data.result === null) {
                      setShowData(false);
                      alert('No Data found');
                    } else {
                      setShowData(true);
                      setUserData(result.data.result);
                      setAdminUserName(result.data.result.username)
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

  const handleButton = () => {
    if (showInputs === false) {
      setShowInputs(true);
    } else {
      setShowInputs(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adminNameVer = adminValidation(adminUserName);
    const adminExistingPasswordVer = adminValidation(adminExistingPassword);
    const adminNewPasswordVer = adminValidation(adminNewPassword);
    const adminConfirmPasswordVer = adminValidation(adminConfirmPassword);
    if (
      adminNameVer &&
      adminExistingPasswordVer &&
      adminNewPasswordVer &&
      adminConfirmPasswordVer
    ) {
      if (adminNewPassword === adminConfirmPassword) {
        await axios
          .put(`http://localhost:8000/admin/changeCred`, {
            adminUserName,
            adminExistingPassword,
            adminNewPassword,
            adminExistingEmail: userData.username,
          })
          .then((result) => {
            if (result.data.Status === 'Success') {
              alert('Changed Cred Successfully');
            } else {
              alert(result.data.Status);
            }
          })
          .catch((e) => {
            alert('Failed to change password');
          });
      } else {
        alert('New Password and Confirm Password are not matching');
      }
    } else {
      alert('Fill all the fields');
    }
  };

  const adminValidation = (name) => {
    if (!name) {
      return false;
    } else {
      return true;
    }
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
                    <h1 className="heading">Admin Profile</h1>
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
                        <Table.Cell>USERNAME</Table.Cell>
                        <Table.Cell>{userData.username}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                  <button
                    className="changeCred-btn"
                    onClick={(e) => {
                      handleButton(e);
                    }}
                  >
                    Change Credentials
                  </button>
                  {showInputs ? (
                    <>
                      <div
                        className={
                          showInputs
                            ? 'changeCred-div'
                            : 'changeCred-div-fade-out'
                        }
                      >
                        <form>
                          <input
                            type="text"
                            placeholder="User Name"
                            name="adminName"
                            Value={adminUserName}
                            onChange={(e) => {
                              setAdminUserName(e.target.value);
                            }}
                          />
                          <br />
                          <input
                            type="text"
                            placeholder="Existing Password"
                            name="adminExistingPassword"
                            onChange={(e) => {
                              setAdminExistingPassword(e.target.value);
                            }}
                          />
                          <br />
                          <input
                            type="text"
                            placeholder="New Password"
                            name="adminNewPassword"
                            onChange={(e) => {
                              setAdminNewPassword(e.target.value);
                            }}
                          />
                          <br />
                          <input
                            placeholder="Confirm New Password"
                            name="adminConfirmPassword"
                            onChange={(e) => {
                              setAdminConfirmPassword(e.target.value);
                            }}
                          />
                          <br />
                          <button onClick={handleSubmit}>Submit</button>
                        </form>
                      </div>
                    </>
                  ) : null}
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

export default AdminProfile;
