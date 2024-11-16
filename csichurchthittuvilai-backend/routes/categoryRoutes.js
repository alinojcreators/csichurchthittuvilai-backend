const express = require('express');
const router = express.Router();
const categoryControllers = require('../controllers/categoryControllers'); // Ensure the path is correct

router.post('/categories', categoryControllers.createCategory);
router.get('/categories', categoryControllers.getCategories);
router.put('/categories/:id', categoryControllers.updateCategory);
router.delete('/categories/:id', categoryControllers.deleteCategory);

module.exports = router;