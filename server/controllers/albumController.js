const asyncHandler = require("express-async-handler")

const albumModel = require("../models/albumModel.js")

module.exports = {
    read: asyncHandler(async (req, res) => {
        const albums = await albumModel.find({})
        res.json(albums)
    }),

    readID: asyncHandler(async (req, res) => {
        const selectedAlbum = await albumModel.findById(req.params.id).populate("artist_id")
        res.json(selectedAlbum) 
    }),

    update: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { title, cover, artist_id, release_date, description } = req.body;

        try {
            const updatedAlbum = await albumModel.findByIdAndUpdate(
                id,
                { title, cover, artist_id, release_date, description },
                { new: true, runValidators: true }
            );

            if (!updatedAlbum) {
                return res.status(404).json({ message: "Album not found" });
            }

            res.json(updatedAlbum);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }),

    delete: asyncHandler(async (req, res) => {
        // Delete API Endpoint
    }),
}