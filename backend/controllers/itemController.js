const Items = require('../models/Items');
const mongoose = require('mongoose');
const path = require('path');

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Items.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new item
exports.createItem = async (req, res) => {
  const { name, size, brand, color, BuyAble, RentAble, description, type, price } = req.body;
  const image = req.file ? req.file.path : null;

  if (!name || !price) {
    return res.status(400).json({ message: 'Name, type, and price are required.' });
  }

  try {
    const newItem = new Items({ name, size, brand, color, BuyAble, RentAble, description, type, price, image });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an item
exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { name, size, brand, color, BuyAble, RentAble, description, type, price } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const updatedItem = await Items.findByIdAndUpdate(
      id,
      { name, size, brand, color, BuyAble, RentAble, description, type, price, ...(image && { image }) },
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
