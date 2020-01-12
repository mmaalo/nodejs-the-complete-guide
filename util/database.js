const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient
        .connect('mongodb+srv://user:user@nodejs-2k1so.mongodb.net/test?retryWrites=true&w=majority', {useUnifiedTopology: true})
        .then(client => {
            console.log('Connected!')
            callback(client)
        })
        .catch(err => console.log(err));
}

module.exports = mongoConnect;
