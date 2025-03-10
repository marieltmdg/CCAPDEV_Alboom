const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

const apiRouter = require("./routes/apiRouter");
const userRouter = require("./routes/userRouter");
const artistRouter = require("./routes/artistRouter");
const albumRouter = require("./routes/albumRouter");

dotenv.config(); 
const app = express();

connectDB();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static("public")); 
app.use(fileUpload());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", apiRouter);
app.use("/api/user", userRouter);
app.use("/api/artist", artistRouter);
app.use("/api/album", albumRouter);

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
});