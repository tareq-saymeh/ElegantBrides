const express = require('express');
const router = express.Router();

// Example routes for Reservation model
router.get('/', (req, res) => {
    res.send('Reservation Route');
});

module.exports = router;
