// controllers/logController.js
const Log = require('../models/log');

// Get all logs
exports.getAllLogs = async (req, res) => {
    try {
        const logs = await Log.find()
        .populate('items.itemId') // Populate items field with Item documents
        .populate('userId', 'name email Phone') // Populate userId field with User documents (selecting only name and email)
        .exec();
        res.status(200).json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
