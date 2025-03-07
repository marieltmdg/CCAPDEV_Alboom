const asyncHandler = require("express-async-handler")

const albumModel = require("../models/albumModel.js")

module.exports = {
    read: asyncHandler(async (req, res) => {
        const albums = await albumModel.find({})
        res.json(albums)
    }),

    readID: asyncHandler(async (req, res) => {
        // Read ID API Endpoint
    }),

    update: asyncHandler(async (req, res) => {
        // Update API Endpoint
    }),

    delete: asyncHandler(async (req, res) => {
        // Delete API Endpoint
    }),
}