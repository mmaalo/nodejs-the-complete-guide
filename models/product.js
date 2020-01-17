const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save() {
        const db = getDb();
        return db.collection('products').insertOne(this)
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products').find().toArray()
            .then(products => {
                console.log(products);
                return products;
            })
            .catch(err => console.log(err));
    }

    static findById(id) {
        const db = getDb();
        return db.collection('products').find({_id: new mongodb.ObjectId(id)})
            .next()
            .then(product => {
                console.log(product);
                return product;
            })
            .catch(err => console.log(err));
    }

    static updateById(id, updates) {
        const db = getDb();
        return db.collection('products').updateOne({_id: new mongodb.ObjectId(id)}, {$set: updates})
            .then(result => {
                console.log('product updated')
            })
            .catch(err => console.log(err));
    }

    static deleteById(id) {
        const db = getDb();
        return db.collection('products').deleteOne({_id: new mongodb.ObjectId(id)})
            .catch(err => console.log(err));

    }
}

module.exports = Product;