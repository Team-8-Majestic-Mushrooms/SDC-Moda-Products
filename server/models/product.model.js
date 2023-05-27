const pool = require("./index.js").pool;

module.exports.getAll = (page, count) => {
  try {
    const queryStr =
      "SELECT * \
      FROM product \
      LIMIT $2 \
      OFFSET (($1 - 1) * $2)";
    return pool.query(queryStr, [page, count]);
  } catch (err) {
    console.error("Query failed", err.message);
  }
};

module.exports.getOne = (id) => {
  try {
    const queryStr = `SELECT product.id AS id, name, slogan, description, \
      category, default_price, created_at, updated_at, \
      jsonb_agg(jsonb_build_object('feature', feature.feature, 'value', feature.value)) AS features \
      FROM product \
      JOIN feature \
      ON product.id = ${id} \
      AND feature.product_id = ${id} \
      GROUP BY product.id`;
    return pool.query(queryStr);
  } catch (err) {
    console.error("Query failed", err.message);
  }
};
