const cef_collection = require('../../../models/cef');
require('dotenv').config();

module.exports = async (req, res) => {
  const id = req.params.id;
  cef_collection
    .findOne({ _id: id })
    .then((result) => {
      res.send({ Status: 'Success', result: result });
    })
    .catch((e) => {
      console.log('Serverside error', e);
    });
};
