const Riddle = require("../models/riddle");
const Comment = require("../models/comment");

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
  const riddleId = req.params.riddleId;
  const isEditing = req.query.edit;

  Riddle.getOne(riddleId).then(riddle => {
    riddle.date = + ('0' + riddle.date.getDate()).slice(-2)
    + '/' + ('0' + (riddle.date.getMonth() + 1)).slice(-2)
      + '/' + riddle.date.getFullYear();
    res.render("detail", { riddle: riddle, editMode: isEditing });
  });
};

exports.deleteRiddle = (req, res, next) => {
  const riddleId = req.body.riddleId;
  Riddle.deleteRiddle(riddleId);
  res.redirect("/");
};

exports.like = async (req, res, next) => {
  const riddleId = req.body.riddleId;
  await Riddle.like(riddleId);
  res.redirect('/riddles/' + riddleId);
}