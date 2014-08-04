var express = require("express"),
 	ejs = require("ejs");

var app = express(),	
	server = require('http').createServer(app),
  	io = require('socket.io').listen(server);

//使用ejs解析视图
app.engine('.html', ejs.__express);
//默认访问的视图后缀为.html
app.set('view engine', 'html');
app.use(express.static(__dirname+"/public"));

app.get("/",function(req,res){
	res.render("index");
});

io.sockets.on('connection', function (socket) {
  // socket.emit('news', { hello: 'world' });
  // socket.on('my other event', function (data) {
  //   console.log(data);
  // });
  socket.on("chatmsg",function (data){
  	console.log(data);
  	var nickName = data.nickname,
  		content = data.content;
  		msg = "<strong>"+nickName+"</strong>说："+content +"<br>";
  	socket.emit("responseMsg",{responsemsg:msg});
  });
  
});
server.listen(80);