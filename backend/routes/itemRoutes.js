const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemController');

// CRUD operations
router.get('/accessories', itemsController.getAllAccessories);
router.post('/', itemsController.createItem);
router.put('/:id', itemsController.updateItem);
router.delete('/:id', itemsController.deleteItem);

module.exports = router;
