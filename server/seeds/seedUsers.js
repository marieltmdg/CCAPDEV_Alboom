const mongoose = require("mongoose");
const User = require("../models/userModel");
const path = require("path");

const seedUsers = async () => {
    const users = [
        {
            username: "johndoe",
            email: "johndoe@gmail.com",
            password: "password",
            picture: path.join(__dirname, "..", "uploads", "johndoe.jpg"), // Correct path
            bio: "I love music, like a lot.",
            latest_review: null,
        },
        {
            username: "janedoe",
            email: "janedoe@gmail.com",
            password: "password",
            picture: path.join(__dirname, "..", "uploads", "janedoe.jpg"), // Correct path
            bio: "I don't like music, my friend just created this site.",
            latest_review: null,
        },
        {
            username: "paolo",
            email: "paolo@yahoo.com",
            password: "password",
            picture: path.join(__dirname, "..", "uploads", "paolo.jpg"), // Correct path
            bio: "Definitely not a bot.",
            latest_review: null,
        },
    ];

    try {
        await User.insertMany(users);
        console.log("Sample users populated");
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

module.exports = seedUsers;