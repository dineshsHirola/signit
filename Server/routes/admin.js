const express = require('express');
const router = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const rrfControll = require('../controllers/adminControlls/rrfControll');
const cfControll = require('../controllers/adminControlls/cfControll');
const srfControll = require('../controllers/adminControlls/srfControll');
const ctfControll = require('../controllers/adminControlls/ctfControll');
const cefControll = require('../controllers/adminControlls/cefControll');
const gtefControll = require('../controllers/adminControlls/gtefControll');
const csdfControll = require('../controllers/adminControlls/csdfControll');
const login = require('../controllers/adminControlls/login');
const authControll = require('../controllers/auth/authControll');

const cfSM = require('../controllers/adminControlls/showmore/cfSM');
const cefSM = require('../controllers/adminControlls/showmore/cefSM');
const csdfSM = require('../controllers/adminControlls/showmore/csdfSM');
const ctfSM = require('../controllers/adminControlls/showmore/ctfSM');
const gtefSM = require('../controllers/adminControlls/showmore/gtefSM');
const rrfSM = require('../controllers/adminControlls/showmore/rrfSM');
const srfSM = require('../controllers/adminControlls/showmore/srfSM');
const logout = require('../controllers/adminControlls/logout');
const adminCred = require('../controllers/auth/adminCred');
const changeCred = require('../controllers/auth/changeCred');
const contactUs = require('../controllers/adminControlls/contactUs');

router.use(express.json());
router.use(cookieParser());
router.use(
  express.urlencoded({
    extended: true,
  })
);
router.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type'],
  })
);

router.get('/rrf', rrfControll);
router.get('/cf', cfControll);
router.get('/srf', srfControll);
router.get('/ctf', ctfControll);
router.get('/cef', cefControll);
router.get('/gtef', gtefControll);
router.get('/csdf', csdfControll);
router.post('/login', login);
router.get('/authControll', authControll);
router.get('/cf/:id', cfSM);
router.get('/cef/:id', cefSM);
router.get('/csdf/:id', csdfSM);
router.get('/ctf/:id', ctfSM);
router.get('/gtef/:id', gtefSM);
router.get('/rrf/:id', rrfSM);
router.get('/srf/:id', srfSM);
router.get('/logout', logout);
router.get('/profile', adminCred);
router.put('/changeCred', changeCred);
router.get('/contactUs', contactUs);





module.exports = router;
