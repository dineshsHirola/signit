const cef_collection = require('../../models/cef');
require('dotenv').config();

module.exports = async (req, res) => {
  cef_collection
    .find()
    .then((result) => {
      res.send({ Status: 'Success', result: result });
    })
    .catch((e) => {
      console.log('Serverside error', e);
    });
};
