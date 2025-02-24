const asyncHandler = require("express-async-handler")

module.exports = {
    create: asyncHandler(async (req, res) => {
        // Create API Endpoint
    }),

    read: asyncHandler(async (req, res) => {
        // Read API Endpoint
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