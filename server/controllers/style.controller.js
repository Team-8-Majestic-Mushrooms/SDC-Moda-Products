const models = require("../models");

module.exports.getAll = (req, res) => {
  const productId = req.params.product_id;
  models.style
    .getAll(productId)
    .then((queryRes) => {
      const data = {
        product_id: productId,
        results: [],
      };
      queryRes.forEach((row) => {
        data.results.push(row);
      });
      res.status(200).json(data);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
};
