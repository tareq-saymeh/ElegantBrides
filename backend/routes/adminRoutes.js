const express = require('express');
const router = express.Router();
const { updateEmail, updateAdminPassword } = require('../controllers/adminController'); // Adjust path if necessary

// Route to update email
router.patch('/update-email', updateEmail);

// Route to update password
router.patch('/update-password', updateAdminPassword);

module.exports = router;
