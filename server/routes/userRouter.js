const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.post("/", userController.create)
userRouter.get("/read/:id", userController.read);
userRouter.get("/:username", userController.readID);
userRouter.put("/:username", userController.update);

userRouter.post("/login", userController.login);
userRouter.post("/logout", userController.logout);
userRouter.get("/status", userController.status);

module.exports = userRouter;