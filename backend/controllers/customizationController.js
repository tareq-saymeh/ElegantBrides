const path = require('path');
const fs = require('fs');
const Customization = require('../models/customization'); // Assuming you have a Customization model for MongoDB

// GET /api/custom/get-customization
const getCustomization = async (req, res) => {
  try {
    
    // Fetch the customization data from the database
    const customization = await Customization.findOne();
    if (!customization) {
      return res.status(404).json({ message: 'Customization settings not found' });
    }
    res.json(customization);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/custom/update-customization
const updateCustomization = async (req, res) => {
  try {
    const { title, faviconUrl, cardColor, headerColor, backgroundColor,arabictitle,name } = req.body;
    
    // If a logo file is uploaded, save it to the server
    let logoUrl = '';
    if (req.file) {
      logoUrl = `/uploads/${req.file.filename}`;
    }

    // Update or create customization settings
    let customization = await Customization.findOne();
    if (customization) {
      // Update existing settings
      customization.title = title || customization.title;
      customization.name = name || customization.name;
      customization.arabictitle = arabictitle || customization.arabictitle;
      customization.faviconUrl = faviconUrl || customization.faviconUrl;
      customization.cardColor = cardColor || customization.cardColor;
      customization.headerColor = headerColor || customization.headerColor;
      customization.backgroundColor = backgroundColor || customization.backgroundColor;
      customization.logoUrl = logoUrl || customization.logoUrl;
    } else {
      // Create new settings
      customization = new Customization({
        title,
        name,
        arabictitle,
        faviconUrl,
        cardColor,
        headerColor,
        backgroundColor,
        logoUrl,
      });
    }

    await customization.save();
    res.json({ message: 'Customization settings updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getCustomization,
  updateCustomization,
};
