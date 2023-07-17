require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/products', router);

module.exports = app;
