const Items = require('../models/Items');
const mongoose = require('mongoose');
const User = require('../models/User');
const Reservation = require('../models/Reservations');
const path = require('path');

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const { type } = req.query;
    // Build the filter object
    const filter = {
      ...(type && { type }), // Include type filter if provided
      quantity: { $ne: 0 }   // Exclude items with quantity equal to 0
    };

    // Fetch items from the database with the constructed filter
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
  const images = req.files ? req.files.map(file => file.path) : []; // Handle multiple images

  if (!name || !price) {
    return res.status(400).json({ message: 'Name, type, and price are required.' });
  }

  try {
    const newItem = new Items({ name, size, brand, color, BuyAble, RentAble, description, type, price, quantity, image: images });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an item
exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, size, brand, color, BuyAble, RentAble, description, type, price, quantity } = req.body;
  const images = req.files ? req.files.map(file => file.path) : null; // Handle multiple images

  try {
    const updatedItem = await Items.findByIdAndUpdate(
      id,
      { name, size, brand, color, BuyAble, RentAble, description, type, quantity, price, ...(images && { image: images }) },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an item
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
