// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};
const getSavedItems = async (req, res) => {
  try {
    
      const user = await User.findById({ _id: req.user }) 
          .populate('SavedItems') 
          .exec();
        
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Respond with the populated SavedItems
      res.status(200).json(user.SavedItems);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching saved items', error });
  }
};

const updateUser = async (req, res) => {
    try {
        
      const { name, email, phone, password } = req.body;
      const user = await User.findById({ _id: req.user })
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      user.name = name || user.name;
      user.email = email || user.email;
      user.Phone = phone || user.Phone;
  
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }
  
      await user.save();
      res.json({ msg: 'Profile updated successfully', user });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  


// Export the functions
module.exports = {
    getAllUsers,
    getSavedItems,
    updateUser
};
