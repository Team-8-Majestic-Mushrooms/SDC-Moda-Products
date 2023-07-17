const productModel = require('../models/product.model');
const redisClient = require('../redis');
const sortedJSONStringify = require('../utils/sortedJSONStringify');

module.exports.getAll = async (req, res) => {
  const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 5;
  const { pageToken } = req.query;
  const redisKey = sortedJSONStringify({
    products: 'products',
    pageSize,
    pageToken,
  });
  let data;
  try {
    const cacheResults = await redisClient.get(redisKey);
    if (cacheResults) {
      data = JSON.parse(cacheResults);
    } else {
      data = await productModel.getAll(pageSize, pageToken);
      await redisClient.set(redisKey, JSON.stringify(data));
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};

module.exports.getOne = async (req, res) => {
  const id = req.params.product_id;
  const redisKey = sortedJSONStringify({
    product: 'product',
    id,
  });
  let data;
  try {
    const cacheResults = await redisClient.get(redisKey);
    if (cacheResults) {
      data = JSON.parse(cacheResults);
    } else {
      data = await productModel.getOne(id);
      await redisClient.set(redisKey, JSON.stringify(data));
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};
