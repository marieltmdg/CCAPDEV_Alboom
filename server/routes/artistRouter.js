const express = require('express');
const artistRouter = express.Router();
const artistController = require('../controllers/artistController');  

artistRouter.get("/:username", artistController.readID)
artistRouter.put("/:username", artistController.update)

module.exports = artistRouter;