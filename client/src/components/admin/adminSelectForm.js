import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SideBar from './common/SideBar';

const AdminSelectForm = () => {
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
          <div className="main-div select-form-admin-main">
            <Container>
              <h1>The Forms</h1>
              <div className="admin-select-flex">
                <Link to={'/admin/refundRequestFormData'}>
                  Refund Request Form
                </Link>
                <br />
                <Link to={'/admin/complaintFormData'}>Complaint Form</Link>
                <br />
                <Link to={'/admin/studentRequestFormData'}>
                  Student Request Form
                </Link>
                <br />
                <Link to={'/admin/changeOfStudentDetailsFormData'}>
                  Change Of Student Details Form
                </Link>
                <br />
                <Link to={'/admin/applicationForCreditTransferData'}>
                  Application for Credit Transfer
                </Link>
                <br />
                <Link to={'/admin/applicationToCancelEnrolmentData'}>
                  Application To Cancel Enrolment
                </Link>
                <br />
                <Link to={'/admin/gteFormData'}>
                  Genuine Temporary Entrant (GTE) Form
                </Link>
              </div>
            </Container>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSelectForm;
