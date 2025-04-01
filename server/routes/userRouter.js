const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.post("/", userController.create)
userRouter.post("/login", userController.login);
userRouter.get("/read/:id", userController.read);
userRouter.get("/:username", userController.readID);
userRouter.put("/:username", userController.update);

module.exports = userRouter;