const database = require('../util/database');
const mongodb = require('mongodb');

class Riddle {
    constructor(author, title, riddle, image_url, date) {
        this.title = title;
        this.author = author;
        this.riddle = riddle;
        this.like = 0;
        this.image_url = image_url;
        this.date = new Date();
    }

    saveRiddle() {
        database.getDB().collection('riddles').insertOne(this)
            // .then(result => {
            //     console.log('success!');
            // })
            // .catch(err => {
            //     console.log(err);
            // });
    }

    static getAll() {
        return database.getDB().collection('riddles').find().toArray()
            // .then(result => {
            //     console.log("result", result)
            //     return result;
            // })
            // .catch(err => {
            //     console.log(err);
            // });
    }

    static getOne(riddleId) {
        return database.getDB().collection('riddles').findOne({ _id: new mongodb.ObjectId(riddleId) })
            // .then(result => {
            //     console.log("result", result)
            //     return result;
            // })
            // .catch(err => {
            //     console.log(err);
            // });
    }

    static deleteRiddle(id) {
        return database.getDB().collection('riddles').deleteOne({_id: new mongodb.ObjectId(id)});
        // TODO delete all comments related to this riddle
    }

    static updateRiddle(id, title, content) {
        return database.getDB().collection('riddles')
            .updateOne({_id: new mongodb.ObjectId(id)}, {$set: {title: title, content: content}});
    }

    static async like(id) {
        const collection = database.getDB().collection('riddles');
        const whereClause = { _id: new mongodb.ObjectId(id) };
        const riddle = await collection.findOne(whereClause);
        return await collection.updateOne(whereClause, { $set: { like: ++riddle.like } });
    }
}

module.exports = Riddle;