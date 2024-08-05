const Items = require('../models/Items');
const mongoose = require('mongoose');

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
  const { name, size, brand, color, BuyAble, RentAble, description, type, price, rating, image } = req.body;
  console.log(req.body);
  if (!name || !price) {
    return res.status(400).json({ message: 'Name, type, and price are required.' });
  }

  try {
    const newItem = new Items({ name, size, brand, color, BuyAble, RentAble, description, type, price, rating, image });
    const savedItem = await newItem.save();
    console.log("Item saved:", savedItem);
    res.status(201).json(savedItem);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
exports.updateItem = async (req, res) => {
  try {
    const updatedItem = await Items.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
