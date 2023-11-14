const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/ticketsController');

router.get('/new', ticketsController.new);
router.post('/', ticketsController.create);

module.exports = router;
