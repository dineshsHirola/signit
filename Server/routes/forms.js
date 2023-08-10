const express = require('express');
const router = express.Router();
const cors = require('cors');

const rrfControll = require('../controllers/formControlls/rrfControll');
const cfControll = require('../controllers/formControlls/cfControll');
const srfControll = require('../controllers/formControlls/srfControll');
const ctfControll = require('../controllers/formControlls/ctfControll');
const cefControll = require('../controllers/formControlls/cefControll');
const gtefControll = require('../controllers/formControlls/gtefControll');
const csdfControll = require('../controllers/formControlls/csdfControll');
const contactUs = require('../controllers/formControlls/contactUs');

router.use(express.json());
router.use(
  express.urlencoded({
    extended: true,
  })
);
// router.use(
//   cors({
//     origin: ['http://localhost:3000'],
//     methods: ['POST', 'GET', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//     exposedHeaders: ['Content-Type'],
//   })
// );

router.post('/rrf', rrfControll);
router.post('/cf', cfControll);
router.post('/srf', srfControll);
router.post('/ctf', ctfControll);
router.post('/cef', cefControll);
router.post('/gtef', gtefControll);
router.post('/csdf', csdfControll);
router.post('/contactUs', contactUs);



module.exports = router;
