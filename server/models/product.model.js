const pool = require("./index.js").pool;

module.exports.getAll = (page, count) => {
  const queryStr =
    "SELECT * \
    FROM product \
    LIMIT $2 \
    OFFSET (($1 - 1) * $2)";

  return pool.query(queryStr, [page, count]);
};

module.exports.getOne = (id) => {
  const queryStr = `SELECT product.id, name, slogan, description, \
    category, default_price, created_at, updated_at, feature, value \
    FROM product \
    JOIN feature \
    ON product.id = ${id} \
    AND feature.product_id = ${id}`;

  return pool.query(queryStr);
};
