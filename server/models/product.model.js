const { pool } = require('../db');

module.exports.getAll = (pageSize, pageToken) => {
  const queryStr = pageToken
    ? 'SELECT * FROM product WHERE id >= $2 ORDER BY id LIMIT $1'
    : 'SELECT * FROM product ORDER BY id LIMIT $1';
  const queryArgs = pageToken ? [pageSize + 1, Number(atob(pageToken))] : [pageSize + 1];
  return pool
    .query(queryStr, queryArgs)
    .then((queryRes) => {
      const { rows } = queryRes;
      return {
        results: rows.slice(0, pageSize),
        pageToken: rows.length === pageSize + 1 ? btoa(rows.slice(-1)[0].id) : undefined,
      };
    })
    .catch((err) => {
      console.error('Query failed: get all products', err.message);
    });
};

module.exports.getOne = (id) => {
  const queryStr =
    'SELECT product.id AS id, name, slogan, description, \
      category, default_price, created_at, updated_at, \
      jsonb_agg(jsonb_build_object("feature", feature.feature, "value", feature.value)) AS features \
      FROM product \
      JOIN feature \
      ON product.id = $1 \
      AND feature.product_id = $1 \
      GROUP BY product.id';
  return pool
    .query(queryStr, [id])
    .then((queryRes) => queryRes.rows[0])
    .catch((err) => {
      console.error('Query failed: get product', err.message);
    });
};
