const Items = require('../models/Items');
const mongoose = require('mongoose');
const User = require('../models/User');
const Reservation = require('../models/Reservations');

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = {
      ...(type && { type }), 
      quantity: { $ne: 0 }   
    };

    const items = await Items.find(filter);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.savedItem = async (req, res) => {
  try {
    const { id } = req.body;
    const userId = req.user;

    if (!id) {
      return res.status(400).json({ message: 'Item ID is required' });
    }

    const item = await Items.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const itemIndex = user.SavedItems.indexOf(item._id);
    if (itemIndex !== -1) {
      user.SavedItems.splice(itemIndex, 1);
    } else {
      user.SavedItems.push(item._id);
    }

    await user.save();
    res.status(200).json({ message: 'Item saved status toggled successfully', user });
  } catch (error) {
    console.error('Error saving item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new item
exports.createItem = async (req, res) => {
  const { name, size, brand, color, BuyAble, RentAble, description, type, price, quantity } = req.body;
  const images = req.files.map(file => file.filename);
  console.log(images);
  
  if (!name || !price || images.length === 0) {
    return res.status(400).json({ message: 'Name, type, images, and price are required.' });
  }

  if (price < 0 || quantity < 0) {
    return res.status(400).json({ message: 'Price and quantity must be positive values.' });
  }

  try {
    const newItem = new Items({
      name,
      size,
      brand,
      color,
      BuyAble,
      RentAble,
      description,
      type,
      price,
      quantity,
      image :images
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating item: ' + error.message });
  }
};

// Update an item
const fs = require('fs');
const path = require('path');

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, size, brand, color, BuyAble, RentAble, description, type, price, quantity } = req.body;
  const images = req.files.map(file => file.filename);
  
  let deletedImages = [];
  if (req.body.deletedImages) {
    try {
      deletedImages = JSON.parse(req.body.deletedImages); // Parse the string into an array
    } catch (error) {
      return res.status(400).json({ message: 'Invalid format for deletedImages' });
    }
  }

  try {
    const item = await Items.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Delete specified images from the filesystem and item
    if (deletedImages.length > 0) {
      deletedImages.forEach(image => {
        const imagePath = path.join(__dirname, '..', 'uploads', image);
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error(`Failed to delete image: ${image}`, err);
          }
        });
        item.image = item.image.filter(img => img !== image);
      });
    }

    // Add new images
    if (images.length > 0) {
      item.image.push(...images);
    }

    // Update other fields
    item.name = name || item.name;
    item.size = size || item.size;
    item.brand = brand || item.brand;
    item.color = color || item.color;
    item.BuyAble = BuyAble !== undefined ? BuyAble : item.BuyAble;
    item.RentAble = RentAble !== undefined ? RentAble : item.RentAble;
    item.description = description || item.description;
    item.type = type || item.type;
    item.price = price || item.price;
    item.quantity = quantity || item.quantity;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Get a single item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Items.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    const reservations = await Reservation.find({ "items.itemId": req.params.id });
    let unavailableDates = [];
    reservations.forEach(reservation => {
      reservation.items.forEach(item => {
        if (item.itemId.toString() === req.params.id) {
          let current = new Date(item.receivedDate);
          const end = new Date(item.returnDate);
          while (current <= end) {
            unavailableDates.push(new Date(current));
            current.setDate(current.getDate() + 1);
          }
        }
      });
    });

    res.json({ item, unavailableDates });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.deleteItem = async (req, res) => {
  try {
    const deletedItem = await Items.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};