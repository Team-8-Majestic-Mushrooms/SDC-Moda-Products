const relatedModel = require('../models/related.model');

module.exports.getAll = (req, res) => {
  const id = req.params.product_id;
  relatedModel
    .getAll(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.sendStatus(400);
    });
};
