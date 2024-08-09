// controllers/logController.js
const Log = require('../models/log');

// Get all logs
exports.getAllLogs = async (req, res) => {
    try {
        const logs = await Log.find().populate('items').populate('userId').exec();
        res.status(200).json(logs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
