const models = require('../models');

module.exports.getAll = (req, res) => {
  const id = req.params.product_id;
  models.related
    .getAll(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => {
      res.sendStatus(400);
    });
};
