const Item = require('../model/item');
const Purchase = require('../model/purchase');

exports.purchaseItem = async (userId, itemId) => {
    if (!userId) throw new Error("User not found!");

    const item = await Item.findById(itemId);

    if (!item) throw new Error("Item not found");

    if (item.is_purchased) throw new Error("This item is no longer available");

    try {
        const purchase = new Purchase({
            date: new Date(),
            item: item._id,
            buyer: userId
        });
        purchase.save();
        await item.updateOne({ is_purchased: 'true' });
        return purchase;
    } catch(err) {
        throw new Error(err);
    }
}
