const itemService = require('../services/item-service');

exports.getAllItems = async (req, res) => {
    try {
        const user = res.locals.user;
        const result = await itemService.getAllItems(user);
        res.json(result);
    } catch (err) {
        res.status(400).send({"error": err.message});
    }
}

exports.getItemById = async (req, res) => {
    try {
        const itemId = req.params.id;
        const result = await itemService.getItemById(itemId);
        res.json(result);
    } catch (err) {
        res.status(404).send({"error": err.message});
    }
}

exports.createItem = async (req, res) => {
    try {
        const data = {
            public_date : new Date(),
            name : req.body.name,
            category : req.body.category,
            description : req.body.description,
            price : req.body.price,
            seller : res.locals.user._id,
            buffer: req.file.buffer,
            mimetype: req.file.mimetype
        }
        const result = await itemService.createItem(data);
        res.json(result);
    } catch (err) {
        res.status(400).send({"error": err.message});
    }
}
