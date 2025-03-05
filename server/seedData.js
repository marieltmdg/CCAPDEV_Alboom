const mongoose = require("mongoose");
const User = require("./models/userModel");
const dotenv = require("dotenv");

dotenv.config(); 

const connectDB = require("./db");

const seedUsers = require("./seeds/seedUsers");
//insert other seeds here

const seedData = async () => {
    await connectDB();
    await seedUsers();
    //insert other seeds here
    process.exit();
};

seedData();