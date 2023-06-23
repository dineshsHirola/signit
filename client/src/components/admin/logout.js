import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import { redirect } from 'react-router-dom';

const Logout = () => {
  const handleLogout = async () => {
    await axios
      .get('http://localhost:8000/admin/logout')
      .then((res) => {
        if (res.data.Status === 'Success') {
          window.location.reload(true);
          // redirect('/login');
        } else {
          alert('error');
        }
      })
      .catch((e) => {
        console.log(e);
      });
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
