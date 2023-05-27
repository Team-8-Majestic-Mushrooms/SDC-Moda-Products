const controller = require("./controllers");
const router = require("express").Router();

// Connect controller methods to corresponding routes
router.get("/", controller.product.getAll);
router.get("/:product_id", controller.product.getOne);
router.get("/:product_id/styles", controller.style.getAll);
router.get("/:product_id/related", controller.related.getAll);

module.exports = router;
