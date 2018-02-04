// Copyright (c) 2018 by HxScript. All Rights Reserved.

var express = require("express")
var app = express()
var db = require("./db.js")


app.get("/", function(req,res) {
db.insertOne("student", {"name":"baba"},function(err,result) {
  if(err) {
    console.log("插入失败")
    return
  }
  res.send("成功啦！")
})

})

app.get("/fenye1", function(req,res) {
  var page = parseInt(req.query.page);
  var message = []
  db.findAll("student", {}, function(err, result) {

    if(err) {
      console.log(err)
      return
    }

    for(var i = page * 5; i < (page + 1) * 5; i++) {
      message.push(result[i])
    }
    res.send(message)
  })
})





app.get("/fenye2", function(req,res) {
  var page = parseInt(req.query.page)
  var step = 5
  db.findPage("student", {},[page, step], function(err,result) {
    if(err) {
      console.log("分页查找失败")
      return
    }
    res.send(result)
  })
})


app.get("/del", function(req,res) {
  var age = parseInt(req.query.age)
  console.log(age)
  db.deleteMany("student", {}, function(err, result) {
    if(err) {console.log(err)}
    res.send(result)
  })
})

app.get("/update", function(req,res) {
  db.updateMany("student", {"name" : "baba"},{$set: {"age" : 33}} , function(err,result) {
    if(err) {
      console.log("分页查找失败")
      return
    }
    res.send(result)
  })
})



app.listen(3000)
