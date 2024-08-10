const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemController');
const multer = require('multer');
const path = require('path');

// Set up Multer storage and file filter
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Add routes
router.post('/add', upload.single('image'), itemsController.createItem);
router.put('/edit/:id', upload.single('image'), itemsController.updateItem); // correct route name from 'edite' to 'edit'
router.get('/', itemsController.getAllItems);
router.delete('/:id', itemsController.deleteItem);
router.get('/:id', itemsController.getItemById); 


module.exports = router;
