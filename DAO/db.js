// Copyright (c) 2018 by HxScript. All Rights Reserved.
var MongoClient = require("mongodb").MongoClient

function __connectDB(/*mdata*/) {
  var url = "mongodb://localhost:27017/" //+ mdata
  MongoClient.connect(url, function(err,db) {
    //回调函数表示连接数据库成功之后要做的事情，db即连接上的数据库实体
    if(err) {
      console.log("can't correctly connect to server.")
      return
    }
    console.log("connected correctly to server.")
    // assert.equal(null, err)
  })
}

__connectDB()
