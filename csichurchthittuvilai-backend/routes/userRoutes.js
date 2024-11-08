const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const { authenticate, authorizeRole } = require('../middleware/auth');

// Public routes
router.post('/register', userController.register); // Remove authentication for registration
router.post('/login', userController.login); // Add login route

// Protected routes
router.get('/', authenticate, authorizeRole(['admin', 'super-admin']), userController.getAllUsers); // Admin and Super Admin only
router.put('/:id/role', authenticate, authorizeRole(['super-admin']), userController.updateUserRole); // Super Admin only

module.exports = router;