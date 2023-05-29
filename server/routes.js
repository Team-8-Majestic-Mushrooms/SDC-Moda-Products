const router = require('express').Router();
const productController = require('./controllers/product.controller');
const styleController = require('./controllers/style.controller');
const relatedController = require('./controllers/related.controller');

// Connect controller methods to corresponding routes
router.get('/', productController.getAll);
router.get('/:product_id', productController.getOne);
router.get('/:product_id/styles', styleController.getAll);
router.get('/:product_id/related', relatedController.getAll);

module.exports = router;
