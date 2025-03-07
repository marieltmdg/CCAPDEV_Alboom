const asyncHandler = require("express-async-handler")

const albumModel = require("../models/albumModel.js")

module.exports = {
    read: asyncHandler(async (req, res) => {
        const albums = await albumModel.find({})
        res.json(albums)
    }),

    readID: asyncHandler(async (req, res) => {
        console.log(req.params.id)
        const selectedAlbum = await albumModel.findById(req.params.id) 
        res.json(selectedAlbum)    
    }),

    update: asyncHandler(async (req, res) => {
        // Update API Endpoint
    }),

    delete: asyncHandler(async (req, res) => {
        // Delete API Endpoint
    }),
}