const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { auth } = require('../middleware/authMiddleware');

// Ensure the uploads folder exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Set up Multer storage and file filter
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

// Optional file filter to restrict uploaded file types
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
  }
};

// Set up Multer with storage, file filter, and file size limit
const upload = multer({
  storage,
  fileFilter,
});

// Add routes
router.post('/add', upload.array('images', 5), itemsController.createItem); // Limit to 5 files
router.put('/edit/:id', upload.array('images', 5), itemsController.updateItem); // Limit to 5 files
router.get('/', itemsController.getAllItems);
router.get('/:id', itemsController.getItemById); 
router.delete('/:id', itemsController.deleteItem);
router.post('/saved', auth, itemsController.savedItem);

module.exports = router;
