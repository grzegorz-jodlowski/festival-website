const express = require('express');
const router = express.Router();

const WorkshopController = require('../controllers/workshops.controller');

router.get('/workshops', WorkshopController.getAll);
router.get('/workshops/random', WorkshopController.getRandom);
router.get('/workshops/:id', WorkshopController.getById);

// router.post('/workshops', WorkshopController.postSeat);

// router.put('/workshops/:id', WorkshopController.updateSeat);

// router.delete('/workshops/:id', WorkshopController.deleteSeat);

module.exports = router;