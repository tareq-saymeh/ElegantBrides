const express = require('express');
const router = express.Router();

// Example routes for Log model
router.get('/', (req, res) => {
    res.send('Log Route');
});

module.exports = router;
