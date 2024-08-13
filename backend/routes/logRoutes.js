// routes/logRoute.js
const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');
const { auth } = require('../middleware/authMiddleware');

// Get all logs
router.get('/', logController.getAllLogs);

router.get('/userData',auth, logController.getUserData);

module.exports = router;
