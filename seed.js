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
            description: 'The iPhone 13 is a flagship smartphone by Apple, featuring a stunning Super Retina XDR display, advanced A15 Bionic chip, and improved dual-camera system for exceptional photo and video quality. With 5G capability, longer battery life, and enhanced durability, it offers a premium experience for both everyday use and high-performance tasks.',
            price: 10000,
            seller: new mongoose.Types.ObjectId('668170feaad528c8c2191628'),
            image_url: 'https://marketplace-app-s3.s3.amazonaws.com/seed/iphone13.jpg'
        }).save();
        new Item({
            public_data: new Date(2024, 7, 1),
            name: 'MacBook',
            category: apple._id,
            description: 'The MacBook is a sleek and powerful laptop designed by Apple, known for its high-resolution Retina display, long battery life, and robust performance. Equipped with the latest M1 chip, it offers seamless multitasking, fast processing speeds, and superior graphics. Perfect for professionals and students alike, it combines portability with advanced technology.',
            price: 30000,
            seller: new mongoose.Types.ObjectId('66851818b7c1219d3f54d439'),
            image_url: 'https://marketplace-app-s3.s3.amazonaws.com/seed/macbook.jpg'
        }).save();
        new Item({
            public_data: new Date(2024, 7, 1),
            name: 'Galaxy A 15',
            category: samsung._id,
            description: 'The Galaxy A 15 is a cutting-edge Android smartphone featuring a vibrant 6.5-inch display, powerful battery, and advanced camera system. With a fast processor and ample storage, it delivers smooth performance. This stylish and reliable device meets all your everyday needs effortlessly.',
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
