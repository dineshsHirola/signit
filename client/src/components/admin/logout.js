import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import { redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

const Logout = () => {
  const handleLogout = async () => {
    // await axios
    //   .get(`${process.env.REACT_APP_BACKEND_LINK}/admin/logout')
    //   .then((res) => {
    //     if (res.data.Status === 'Success') {
    //       window.location.reload(true);
    //       // redirect('/login');
    //     } else {
    //       alert('error');
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    Cookies.remove('signetAdmintoken');
    window.location.reload(true);
  };

  return (
    <>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default Logout;
