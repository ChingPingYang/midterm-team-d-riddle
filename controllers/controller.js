const Riddle = require("../models/riddle");
const Comment = require("../models/comment");
const fs = require("fs");
const util = require("../util/util");
const url = require("url");

exports.getHomePage = (req, res, next) => {
  Riddle.getAll().then(riddles => {
    res.render("home", { riddles: riddles });
  });
};

exports.createRiddle = (req, res, next) => {
  res.render("create");
};

exports.postRiddle = (req, res, next) => {
  const riddle = new Riddle(req.body.author, req.body.title, req.body.content);
  riddle.saveRiddle();
  res.redirect("/");
};

exports.detailRiddle = (req, res, next) => {
  // prepare background image
  const bgiImgFolder = __dirname + "/../public/img/riddle_background";
  const imgFiles = fs.readdirSync(bgiImgFolder);
  let bgImgFile = "/img/riddle_background/default.png";
  if (imgFiles && imgFiles.length !== 1) {
    bgImgFile =
      "/img/riddle_background/" +
      imgFiles[Math.floor(Math.random() * Math.floor(imgFiles.length))];
  }
  if (req.query.imgUrl) {
    bgImgFile = req.query.imgUrl;
  }

  const riddleId = req.params.riddleId;
  const isEditing = req.query.edit;

  Riddle.getOne(riddleId).then(riddle => {
    riddle.date = util.getFormattedDate(riddle.date);
    Comment.getAllComment().then(comments => {
      res.render("detail", {
        riddle,
        comments,
        editMode: isEditing,
        bgImgFile,
        editComment: req.query.editComment,
        editCommentId: req.query.editCommentId
      });
    });
  });
};

exports.deleteRiddle = async (req, res, next) => {
  const riddleId = req.body.riddleId;
  await Comment.deleteAllComment(riddleId); // TODO: fix await to start those request at the same time.
  await Riddle.deleteRiddle(riddleId);
  res.redirect("/");
};

exports.like = async (req, res, next) => {
  const riddleId = req.body.riddleId;
  const imgUrl = req.body.imgUrl;
  await Riddle.like(riddleId);
  res.redirect("/riddles/" + riddleId + "?imgUrl=" + imgUrl);
};

exports.createComment = (req, res, next) => {
  const comment = new Comment(
    req.body.riddleId,
    req.body.author,
    req.body.comment,
    0,
    0
  );
  comment.saveComment();
  res.redirect("/riddles/" + req.body.riddleId);
};

exports.editComment = (req, res, next) => {
  res.redirect(
    url.format({
      pathname: "/riddles/" + req.query.riddleId,
      query: {
        editComment: true,
        editCommentId: req.query.commentId
      }
    })
  );
};

exports.updateComment = async (req, res, next) => {
  await Comment.updateComment(req.body.commentId, req.body.author, req.body.comment);
  res.redirect("/riddles/" + req.body.riddleId);
};

exports.deleteComment = async (req, res, next) => {
  await Comment.deleteComment(req.body.commentId);
  res.redirect("/riddles/" + req.body.riddleId);
};