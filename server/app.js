const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

const apiRouter = require("./routes/apiRouter");

dotenv.config(); 
const app = express();

connectDB();

const allowedOrigins = ["http://localhost:5173", "https://ccapdev-alboom.onrender.com"];
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
app.use(express.static("public")); 
app.use(fileUpload());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
});