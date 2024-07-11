const express = require('express');
const router = express.Router();

// Example routes for User model
router.get('/', (req, res) => {
    res.send('User Route');
});

module.exports = router;
