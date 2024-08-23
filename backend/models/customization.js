const mongoose = require('mongoose');

const customizationSchema = new mongoose.Schema({
adminId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Admin' },
title: { type: String, default: 'Discover the perfect dress for your special day' },
name: { type: String, default: 'ElegantBridel' },
arabictitle: { type: String, default: 'اكتشف الفستان المثالي ليومك الخاص' },
faviconUrl: { type: String, default: '/favicon.ico' },
cardColor: { type: String, default: '#161616' },
headerColor: { type: String, default: '#161616' },
backgroundColor: { type: String, default: '#C0C0C0' },
logoUrl: { type: String, default: '' },
});
const Custom = mongoose.model('Customization', customizationSchema);
module.exports = Custom
