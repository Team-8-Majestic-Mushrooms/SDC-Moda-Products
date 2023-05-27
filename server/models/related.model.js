const pool = require("./index.js").pool;

module.exports.getAll = (id) => {
  const queryStr = `SELECT current_product_id, related_product_id \
    FROM related \
    WHERE current_product_id = ${id}`;

  return pool.query(queryStr);
};
