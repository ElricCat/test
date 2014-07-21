var namejson = require('./info.json');
var say = require('./publicfunc').sayHi;
var http = require('http');
var i = 0;
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/html','Charset':'utf-8'});
	res.end('<input type="text" value="'+namejson.name+'"/><input type="text" value="'+namejson.sex+'"/>');
	say(namejson.name);
	console.log(i++);
}).listen(1337,'localhost');
console.log("Server running at http://127.0.0.1:1337");