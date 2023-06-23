const contactUs_collection = require('../../models/contactUs');
require('dotenv').config();

module.exports = async (req, res) => {
    contactUs_collection
    .find()
    .then((result) => {
      res.send({ Status: 'Success', result: result });
    })
    .catch((e) => {
      console.log('Serverside error', e);
    });
};
