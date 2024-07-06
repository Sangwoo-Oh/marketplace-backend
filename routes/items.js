const config = require('../config/config');
const express = require('express');
const router = express.Router();
const Item = require('../model/item');
const {ObjectId} = require('mongodb');
const UserMiddleware = require('../middleware/user');
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const multer  = require('multer');
const upload = multer();


router.get('', UserMiddleware.getItemsMiddleware, async (req, res) => {
    const user = res.locals.user;
    if(!user) {
        result = await Item.find({});
    } else {
        result = await Item.find({
            seller: {
                $ne: user._id
            }
        });
    }
    res.json(result);
})
router.get('/:id', UserMiddleware.authMiddleware ,async (req, res) => {
    try {
        result = await Item.findById(req.params.id).populate('category').populate('seller');
        res.json(result);
    } catch (err) {
        res.status(404).send({ error: 'ERROR' })
    }
})
router.post('/item', UserMiddleware.authMiddleware, upload.single('file'), async (req, res) => {
    const configuration = {
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
        region: config.AWS_S3_REGION,
    };

    const client = new S3Client(configuration);

    try {
        const public_date = new Date(2024 / 1 / 1);
        const name = req.body.name;
        const category = new ObjectId(req.body.category);
        const description = req.body.description;
        const price = req.body.price;
        const seller = new ObjectId(res.locals.user._id);

        const newItem = new Item({
            public_date,
            name,
            category,
            description,
            price,
            seller,
        })
        newItem.image_url = 'https://marketplace-app-s3.s3.amazonaws.com/' + newItem._id + '.png';
        newItem.save();

        const command = new PutObjectCommand({
            Bucket: "marketplace-app-s3",
            Key: newItem._id + '.png',
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        });
        await client.send(command);
    } catch (err) {
        console.error(err);
    }

    res.json({"created" : true});
})

module.exports = router;
