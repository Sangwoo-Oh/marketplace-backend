const Category = require('../model/category');

exports.getAllCategories = async (req, res) => {
    try {
        result = await Category.find({});
        res.json(result);
    } catch (err) {
        res.status(400).send({"error": err.message});
    }
}
