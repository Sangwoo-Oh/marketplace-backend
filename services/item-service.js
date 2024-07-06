const config = require('../config/config');
const Item = require('../model/item');
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");

exports.getAllItems = async (user) => {
    if(!user) {
        result = await Item.find({});
    } else {
        result = await Item.find({
            seller: {
                $ne: user._id
            }
        });
    }
    return result;
}

exports.getItemById = async (itemId) => {
    const item = await Item.findById(itemId).populate('category').populate('seller');
    if (!item) throw new Error('Item not found');
    return item;
}

exports.createItem = async (data) => {
    const configuration = {
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
        region: config.AWS_S3_REGION,
    };

    const client = new S3Client(configuration);

    const newItem = new Item({
        public_date: data.public_date,
        name: data.name,
        category: data.category,
        description: data.description,
        price: data.price,
        seller: data.seller,
    })
    newItem.image_url = 'https://marketplace-app-s3.s3.amazonaws.com/' + newItem._id + '.png';
    newItem.save();

    const command = new PutObjectCommand({
        Bucket: "marketplace-app-s3",
        Key: newItem._id + '.png',
        Body: data['buffer'],
        ContentType: data['mimetype'],
    });
    await client.send(command);
    return newItem;
}
