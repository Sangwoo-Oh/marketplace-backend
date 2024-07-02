const mongoose = require('mongoose');
const { Schema } = mongoose;
const Item = require("./model/item");
const Category = require("./model/category");

class InitDb {
    constructor() {
        this.categories = [
            {
                name: "Japanese"
            },
            {
                name: "Korean"
            },
            {
                name: "Chinese"
            }
        ]
        this.items = [
            {
                // _id: new mongoose.Types.ObjectId(),
                public_date: new Date(2024 / 1 / 1),
                name: "test_item",
                category: "test_category",
                description: "test_description",
                price: 1000,
                image_url: "https://marketplace-app-s3.s3.amazonaws.com/iphone13.jpg",
            },
            {
                // _id: new mongoose.Types.ObjectId(),
                public_date: new Date(2024 / 1 / 1),
                name: "test_item",
                category: "test_category",
                description: "test_description",
                price: 1000,
                image_url: "https://marketplace-app-s3.s3.amazonaws.com/iphone13.jpg",
            },
            {
                // _id: new mongoose.Types.ObjectId(),
                public_date: new Date(2024 / 1 / 1),
                name: "test_item",
                category: "test_category",
                description: "test_description",
                price: 1000,
                image_url: "https://marketplace-app-s3.s3.amazonaws.com/iphone13.jpg",
            },
            {
                // _id: new mongoose.Types.ObjectId(),
                public_date: new Date(2024 / 1 / 1),
                name: "test_item",
                category: "test_category",
                description: "test_description",
                price: 1000,
                image_url: "https://marketplace-app-s3.s3.amazonaws.com/iphone13.jpg",
            }
        ]
    }

    async initDb() {
        await this.cleanDb();
        this.generateItem();
    }

    async cleanDb() {
        await Item.deleteMany();
        await Category.deleteMany();
    }

    generateItem() {
        this.categories.forEach((category) => {
            const newCategory = new Category(category)
            newCategory.save()
            this.items.forEach((item) => {
                const newItem = new Item(item)
                newItem.category = newCategory._id
                newItem.save()
            })
        });
    }
}

module.exports = InitDb;
