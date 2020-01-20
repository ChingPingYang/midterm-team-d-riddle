const database = require('../util/database');
const mongodb = require('mongodb');

class Note {
    constructor(author, title, content) {
        this.author = author;
        this.title = title;
        this.content = content;
    }

    saveNote() {
        database.getDB().collection('notes').insertOne(this)
            .then(result => {
                console.log(result);
                console.log('success!');
            })
            .catch(err => {
                console.log(err);
            });
    }

    static getAll() {
        return database.getDB().collection('notes').find().toArray()
            .then(result => {
                console.log(result);
                return result;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static deleteNote(id) {
        return database.getDB().collection('notes').deleteOne({_id: new mongodb.ObjectId(id)});
    }

    static updateNote(id, title, content) {
        return database.getDB().collection('notes')
            .updateOne({_id: new mongodb.ObjectId(id)}, {$set: {title: title, content: content}});
    }
}

module.exports = Note;