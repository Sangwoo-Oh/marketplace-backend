const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item-controller');
const { authMiddleware } = require('../middleware/user');
const multer  = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('', itemController.getAllItems);
router.get('/:id' ,itemController.getItemById);
router.get('/user/:id' ,itemController.getItemByUserId);
router.post('/item', authMiddleware, upload.single('file'), itemController.createItem);

module.exports = router;
