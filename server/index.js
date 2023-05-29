require('dotenv').config();
const express = require('express');
// const path = require('path');
const cors = require('cors');
const router = require('./routes');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/products', router);

module.exports = app;
