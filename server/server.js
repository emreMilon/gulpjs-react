let express = require("express");
let app = express()

app.use(express.static(__dirname+"/../static"))

let server = app.listen(3000, () => {
    console.log("Server started and listening on port 3000")
})