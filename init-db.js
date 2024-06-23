const mongoose = require('mongoose');
const { Schema } = mongoose;
const Item = require("./model/item");
const Category = require("./model/category");

class InitDb {
    constructor() {
        this.categories = [
            {
                // _id: new mongoose.Types.ObjectId(),
                name: "Japanese"
            },
            {
                // _id: new mongoose.Types.ObjectId(),
                name: "Korean"
            },
            {
                // _id: new mongoose.Types.ObjectId(),
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
                image_url: "assets/placeholder.jpeg",
            },
            {
                // _id: new mongoose.Types.ObjectId(),
                public_date: new Date(2024 / 1 / 1),
                name: "test_item",
                category: "test_category",
                description: "test_description",
                price: 1000,
                image_url: "assets/placeholder.jpeg",
            },
            {
                // _id: new mongoose.Types.ObjectId(),
                public_date: new Date(2024 / 1 / 1),
                name: "test_item",
                category: "test_category",
                description: "test_description",
                price: 1000,
                image_url: "assets/placeholder.jpeg",
            },
            {
                // _id: new mongoose.Types.ObjectId(),
                public_date: new Date(2024 / 1 / 1),
                name: "test_item",
                category: "test_category",
                description: "test_description",
                price: 1000,
                image_url: "assets/placeholder.jpeg",
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
                // const newItem = new Item({
                //     _id: new mongoose.Types.ObjectId(),
                //     public_date: item.publish_date,
                //     name: item.name,
                //     category: newCategory._id,
                //     description: item.description,
                //     price: item.price,
                //     image_url: item.image_url
                // })
                const newItem = new Item(item)
                newItem.category = newCategory._id
                newItem.save()
            })
        });
    }
}

module.exports = InitDb;
