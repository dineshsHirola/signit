import React from 'react';
import Logout from '../logout';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="sideBar-parent">
      <div>
        <div className="logo">
          <Link to={'/admin'}>
            <img src="/images/Signet-logo.png" alt="logo" />
          </Link>
        </div>
        <ul>
          <Link to={'/admin'}>
            <li className="active">Dashboard</li>
          </Link>
          <Link to={'/admin/forms'}>
            <li>Forms</li>
          </Link>
          <Link to={'/admin/contact-us-forms'}>
            <li>Contact Us Form</li>
          </Link>
        </ul>
      </div>
      <div>
        <Link to={'/admin/profile'}>
          <li>Admin</li>
        </Link>
        <Logout />
      </div>
    </div>
  );
};

export default SideBar;
