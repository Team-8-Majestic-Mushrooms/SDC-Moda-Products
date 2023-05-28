const { pool } = require('./index');

module.exports.getAll = (id) => {
  const queryStr = `SELECT jsonb_agg(related_product_id) as related_products \
      FROM related \
      WHERE current_product_id = ${id}`;
  return pool
    .query(queryStr)
    .then((queryRes) => queryRes.rows[0].related_products)
    .catch((err) => {
      console.error('Query failed: get related', err.message);
    });
};
