const { pool } = require('../../db');

module.exports.getAll = (productId) => {
  const queryStr = `SELECT style.id AS style_id, name, original_price, sale_price, default_style AS default, \
      jsonb_agg(jsonb_build_object('thumbnail_url', thumbnail_url, 'url', url)) AS photos, \
      jsonb_object_agg(sku.id, jsonb_build_object('quantity', quantity, 'size', size)) AS skus \
      FROM style \
      JOIN photo \
      ON product_id = ${productId} \
      AND style.id = photo.style_id \
      JOIN sku \
      ON style.id = sku.style_id
      GROUP BY style.id`;
  return pool
    .query(queryStr)
    .then((queryRes) => queryRes.rows)
    .then((rows) => {
      const data = {
        product_id: productId,
        results: [],
      };
      rows.forEach((row) => {
        data.results.push(row);
      });
      return data;
    })
    .catch((err) => {
      console.error('Query failed: get all styles', err.message);
    });
};
