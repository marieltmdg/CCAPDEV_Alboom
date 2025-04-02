const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

const session = require("express-session");
var passport = require("passport");
var crypto = require("crypto");
const MongoStore = require("connect-mongo");

const apiRouter = require("./routes/apiRouter");

dotenv.config(); 
const app = express();

connectDB();

const allowedOrigins = ["http://localhost:5173", "https://alboom.onrender.com"];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(fileUpload());

app.use(express.static(path.join(__dirname, "build")));
app.use(express.static("public")); 

const sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collection: "sessions",
});

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
}));

require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//     console.log("SESSION AND USER DETAILS");
//     console.log(req.session);
//     console.log(req.user);
//     next();
// });

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", apiRouter);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
});