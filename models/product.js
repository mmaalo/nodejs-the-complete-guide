const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
    constructor(title, price, description, imageUrl, id, userId) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? new mongodb.ObjectId(id) : null;
        this.userId = userId;
        
    }

    save() {
        const db = getDb();
        let dbOp;

        if (this._id) {
            // Update the product
            dbOp = db.collection('products').updateOne({_id: this._id}, {$set: this});
        } else {
            // Create a new product
            dbOp = db.collection('products').insertOne(this);
        }
        return dbOp
            .catch(err => console.log(err));


    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products').find().toArray()
            .then(products => {
                return products;
            })
            .catch(err => console.log(err));
    }

    static findById(id) {
        const db = getDb();
        return db.collection('products').find({_id: new mongodb.ObjectId(id)})
            .next()
            .then(product => {
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
            .then(result => {
                console.log('Deleted product');
            })
            .catch(err => console.log(err));

    }
}

module.exports = Product;