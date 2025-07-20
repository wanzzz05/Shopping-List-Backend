const express = require('express');
const router = express.Router();

const {getItems,createItem,deleteItem, updateItem} = require('../controllers/itemController');

router.route('/').get(getItems);

router.route('/').post(createItem);

router.route('/:id').delete(deleteItem);

router.route('/:id').put(updateItem);

module.exports = router;