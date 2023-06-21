const srf_collection = require('../../models/srf');
require('dotenv').config();

module.exports = async (req, res) => {
  srf_collection
    .find()
    .then((result) => {
      res.send({ Status: 'Success', result: result });
    })
    .catch((e) => {
      console.log('Serverside error', e);
    });
};
