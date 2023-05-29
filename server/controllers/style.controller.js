const styleModel = require('../models/style.model');

module.exports.getAll = (req, res) => {
  const productId = req.params.product_id;
  styleModel
    .getAll(productId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.sendStatus(400);
    });
};
