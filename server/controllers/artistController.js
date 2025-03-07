const asyncHandler = require("express-async-handler");
const User = require("../models/artistModel");
const path = require("path");
const fs = require("fs");

module.exports = {

    readID: asyncHandler(async (req, res) => {
        try {
            const artist = await Artist.findOne({ artistname: req.params.artistname });
            console.log(artist);
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
        const { artistname, bio, picture } = req.body;

        try {
            const artist = await Artist.findById(req.params.id);

            if (artist) {
                artist.artistname = artistname || artist.artistname;
                artist.bio = bio || artist.bio;
                artist.picture = picture || artist.picture;

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