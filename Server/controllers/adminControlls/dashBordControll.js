const ctf_collection = require('../../models/ctf');
const cef_collection = require('../../models/cef');
const cf_collection = require('../../models/cf');
const csdf_collection = require('../../models/csdf');
const gtef_collection = require('../../models/gtef');
const rrf_collection = require('../../models/rrf');
const srf_collection = require('../../models/srf');
const contactUs_collection = require('../../models/contactUs');

require('dotenv').config();

module.exports = async (req, res) => {
  ctf_collection
    .count()
    .then((ctf) => {
      cef_collection
        .count()
        .then((cef) => {
          cf_collection
            .count()
            .then((cf) => {
              csdf_collection
                .count()
                .then((csdf) => {
                  gtef_collection
                    .count()
                    .then((gtef) => {
                      rrf_collection
                        .count()
                        .then((rrf) => {
                          srf_collection
                            .count()
                            .then((srf) => {
                              contactUs_collection
                                .count()
                                .then((contact) => {
                                  res.send({
                                    Status: 'Success',
                                    ctf: ctf,
                                    cef: cef,
                                    cf: cf,
                                    csdf: csdf,
                                    gtef: gtef,
                                    rrf: rrf,
                                    srf: srf,
                                    contact: contact,
                                  });
                                })
                                .catch((e) => {
                                  console.log('Serverside error', e);
                                });
                            })
                            .catch((e) => {
                              console.log('Serverside error', e);
                            });
                        })
                        .catch((e) => {
                          console.log('Serverside error', e);
                        });
                    })
                    .catch((e) => {
                      console.log('Serverside error', e);
                    });
                })
                .catch((e) => {
                  console.log('Serverside error', e);
                });
            })
            .catch((e) => {
              console.log('Serverside error', e);
            });
        })
        .catch((e) => {
          console.log('Serverside error', e);
        });
    })
    .catch((e) => {
      console.log('Serverside error', e);
    });
};
