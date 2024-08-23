const express = require('express');
const { getCustomization, updateCustomization } = require('../controllers/customizationController');
const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Make sure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.post('/update-customization', upload.single('logo'), updateCustomization);


router.get('/get-customization', getCustomization);
router.post('/update-customization', updateCustomization);

module.exports = router;
