const database = require("../util/database");
const mongodb = require("mongodb");

class Comment {
  constructor(riddleId, author, comment, vote) {
    this.riddle_id = riddleId;
    this.author = author;
    this.comment = comment;
    this.vote = vote;
  }

  saveComment() {
    database
      .getDB()
      .collection("comments")
      .insertOne(this)
      .then(result => {
        console.log(result);
        console.log("success!");
      })
      .catch(err => {
        console.log(err);
      });
  }

  static getAllComment() {
    return database
      .getDB()
      .collection("comments")
      .find()
      .toArray()
      .then(result => {
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static getOneComment(commentId) {
    return database.getDB().collection('comments').findOne({ _id: new mongodb.ObjectId(commentId) });
  }

  static async deleteComment(id) {
    return database
      .getDB()
      .collection("comments")
      .deleteOne({ _id: new mongodb.ObjectId(id) });
  }

  static async deleteAllComment(riddleId) {
    return database
      .getDB()
      .collection("comments")
      .deleteMany( { riddle_id: riddleId } );
  }

  static updateComment(id, author, comment) {
    return database
      .getDB()
      .collection("comments")
      .updateOne(
        { _id: new mongodb.ObjectId(id) },
        { $set: { author: author, comment: comment } }
      );
  }

  static async voteComment(id, value) {
    let comment = await this.getOneComment(id)
    let newValue = comment.vote + value
    if(newValue <= 0) {
      newValue = 0;
    }
    return database.getDB().collection('comments')
           .updateOne({_id: new mongodb.ObjectId(id)}, {$set: {vote: newValue}});
  }
}

module.exports = Comment;
