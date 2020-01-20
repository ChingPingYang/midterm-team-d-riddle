const database = require('../util/database');
const mongodb = require('mongodb');

class Riddle {
    constructor(author, title, content) {
        this.author = author;
        this.title = title;
        this.content = content;
    }

    saveRiddle() {
        database.getDB().collection('riddles').insertOne(this)
            .then(result => {
                console.log(result);
                console.log('success!');
            })
            .catch(err => {
                console.log(err);
            });
    }

    static getAll() {
        return database.getDB().collection('riddles').find().toArray()
            .then(result => {
                console.log("result", result)
                return result;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static deleteRiddle(id) {
        return database.getDB().collection('riddles').deleteOne({_id: new mongodb.ObjectId(id)});
    }

    static updateRiddle(id, title, content) {
        return database.getDB().collection('riddles')
            .updateOne({_id: new mongodb.ObjectId(id)}, {$set: {title: title, content: content}});
    }
}

module.exports = Riddle;