const rrf_collection = require('../../models/rrf');
require('dotenv').config();

module.exports = async (req, res) => {
  rrf_collection
  .find()
  .then((result) => {
    res.send({ Status: 'Success', result: result });
  })
  .catch((e) => {
    console.log('Serverside error', e);
  });
};
