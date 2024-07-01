const express = require('express');
const router = express.Router();
const Item = require('../model/item');
const UserController = require('../controllers/user');

router.get('', async (req, res) => {
    result = await Item.find({});
    res.json(result);
})
router.get('/:id', UserController.authMiddleware ,async (req, res) => {
    try {
        result = await Item.findById(req.params.id).populate('category');
        res.json(result);
    } catch (err) {
        res.status(404).send({ error: 'ERROR' })
    }
})

module.exports = router;
