const asyncHandler = require("express-async-handler");
const Artist = require("../models/artistModel");
const path = require("path");
const fs = require("fs");

module.exports = {

    readID: asyncHandler(async (req, res) => {
        try {
            const artist = await Artist.findOne({ artistname: new RegExp(`^${req.params.artistname}$`, "i") });
            
            if (artist) {
                res.json(artist);
            } else {
                res.status(404).json({ message: "Artist not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }),

    update: asyncHandler(async (req, res) => {
        const { bio, picture, country, link } = req.body;

        try {
            const artist = await Artist.findOne({ artistname: req.params.artistname });

            if (artist) {
                artist.bio = bio || artist.bio;
                artist.picture = picture || artist.picture;
                artist.country = country || artist.country;
                artist.link = link || artist.link;

                if (req.files && req.files.picture) {
                    const file = req.files.picture;
                    const uploadDir = "uploads/" + artist.email;
                    
                    if (!fs.existsSync(uploadDir)) {
                        fs.mkdirSync(uploadDir, { recursive: true });
                    }
        
                    picturePath = `uploads/${artist.email}/${Date.now()}-${file.name}`;
                    await file.mv(picturePath);
        
                    artist.picture = picturePath;
                }

                const updatedArtist = await artist.save();
                res.json(updatedArtist);
            } else {
                res.status(404).json({ message: "Artist not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }),

};