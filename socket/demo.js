var http = require("http")
var fs = require("fs")
var server = http.createServer(function(req,res) {

  if(req.url == "/"){
    fs.readFile("./index.html",function(err,data) {
      res.end(data);
    })

  }
})
// 创建io对象
var io = require("socket.io")(server)
//  监听连接事件
io.on("connection", function(socket) {
  console.log("一个客户端连接了！")
  socket.on("question", function(msg) {
    console.log("本服务器收到一个提问", msg)
    socket.emit("answer", "I'm fine! ")
  })
})
server.listen(3000,"localhost")
