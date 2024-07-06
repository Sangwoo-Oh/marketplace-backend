const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchase-controller');
const { authMiddleware } = require('../middleware/user');

router.post('', authMiddleware, purchaseController.purchaseItem);

module.exports = router;
