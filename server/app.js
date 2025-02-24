const express = require("express")

const apiRouter = require("./routes/apiRouter")

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use("/api", apiRouter)

app.use((err, req, res, next) => {
    // Error Middleware
})

app.listen(3000)