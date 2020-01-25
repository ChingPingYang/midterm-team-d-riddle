const express = require('express');
const controller = require('../controllers/controller');
const router = express.Router();

router.get('/', controller.getHomePage);

router.get('/create', controller.createRiddle);
router.post('/create', controller.postRiddle);

router.get('/riddles/:riddleId', controller.detailRiddle);
router.post('/like', controller.like);
router.post('/delete', controller.deleteRiddle);

router.get('/comment/create', controller.showCommentForm);
router.post('/comment/create', controller.createComment);
router.get('/comment/edit', controller.editComment);
router.post('/comment/update', controller.updateComment);
router.post('/comment/delete', controller.deleteComment);

module.exports = router;