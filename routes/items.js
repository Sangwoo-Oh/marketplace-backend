const express = require('express');
const router = express.Router();
const Item = require('../model/item');

router.get('', async (req, res) => {
    result = await Item.find({});
    res.json(result);
})

module.exports = router;
