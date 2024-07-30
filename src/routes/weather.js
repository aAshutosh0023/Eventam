const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weather');

router.get('/:location', weatherController.getWeatherData);

module.exports = router;
