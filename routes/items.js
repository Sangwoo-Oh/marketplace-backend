const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item-controller');
const { getItemsMiddleware, authMiddleware } = require('../middleware/user');
const multer  = require('multer');
const upload = multer();

router.get('', getItemsMiddleware, itemController.getAllItems);
router.get('/:id', authMiddleware ,itemController.getItemById);
router.post('/item', authMiddleware, upload.single('file'), itemController.createItem);

module.exports = router;
