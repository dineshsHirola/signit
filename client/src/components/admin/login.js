import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [passView, setPassView] = useState(false);

  axios.defaults.withCredentials = true;

  const handleLogin = async (e) => {
    e.preventDefault();
    await axios
      .post(
        'http://localhost:8000/admin/login',
        {
          username,
          password,
        },
        {
          withCredentials: true,
          credentials: 'include',
        }
      )
      .then((res) => {
        console.log(res)
        if (res.data.Status === 'Success') {
          navigate('/admin');
        } else {
          alert(res.data.Status);
        }
      })
      .catch((e) => {
        console.log('axios login error', e);
      });
  };

  const handleTogglePassword = () => {
    setPassView(!passView);
  };

  return (
    <div className="login-parent">
      <div>
        <h1>Welcome back Admin</h1>
        <form>
          <div>
            <label>Username</label>
            <br />
            <input
              type="text"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <br />
            <label>Password</label>
            <br />
            <div className='passwordInput'>
              <input
                type={passView ? 'text' : 'password'}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <span className="placeholder_icon" onClick={handleTogglePassword}>
                <span className=" d-flex align-items-center">
                  {passView ? (
                    <i class="fa-solid fa-eye"></i>
                  ) : (
                    <i class="fa-solid fa-eye-slash"></i>
                  )}
                </span>
              </span>
            </div>
            <br />
            <button onClick={handleLogin}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
