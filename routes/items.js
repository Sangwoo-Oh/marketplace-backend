const express = require('express');
const router = express.Router();
const Item = require('../model/item');
const UserController = require('../controllers/user');
const {ObjectId} = require('mongodb')
const dotenv = require('dotenv');
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const multer  = require('multer');
const upload = multer();
dotenv.config();


router.get('', async (req, res) => {
    result = await Item.find({});
    res.json(result);
})
router.get('/:id', UserController.authMiddleware ,async (req, res) => {
    try {
        result = await Item.findById(req.params.id).populate('category');
        res.json(result);
    } catch (err) {
        res.status(404).send({ error: 'ERROR' })
    }
})
router.post('/item', upload.single('file'), async (req, res) => {
    console.log("req.file", req.file);
    console.log("req.body", req.body);

    const config = {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_S3_REGION,
    };

    const client = new S3Client(config);

    try {
        const public_date = new Date(2024 / 1 / 1);
        const name = req.body.name;
        const category = new ObjectId(req.body.category);
        const description = req.body.description;
        const price = req.body.price;

        const newItem = new Item({
            public_date,
            name,
            category,
            description,
            price,
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
