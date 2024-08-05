const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemController');

router.post('/add', itemsController.createItem);
router.put('/edit/:id', itemsController.updateItem);  // correct route name from 'edite' to 'edit'
router.get('/', itemsController.getAllItems);
router.delete('/:id', itemsController.deleteItem);

module.exports = router;
