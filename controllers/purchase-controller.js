const purchaseService = require('../services/purchase-service');

exports.purchaseItem = async (req, res) => {
    try {
        const userId = res.locals.user._id;
        const itemId = req.body.itemId;
        const result = await purchaseService.purchaseItem(userId, itemId);
        return res.json(result);
    } catch (err) {
        res.status(401).send({"error": err.message});
    }
}
