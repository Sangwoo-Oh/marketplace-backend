const express = require('express');
const router = express.Router();
const Item = require('../model/item');

router.get('', async (req, res) => {
    result = await Item.find({});
    res.json(result);
})
router.get('/:id', async (req, res) => {
    try {
        result = await Item.findById(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(404).send({ error: 'ERROR' })
    }
})

module.exports = router;
