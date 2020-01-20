const Riddle = require("../models/riddle");
const Comment = require("../models/comment");

exports.getHomePage = (req, res, next) => {
  Riddle.getAll().then(riddles => {
    console.log("riddles", riddles);
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

exports.seeRiddle = (req, res, next) => {
  const riddleId = req.params.riddleId;
  const isEditing = req.query.edit;

  riddle.getAll().then(riddles => {
    const riddle = riddles.find(nt => nt._id == riddleId);

    res.render("detail", { riddle: riddle, editMode: isEditing });
  });
};

exports.deleteRiddle = (req, res, next) => {
  const riddleId = req.body.riddleId;
  console.log(riddleId);
  riddle.deleteRiddle(riddleId);
  res.redirect("/home");
};

exports.updateRiddle = (req, res, next) => {
  const riddleId = req.body.riddleId;
  const title = req.body.title;
  const content = req.body.content;

  riddle.updateRiddle(riddleId, title, content);
  res.redirect("/detail/" + riddleId);
};
