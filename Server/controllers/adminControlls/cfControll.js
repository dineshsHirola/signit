const cf_collection = require('../../models/cf');
require('dotenv').config();

module.exports = async (req, res) => {

  cf_collection
  .find()
  .then((result) => {
    res.send({ Status: 'Success', result: result });
  })
  .catch((e) => {
    console.log('Serverside error', e);
  });
};
