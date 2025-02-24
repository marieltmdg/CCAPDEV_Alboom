const { Router } = require("express")
const albumRouter = Router()
const albumController = require("../controllers/albumController")

albumRouter.post("/", albumController.create)

albumRouter.get("/", albumController.read)
albumRouter.get("/:id", albumController.readID)

albumRouter.put("/:id", albumController.update)

albumRouter.delete("/:id", albumController.delete)

module.exports = albumRouter