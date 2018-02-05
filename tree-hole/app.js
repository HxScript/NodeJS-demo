var express = require("express")
var app = express()
var db = require("./model/db.js")
var formidable = require("formidable")

app.set("view engine", "ejs")

app.get("/", function(req,res,next) {
  res.render("index")

})

app.post("/tijiao", function(req,res,next) {
    var form = new formidable.IncomingForm()
    form.parse(req, function(err, fields) {
        db.insertOne("treeHole", {
            "name" : fields.name,
            "liuyan" : fields.liuyan
        }, function (err, result) {
            if(err) {
                //-1是给ajax看的  失败时-1
                res.json({"result":"-1"})
                return
            }
            res.json({"result":"1"})
            console.log(result)
        })
        // console.log("recive:" + fields.name)
    })
})


app.listen(3000,"localhost")
