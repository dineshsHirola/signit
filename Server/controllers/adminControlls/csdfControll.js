const csdf_collection = require('../../models/csdf');
require('dotenv').config();

module.exports = async (req, res) => {
  csdf_collection
    .find()
    .then((result) => {
      res.send({ Status: 'Success', result: result });
    })
    .catch((e) => {
      console.log('Serverside error', e);
    });
};
