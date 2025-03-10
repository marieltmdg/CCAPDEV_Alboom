const asyncHandler = require("express-async-handler")

const albumModel = require("../models/albumModel.js")

module.exports = {
    read: asyncHandler(async (req, res) => {
        const albums = await albumModel.find({})
        res.json(albums)
    }),

    readID: asyncHandler(async (req, res) => {
        const selectedAlbum = await albumModel.findById(req.params.albumID).populate("artist_id", "artistname");
        
        if (!selectedAlbum) {
            return res.status(404).json({ error: "Album not found" });
        }
    
        res.json(selectedAlbum);
    }),
    

    update: asyncHandler(async (req, res) => {
        // Update API Endpoint
    }),

    delete: asyncHandler(async (req, res) => {
        // Delete API Endpoint
    }),
}