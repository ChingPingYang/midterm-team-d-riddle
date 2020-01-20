const database = require('../util/database');
const mongodb = require('mongodb');

class Comment {
    constructor(author, title, content) {
        this.author = author;
        this.title = title;
        this.content = content;
    }

    saveComment() {
        database.getDB().collection('comments').insertOne(this)
            .then(result => {
                console.log(result);
                console.log('success!');
            })
            .catch(err => {
                console.log(err);
            });
    }

    static getAll() {
        return database.getDB().collection('comments').find().toArray()
            .then(result => {
                console.log(result);
                return result;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static deleteComment(id) {
        return database.getDB().collection('comments').deleteOne({_id: new mongodb.ObjectId(id)});
    }

    static updateComment(id, title, content) {
        return database.getDB().collection('comments')
            .updateOne({_id: new mongodb.ObjectId(id)}, {$set: {title: title, content: content}});
    }
}

module.exports = Comment;