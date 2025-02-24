const express = require("express")
const apiRouter = express.Router()
const albumRouter = require("./albumRouter")

apiRouter.use("/albums", albumRouter)

module.exports = apiRouter