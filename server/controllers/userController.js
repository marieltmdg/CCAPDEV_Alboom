const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const path = require("path");
const fs = require("fs");

module.exports = {
    create: asyncHandler(async (req, res) => {
        const { username, email, password, bio } = req.body;
        let picture = null;

        if (req.files && req.files.photo) {
            const photo = req.files.photo;
            const uploadPath = path.join(__dirname, "..", "uploads", email);

            fs.mkdirSync(uploadPath, { recursive: true });

            const photoPath = path.join(uploadPath, `${Date.now()}-${photo.name}`);
            await photo.mv(photoPath);
            picture = photoPath;
        }

        try {
            const emailExists = await User.findOne({ email });
            const userExists = await User.findOne({ username });

            if (emailExists) {
                return res.status(400).json({ message: "Email already has an account" });
            }

            if (userExists) {
                return res.status(400).json({ message: "User already exists" });
            }

            const user = new User({
                username,
                email,
                password,
                picture,
                bio,
                latest_review: null,
            });

            const createdUser = await user.save();
            res.status(201).json(createdUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }),

    readID: asyncHandler(async (req, res) => {
        try {
            const user = await User.findOne({ username: req.params.username });
            console.log(user);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }),

    update: asyncHandler(async (req, res) => {
        const { username, bio, picture } = req.body;

        try {
            const user = await User.findById(req.params.id);

            if (user) {
                user.username = username || user.username;
                user.bio = bio || user.bio;
                user.picture = picture || user.picture;

                const updatedUser = await user.save();
                res.json(updatedUser);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }),

    delete: asyncHandler(async (req, res) => {
        try {
            const user = await User.findById(req.params.id);

            if (user) {
                await user.remove();
                res.json({ message: "User removed" });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }),
};