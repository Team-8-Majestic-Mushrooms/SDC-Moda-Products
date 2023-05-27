const models = require("../models");

module.exports.getAll = (req, res) => {
  const id = req.params.product_id;
  models.related
    .getAll(id)
    .then(({ rows }) => {
      data = rows.map((row) => {
        return row.related_product_id;
      });
      res.status(200).json(data);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
};
