const express = require('express');
const router = express.Router();

// Example routes for Admin model
router.get('/', (req, res) => {
    res.send('Admin Route');
});

module.exports = router;
