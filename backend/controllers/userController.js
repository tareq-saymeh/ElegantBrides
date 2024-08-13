// controllers/userController.js
const User = require('../models/User');

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




// Export the functions
module.exports = {
    getAllUsers,
    getSavedItems
};
