const relatedModel = require('../models/related.model');
const redisClient = require('../redis');
const sortedJSONStringify = require('../utils/sortedJSONStringify');

module.exports.getAll = async (req, res) => {
  const id = req.params.product_id;
  const redisKey = sortedJSONStringify({
    related: 'related',
    id,
  });

  let data;
  try {
    const cacheResults = await redisClient.get(redisKey);
    if (cacheResults) {
      data = JSON.parse(cacheResults);
    } else {
      data = await relatedModel.getAll(id);
      await redisClient.set(redisKey, JSON.stringify(data));
    }
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
};
