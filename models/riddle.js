const database = require('../util/database');
const mongodb = require('mongodb');

class Riddle {
  constructor(author, title, riddle, imageUrl, like = 0, date = new Date()) {
    this.title = title;
    this.author = author;
    this.riddle = riddle;
    this.like = like;
    this.image_url = imageUrl;
    this.date = date;
  }

  save() {
    database.getDB().collection('riddles').insertOne(this);
  }

  static getAll() {
    return database.getDB().collection('riddles').find().toArray()
  }

  static get(id) {
    return database.getDB().collection('riddles').findOne({ _id: new mongodb.ObjectId(id) })
  }

  static delete(id) {
    return database.getDB().collection('riddles').deleteOne({_id: new mongodb.ObjectId(id)});
  }

  static async like(id) {
    const collection = database.getDB().collection('riddles');
    const whereClause = { _id: new mongodb.ObjectId(id) };
    const riddle = await collection.findOne(whereClause);
    return collection.updateOne(whereClause, { $set: { like: ++riddle.like } });
  }
}

module.exports = Riddle;