import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import SideBar from './common/SideBar';
import Cookies from 'js-cookie';

const Dashboard = () => {
  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);
  const [showData, setShowData] = useState(false);
  const [userData, setUserData] = useState({
    ctf: '',
    cef: '',
    cf: '',
    csdf: '',
    gtef: '',
    rrf: '',
    srf: '',
    contact: '',
  });

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
                .get(`${process.env.REACT_APP_BACKEND_LINK}/admin/total`)
                .then((result) => {
                  if (result.data.Status === 'Success') {
                    if (result.data.result === null) {
                      setShowData(false);
                      alert('No Data found');
                    } else {
                      setShowData(true);
                      setUserData({
                        ctf: result.data.ctf,
                        cef: result.data.cef,
                        cf: result.data.cf,
                        csdf: result.data.csdf,
                        gtef: result.data.gtef,
                        rrf: result.data.rrf,
                        srf: result.data.srf,
                        contact: result.data.contact,
                      });
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
                    <h1>Admin Dashboard</h1>
                  </div>
                  <div className="dashbord-parent">
                    <div className="dashbord-child">
                      <p>Refund Request Forms</p>
                      <h4>{userData.rrf}</h4>
                    </div>
                    <div className="dashbord-child">
                      <p>Complaint Forms</p>
                      <h4>{userData.cf}</h4>
                    </div>
                    <div className="dashbord-child">
                      <p>Student Request Forms</p>
                      <h4>{userData.srf}</h4>
                    </div>
                    <div className="dashbord-child">
                      <p>Change Of Student Details Forms</p>
                      <h4>{userData.csdf}</h4>
                    </div>
                    <div className="dashbord-child">
                      <p>Application For Credit Transfer Forms</p>
                      <h4>{userData.ctf}</h4>
                    </div>
                    <div className="dashbord-child">
                      <p>Application For Cancel Enrollment Forms</p>
                      <h4>{userData.cef}</h4>
                    </div>
                    <div className="dashbord-child">
                      <p>GTE Forms</p>
                      <h4>{userData.gtef}</h4>
                    </div>
                    <div className="dashbord-child">
                      <p>Contact Us Forms</p>
                      <h4>{userData.contact}</h4>
                    </div>
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

export default Dashboard;
