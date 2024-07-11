const express = require('express');
const router = express.Router();

// Example routes for Cart model
router.get('/', (req, res) => {
    res.send('Cart Route');
});

module.exports = router;
