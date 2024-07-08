const purchaseService = require('../services/purchase-service');

exports.getPurchasedItems = async (req, res) => {
    try {
        const userId = res.locals.user._id;
        const result = await purchaseService.getPurchasedItems(userId);
        return res.json(result);
    } catch (err) {
        res.status(400).send({"error": err.message});
    }
}

exports.purchaseItem = async (req, res) => {
    try {
        const userId = res.locals.user._id;
        const itemId = req.body.itemId;
        const result = await purchaseService.purchaseItem(userId, itemId);
        return res.json(result);
    } catch (err) {
        res.status(400).send({"error": err.message});
    }
}
