const pool = require("./index.js").pool;

module.exports.getAll = (productId) => {
  const queryStr = `SELECT product_id, style.id style_id, name, original_price, sale_price, \
    default_style default, thumbnail_url, url, sku.id sku_id, quantity, size \
    FROM style \
    JOIN photo \
    ON product_id = ${productId} \
    AND style.id = photo.style_id \
    JOIN sku \
    ON style.id = sku.style_id`;

  return pool.query(queryStr);
};
