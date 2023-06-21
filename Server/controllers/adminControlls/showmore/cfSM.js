const cf_collection = require('../../../models/cf');
require('dotenv').config();

module.exports = async (req, res) => {
  const id = req.params.id;
  cf_collection
    .findOne({ _id: id })
    .then((result) => {
      res.send({ Status: 'Success', result: result });
    })
    .catch((e) => {
      console.log('Serverside error', e);
    });
};
