const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchase-controller');
const { authMiddleware } = require('../middleware/user');

router.get('', authMiddleware, purchaseController.getPurchasedItems);
router.post('', authMiddleware, purchaseController.purchaseItem);

module.exports = router;
