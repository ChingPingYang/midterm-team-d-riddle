const Riddle = require("../models/riddle");
const Comment = require("../models/comment");
const fs = require('fs');
const util = require('../util/util');

exports.getHomePage = (req, res, next) => {
  const filter = req.query.filter;
  Riddle.getAll().then( async riddles => {
    // Filter the riddles here //
    let sortedRiddles = await util.filterRiddle(filter, riddles)
    res.render("home", { riddles: sortedRiddles, filter });
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
  const bgiImgFolder = __dirname + '/../public/img/riddle_background';
  const imgFiles = fs.readdirSync(bgiImgFolder);
  let bgImgFile = '/img/riddle_background/default.png';
  if (imgFiles && imgFiles.length !== 1) {
    bgImgFile = '/img/riddle_background/' + imgFiles[Math.floor(Math.random() * Math.floor(imgFiles.length))];
  }
  if (req.query.imgUrl) {
    bgImgFile = req.query.imgUrl;
  }

  const riddleId = req.params.riddleId;
  const isEditing = req.query.edit;

  Riddle.getOne(riddleId).then(riddle => {
    riddle.date = util.getFormattedDate(riddle.date);
    res.render("detail", {
      riddle,
      editMode: isEditing,
      bgImgFile
    });
  });
};

exports.deleteRiddle = (req, res, next) => {
  const riddleId = req.body.riddleId;
  Riddle.deleteRiddle(riddleId);
  res.redirect("/");
};

exports.like = async (req, res, next) => {
  const riddleId = req.body.riddleId;
  const imgUrl = req.body.imgUrl;
  await Riddle.like(riddleId);
  res.redirect('/riddles/' + riddleId + '?imgUrl=' + imgUrl);
}