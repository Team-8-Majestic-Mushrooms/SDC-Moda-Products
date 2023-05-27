const models = require("../models");

module.exports.getAll = (req, res) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const count = req.query.count ? Number(req.query.count) : 5;
  models.product.getAll(page, count).then((data) => {
    res.status(200).json(data.rows);
  });
};

module.exports.getOne = (req, res) => {
  const id = req.params.product_id;
  models.product
    .getOne(id)
    .then(({ rows }) => {
      rows[0].features = rows[0].features.map((value) => {
        const { id, product_id, ...pair } = value;
        return pair;
      });
      res.status(200).json(rows[0]);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
};
