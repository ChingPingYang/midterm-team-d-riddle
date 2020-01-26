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
    database.getDB().collection('riddles').insertOne(this);
  }

  static getAll() {
    return database.getDB().collection('riddles').find().toArray()
  }

  static getOne(riddleId) {
    return database.getDB().collection('riddles').findOne({ _id: new mongodb.ObjectId(riddleId) })
  }

  static deleteRiddle(id) {
    return database.getDB().collection('riddles').deleteOne({_id: new mongodb.ObjectId(id)});
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