import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import SideBar from './common/SideBar';

const Dashboard = () => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);

  axios.defaults.withCredentials = true;

  const fetchAPI2 = async (url) => {
    try {
      await axios
        .get(url)
        .then((result) => {
          if (result.data.Status === 'Success') {
            setAuth(true);
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
        <div className="flex-div">
          <SideBar />
          <div className="main-div">
            <Container>
              <h1>Admin Dashboard</h1>
            </Container>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
