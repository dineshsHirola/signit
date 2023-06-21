const gtef_collection = require('../../models/gtef');
require('dotenv').config();

module.exports = async (req, res) => {

  gtef_collection
  .find()
  .then((result) => {
    res.send({ Status: 'Success', result: result });
  })
  .catch((e) => {
    console.log('Serverside error', e);
  });
};
