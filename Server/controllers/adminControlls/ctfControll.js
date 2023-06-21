const ctf_collection = require('../../models/ctf');
require('dotenv').config();

module.exports = async (req, res) => {

  ctf_collection
    .find()
    .then((result) => {
      res.send({ Status: 'Success', result: result });
    })
    .catch((e) => {
      console.log('Serverside error', e);
    });
};
