const express = require('express');
const router = express.Router();
const offeringControllers = require('../controllers/offeringController');

router.post('/offerings', offeringControllers.createOffering);
router.get('/offerings', offeringControllers.getOfferings);
router.put('/offerings/:id', offeringControllers.updateOffering);
router.delete('/offerings/:id', offeringControllers.deleteOffering);

module.exports = router;