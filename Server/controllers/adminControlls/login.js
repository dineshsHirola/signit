const admin_collection = require('../../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const saltRounds = 10;

module.exports = async (req, res) => {
  const { username, password } = req.body;

  admin_collection
    .findOne({ username: username })
    .then((result) => {
      if (result.password === password) {
        const token = jwt.sign(
          { admin_id: result._id },
          'our-signet-admin-jsonwebtoken-secret-key',
          {
            expiresIn: '1d',
          }
        );
        // res.cookie("admintoken", token, { httpOnly: true });
        res.cookie('signetAdmintoken', token, { httpOnly: true });
        return res.send({ Status: 'Success' });
      } else {
        return res.send({ Status: 'Password is wrong' });
      }
      //       bcrypt
      //         .compare(password, result.password)
      //         .then((hashPassord) => {
      //           if (hashPassord === true) {
      //             const token = jwt.sign(
      //               { admin_id: result._id },
      //               process.env.ADMIN_JWT_SECRET,
      //               {
      //                 expiresIn: '1d',
      //               }
      //             );
      //             res.cookie(process.env.ADMIN_JWT_NAME, token, { httpOnly: true });
      //             return res.send({ message: 'Success' });
      //           } else {
      //             res.send({ Status: 'Password is Incorrect' });
      //           }
      //         })
      //         .catch((e) => {
      // c        });
    })
    .catch((e) => {
      res.send({ Status: 'Admin not found' });
    });
};
