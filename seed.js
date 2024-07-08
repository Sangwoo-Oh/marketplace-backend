const config = require('./config/config');
const mongoose = require('mongoose');
const Item = require("./model/item");
const Category = require("./model/category");
const Purchase = require("./model/purchase");

class Seed {
    async seedData() {
        return new Promise(async (resolve, reject) => {
            try {
                await mongoose.connect('mongodb+srv://'+ config.USERNAME +':' + config.PASSWORD + '@' + config.URI).then(()=>{console.log('successful connection!')}).catch((err)=>{console.log(err)});
                await this.cleanDb();
                await this.generateItem();
                await resolve();
            } catch(err) {
                reject(err);
            }
        });
    }

    async cleanDb() {
        await Purchase.deleteMany();
        await Item.deleteMany();
        await Category.deleteMany();
    }

    async generateItem() {
        const apple = await new Category({ name: 'Apple' }).save();
        const samsung = await new Category({ name: 'Samsung' }).save();
        const google = await new Category({ name: 'Google' }).save();
        new Item({
            public_data: new Date(2024, 7, 3),
            name: 'iPhone13',
            category: apple._id,
            description: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects,',
            price: 10000,
            seller: new mongoose.Types.ObjectId('668170feaad528c8c2191628'),
            image_url: 'https://marketplace-app-s3.s3.amazonaws.com/seed/iphone13.jpg'
        }).save();
        new Item({
            public_data: new Date(2024, 7, 1),
            name: 'MacBook',
            category: apple._id,
            description: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects,',
            price: 30000,
            seller: new mongoose.Types.ObjectId('66851818b7c1219d3f54d439'),
            image_url: 'https://marketplace-app-s3.s3.amazonaws.com/seed/macbook.jpg'
        }).save();
        new Item({
            public_data: new Date(2024, 7, 1),
            name: 'Galaxy A 15',
            category: samsung._id,
            description: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects,',
            price: 8000,
            seller: new mongoose.Types.ObjectId('668170feaad528c8c2191628'),
            image_url: 'https://marketplace-app-s3.s3.amazonaws.com/seed/galaxy.jpg'
        }).save();
    }
}

const seed = new Seed();
seed.seedData().then(
    async ()=>{
        console.log('seed data created');
    }
).catch(
    (err)=>{console.error(err);}
);
