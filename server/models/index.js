const { Pool } = require('pg');
const dbConfig = require('../config/db.config');

module.exports.pool = new Pool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  database: dbConfig.DB,
  password: dbConfig.PASSWORD,
  port: dbConfig.PORT,
  max: dbConfig.POOL.max,
  idleTimeoutMillis: dbConfig.POOL.idle,
});

module.exports.product = require('./product.model');
module.exports.style = require('./style.model');
module.exports.related = require('./related.model');
