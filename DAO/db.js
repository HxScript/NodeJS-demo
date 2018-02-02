var express = require("express")
var app = express()
var MongoClient = require("mongodb").MongoClient

app.get("/", function(req,res) {
  //数据库地址，/test即数据库，没有则自动创建
  var url = "mongodb://localhost:27017/test"
  MongoClient.connect(url, function(err,db) {
    if(err) {
      console.log("数据库连接失败")
      return
    }
    // assert.equal(null, err)
    console.log("connected correctly to server.")
    db.close()
  })
})
app.listen(3000)
