const Item = require("./model/item");

class InitDb {
    constructor() {
        this.items = [
            {
                public_date: new Date(2024 / 1 / 1),
                name: "test_item",
                category: "test_category",
                description: "test_description",
                price: 1000,
                image_url: "assets/placeholder.jpeg",
            },
            {
                public_date: new Date(2024 / 1 / 1),
                name: "test_item",
                category: "test_category",
                description: "test_description",
                price: 1000,
                image_url: "assets/placeholder.jpeg",
            },
            {
                public_date: new Date(2024 / 1 / 1),
                name: "test_item",
                category: "test_category",
                description: "test_description",
                price: 1000,
                image_url: "assets/placeholder.jpeg",
            },
            {
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
        this.pushItemsToDb();
    }

    async cleanDb() {
        await Item.deleteMany();
    }

    pushItemsToDb() {
        this.items.forEach((item) => {
            const newItem = new Item(item);
            newItem.save();
        });
    }
}

module.exports = InitDb;
