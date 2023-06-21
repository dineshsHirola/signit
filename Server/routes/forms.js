const express = require('express');
const router = express.Router();
const cors = require('cors');

const rrfControll = require('../controllers/adminControlls/rrfControll');
const cfControll = require('../controllers/adminControlls/cfControll');
const srfControll = require('../controllers/adminControlls/srfControll');
const ctfControll = require('../controllers/adminControlls/ctfControll');
const cefControll = require('../controllers/adminControlls/cefControll');
const gtefControll = require('../controllers/adminControlls/gtefControll');
const csdfControll = require('../controllers/adminControlls/csdfControll');

router.use(express.json());
router.use(
  express.urlencoded({
    extended: true,
  })
);
router.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type'],
  })
);

router.post('/rrf', rrfControll);
router.post('/cf', cfControll);
router.post('/srf', srfControll);
router.post('/ctf', ctfControll);
router.post('/cef', cefControll);
router.post('/gtef', gtefControll);
router.post('/csdf', csdfControll);



module.exports = router;
