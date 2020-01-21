const express = require('express');
const controller = require('../controllers/controller');
const router = express.Router();

router.get('/', controller.getHomePage);

router.get('/create', controller.createRiddle);
router.post('/create', controller.postRiddle);

router.get('/riddles/:riddleId', controller.detailRiddle);
router.post('/like', controller.like);
router.post('/delete', controller.deleteRiddle);

module.exports = router;