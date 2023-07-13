const productModel = require('../models/product.model');

module.exports.getAll = (req, res) => {
  const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 5;
  const pageToken = req.query.pageToken;
  productModel
    .getAll(pageSize, pageToken)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.sendStatus(400);
    });
};

module.exports.getOne = (req, res) => {
  const id = req.params.product_id;
  productModel
    .getOne(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.sendStatus(400);
    });
};
