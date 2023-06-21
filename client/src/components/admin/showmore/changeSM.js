import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ChangeSM = () => {
    const slug = useParams();
    const slugURL = slug.id;
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
                .get(`http://localhost:8000/admin/csdf/${slugURL}`)
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
            <div>
              <h1>Change show more</h1>
              <>
                <p>{userData.oldDetail.email}</p>
              </>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </>
      )}
    </>
  );
};

export default ChangeSM;
