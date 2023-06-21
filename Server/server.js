const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const forms = require('./routes/forms');
const admin = require('./routes/admin');
require('dotenv').config();

const app = require('express')();

app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials:true,
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type'],
  })
);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

mongoose
  .connect(process.env.MONGODB_API)
  .then(() => {
    console.log('DB_Connected');
  })
  .catch(() => {
    console.log('DB Connection failed');
  });

app.use('/forms', forms);
app.use('/admin', admin);

app.listen(8000, () => {
  console.log('Server started');
});
