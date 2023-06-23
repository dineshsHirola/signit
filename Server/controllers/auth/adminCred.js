const admin_collection = require('../../models/admin');

module.exports = async (req, res) => {
  admin_collection
    .find()
    .then((result) => {
      res.send({ Status: 'Success', result: result[0] });
    })
    .catch((e) => {
      res.send({Status:"Failed to fetch Data"})
    });
};
