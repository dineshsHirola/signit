const srf_collection = require('../../../models/srf');
require('dotenv').config();

module.exports = async (req, res) => {
  const id = req.params.id;
  srf_collection
    .findOne({ _id: id })
    .then((result) => {
      res.send({ Status: 'Success', result: result });
    })
    .catch((e) => {
      console.log('Serverside error', e);
    });
};
