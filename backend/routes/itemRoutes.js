const express = require('express');
const router = express.Router();

// Example routes for Items model
router.get('/', (req, res) => {
    res.send('Items Route');
});

module.exports = router;
