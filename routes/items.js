const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item-controller');
const { getItemsMiddleware, authMiddleware } = require('../middleware/user');
const multer  = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('', getItemsMiddleware, itemController.getAllItems);
router.get('/:id' ,itemController.getItemById);
router.post('/item', authMiddleware, upload.single('file'), itemController.createItem);

module.exports = router;
