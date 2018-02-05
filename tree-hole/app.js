var express = require("express")
var app = express()
var db = require("./model/db.js")

app.set("view engine", "ejs")

app.get("/", function(req,res,next) {
  res.render("index")

})

app.listen(3000,"localhost")
