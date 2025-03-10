const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.post("/", userController.create)
userRouter.get("/:username", userController.readID);
userRouter.put("/:username", userController.update);

module.exports = userRouter;