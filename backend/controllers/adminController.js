const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');

// Update Admin Email
exports.updateEmail = async (req, res) => {
    const { oldEmail, newEmail, currentPassword } = req.body;
    
    try {
        // Find the admin by the old email
        const admin = await Admin.findOne({ email: oldEmail });

        if (!admin) {
            return res.status(400).json({ message: "Old email is incorrect" });
        }


        // Update the email
        admin.email = newEmail;
        await admin.save();

        res.status(200).json({ message: "Email updated successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update Admin Password
exports.updateAdminPassword = async (req, res) => {
    const { currentPassword, newPassword , CurrentEmail } = req.body;

    try {
        // Find the admin using the email stored in req.admin
        const admin = await Admin.findOne({ email:CurrentEmail});
        
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Verify the current password
        const isPasswordMatch = await bcrypt.compare(currentPassword, admin.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        // Hash the new password before saving
        admin.password = newPassword
        await admin.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
