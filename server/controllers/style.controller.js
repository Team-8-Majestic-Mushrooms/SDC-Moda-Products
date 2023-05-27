const models = require("../models");

module.exports.getAll = (req, res) => {
  const productId = req.params.product_id;
  models.style
    .getAll(productId)
    .then(({ rows }) => {
      const data = {
        product_id: productId,
        results: [],
      };
      rows.forEach((row) => {
        const {
          product_id,
          thumbnail_url,
          url,
          sku_id,
          quantity,
          size,
          ...style
        } = row;
        style.photos = [];
        style.skus = {};
        style.photos.push({
          thumbnail_url: row.thumbnail_url,
          url: row.url,
        });
        style.skus[row.sku_id] = {
          quantity: row.quantity,
          size: row.size,
        };
        data.results.push(style);
      });
      res.status(200).json(data);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
};
