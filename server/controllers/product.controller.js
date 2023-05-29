const productModel = require('../models/product.model');

module.exports.getAll = (req, res) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const count = req.query.count ? Number(req.query.count) : 5;
  productModel
    .getAll(page, count)
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
