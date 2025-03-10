const express = require('express');
const artistRouter = express.Router();
const artistController = require('../controllers/artistController');  

artistRouter.get("/:artistname", artistController.readID)
artistRouter.put("/:artistname", artistController.update)

module.exports = artistRouter;