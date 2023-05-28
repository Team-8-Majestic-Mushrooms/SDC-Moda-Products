const dbConfig = require("../config/db.config.js");
const { Pool } = require("pg");
module.exports.pool = new Pool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  database: dbConfig.DB,
  password: dbConfig.PASSWORD,
  port: dbConfig.PORT,
  max: dbConfig.POOL.max,
  idleTimeoutMillis: dbConfig.POOL.idle,
});

module.exports.product = require("./product.model.js");
module.exports.style = require("./style.model.js");
module.exports.related = require("./related.model.js");
