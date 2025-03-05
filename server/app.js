const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db");
const apiRouter = require("./routes/apiRouter");
const cors = require("cors");
const fileUpload = require("express-fileupload");

dotenv.config(); 
const app = express();

connectDB();

app.use(cors()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static("public")); 
app.use(fileUpload());

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});