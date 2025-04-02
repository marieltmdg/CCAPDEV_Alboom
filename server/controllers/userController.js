const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const path = require("path");
const fs = require("fs");

const passport = require("passport");
const generatePassword = require("../lib/passportUtils").generatePassword;

module.exports = {
    create: asyncHandler(async (req, res) => {
        const { username, email, password, bio } = req.body;
        let picture = null;

        if (req.files && req.files.photo) {
            const photo = req.files.photo;
            const uploadPath = "uploads/" + email;

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

            const saltHash = generatePassword(password);

            const salt = saltHash.salt;
            const hash = saltHash.hash;

            const user = new User({
                username,
                email,
                picture,
                bio,
                country: "Unknown",
                link: "Unknown",
                hash,
                salt,
            });

            const createdUser = await user.save();
            res.status(201).json(createdUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }),

    read: asyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        res.json(user);
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
        const { bio, picture, latest_review, country, link } = req.body;
    
        try {
            const user = await User.findOne( { username: req.params.username }); 
    
            if (user) {
                user.bio = bio || user.bio;
                user.picture = picture || user.picture;
                user.latest_review = latest_review || user.latest_review;
                user.country = country || user.country;
                user.link = link || user.link;

                if (req.files && req.files.picture) {
                    const file = req.files.picture;
                    const uploadDir = "uploads/" + user.email;
                    
                    if (!fs.existsSync(uploadDir)) {
                        fs.mkdirSync(uploadDir, { recursive: true });
                    }
        
                    picturePath = `uploads/${user.email}/${Date.now()}-${file.name}`;
                    await file.mv(picturePath);
        
                    user.picture = picturePath;
                }
    
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

    login: (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
            if (err) return next(err);

            if (!user) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            req.logIn(user, (err) => {
                if (err) return next(err);
                return res.json({ success: true, user });
            });
        })(req, res, next);
    },

    logout: (req, res, next) => {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            
            req.session.destroy((err) => {
                if (err) {
                    return res.status(500).json({ message: "Failed to destroy session" });
                }
                
                res.clearCookie("connect.sid", { path: "/" });
                return res.json({ success: true });
            });
        });
    },

    status: (req, res) => {
        if (req.isAuthenticated()) {
            return res.json({ authenticated: true, user: req.user, type: req.user.type });
        }
        else {
            return res.status(401).json({ authenticated: false, message: "Not logged in" });
        }
    }
};