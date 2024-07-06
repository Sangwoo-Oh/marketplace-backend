const express = require('express');
const router = express.Router();
const Category = require('../model/category');

router.get('', async (req, res) => {
    result = await Category.find({});
    res.json(result);
})

module.exports = router;
