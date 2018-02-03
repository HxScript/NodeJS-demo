// Copyright (c) 2018 by HxScript. All Rights Reserved.
var MongoClient = require("mongodb").MongoClient

function __connectDB(/*mdata,*/ callback) {
  var url = "mongodb://localhost:27017/cug" //+ mdata
  MongoClient.connect(url, function(err,db) {
    //回调函数表示连接数据库成功之后要做的事情，db即连接上的数据库实体
    if(err) {
      console.log("can't correctly connect to server.")
      return
    }
    console.log("connected correctly to server.")
    // assert.equal(null, err)
    callback(err, db)
  })
}

exports.insertOne = function(collectionName, json, callback) {
  if(arguments.length != 3) {
    callback("insertOne函数要有3个参数", null)
    return
  }
  console.log("db成功")
  __connectDB(function(err,db) {
    db.collection(collectionName).insertOne(json, function(err,result) {
      callback(err,result)
      db.close()
    })
    //连接成功之后做的事情
  })
}

exports.findAll = function(collectionName, json, callback) {
  var result = []   //结果数组
  if(arguments.length != 3) {
    callback("find函数要有3个参数", null)
    return
  }

  __connectDB(function(err,db) {
    var cursor = db.collection(collectionName).find(json)
    cursor.each(function(err,doc) {
      if(err) {
        callback(err,null)
        return
      }
      if (doc != null) {
        result.push(doc)
      } else {
        callback(null, result)
      }
    })
  })
}

// skip 是一个数组，接受两个参数。一个是起始页，一个是步进数。
exports.findPage = function(collectionName, json, skip, callback) {
  // 结果
  var result = []
  // 给回掉函数返回参数条件错误时的错误
  if(arguments.length != 4) {
    callback("find函数要有4个参数", null)
    return
  }
  // 给回调函数返回skip参数错误时的错误
  if (skip.length != 2) {
    callback("步进输入错误", null)
  }
  var start = skip[0]
  var step = skip[1]

  __connectDB(function(err,db) {
    // skip（2）:从数据集的第二条开始查询
    // limit(2) : 依次查出2条数据。
    var cursor = db.collection(collectionName).find(json).limit(step).skip(start)
    cursor.each(function(err,doc) {
      if(err) {
        callback(err,null)
        return
      }
      if (doc != null) {
        result.push(doc)
      } else {
        callback(null, result)
      }
    })
  })
}


//改进find函数，实现对是否有skip参数能进行重载
