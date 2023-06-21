const gtef_collection = require('../../../models/gtef');
require('dotenv').config();

module.exports = async (req, res) => {
  const id = req.params.id;
  gtef_collection
    .findOne({ _id: id })
    .then((result) => {
      res.send({ Status: 'Success', result: result });
    })
    .catch((e) => {
      console.log('Serverside error', e);
    });
};
