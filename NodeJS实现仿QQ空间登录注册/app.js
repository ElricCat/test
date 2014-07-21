/*
 * 一个 用 nodejs实现的模仿QQ空间
 * 蔡斌
 * v0.1
*/

var express = require("express"),
	logger = require("morgan");
	bodyParser = require('body-parser'),
	http = require("http"),
	path = require("path"),
	mongoose = require("mongoose"),
	session = require("express-session"),
	ejs = require("ejs");
var app = express();

//使用ejs模板引擎
app.engine('.html', ejs.__express);
//改变视图，使得默认访问的视图后缀为.html
app.set('view engine', 'html');// app.set('view engine', 'ejs');

//连接到mongodb
mongoose.connect("mongodb://localhost/myapp");

//对应一个mongodb的collection.
var UserSchema = new mongoose.Schema({
	email:String,
	username:String,
	password:String
});

//对应一个document，users是Mongodb中collection的名字
var User = mongoose.model('users',UserSchema);

/*
中间件(express 4.x)，按顺序加载
*/
//使用morgen模块来做日志输出。
app.use(logger());

//使用bodyParser来解析html文档
app.use(bodyParser.urlencoded({"extended":true}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//session的使用
app.use(session({secret: 'keyboard cat'}));

//默认的静态资源访问路径（如js,css,img等）。
app.use(express.static(__dirname+"/public"));

//这个默认对所有的请求都会调用
app.use(function(req,res,next){
	//打印session里面的内容。
	//console.log(req.session);
	var err = req.session.error||null,
		msg = req.session.success;
	delete req.session.error;
	delete req.session.success;
	res.locals.message = '';
	if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
    if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
    next();
});

/*
辅助函数
*/
//验证
function authenticate(name,pass,fn){
	User.findOne({
		"username":name
	},
	function(err,user){
		if(user){
			//user.password!=pass将永远返回true，即使它们的字面值是相等的。
			var upass = user.password;
			if(err)
				return fn(new Error('找不到用户'+user));
			else if(upass != pass){
				return fn(new Error("密码错误"));
			}else{
				return fn(null,user);
			}
		}else{
			return fn(new Error('找不到用户'));
		}
	});
}

function requiredAuthentication(req,res,next){
	if(req.session.user){
		next();
	}else{
		req.session.error="没有权限";
		req.redirect("/login");
	}
}
function userExist(req,res,next){
	User.count({
		username:req.body.username
	},function(err,count){
		if(count == 0){
			next();
		}else{
			req.session.error = "用户已存在";
			res.redirect("/login");
		}
	});
}

/*
路由
*/
app.get("/",function(req,res){
	console.log(req.httpVersion);

	if(req.session.user){
		res.render("index",{"user":req.session.user,"title":"首页"});
		console.log(res.headersSent);
	}
	else{
		res.render('login',{"message":""});
	}
});
app.get("/index",function(req,res){
	if(req.session.user){
		res.render("index",{"user":req.session.user,"title":"首页"});
	}else{
		res.render("login",{"message":"请先登录"});
	}
});

//登录
app.route("/login")
.get(
	function(req,res){
		if(req.session.user){
			res.render("index",{"user":req.session.user,"title":"首页"});
		}
		res.render('login',{"message":""});
	})
.post(
	function(req,res,next){
		authenticate(req.body.username,req.body.password,function(err,user){
			if(user){
				req.session.regenerate(
					function(){
						req.session.user = user.username;
						res.redirect("/index");
				});
			}else{
					req.session.error = "登录失败，请检查用户名和密码";
					res.render("login",
							{
								"message":"登录失败，请检查用户名和密码"
							});
				}
			});
});

//注销
app.get("/logout",function(req,res){
	req.session.destroy(function(){
		res.redirect("/login");
	});
});

//注册
app.route("/signup")
.get(
	function(req,res){
		var msg = req.session.message;//注册信息
		req.session.message = "";
		console.log("hehhhehe"+msg);
		if(msg){
			res.render("signup",{"message":msg});
		}else{
			res.render("signup",{"message":""});
		}
	})
.post(
	function(req,res){
		User.findOne({
			"email":req.body.email
		},function(err,user){
			if(user){
				req.session.message = "该邮箱已被注册";
				console.log(req.session.message);
				res.redirect("signup");
			}else{
				User.findOne({
					"username":req.body.username
				},function(err,user){
					if(user){
						req.session.message = "用户名已存在，请直接登录";
						console.log(req.session.message);
						res.redirect("signup");
					}else{
						var user = new User({
							"email":req.body.email,
							"username":req.body.username,
							"password":req.body.password
						});
						user.save(function(err){
							if(err){
								req.session.message = "错误";
							}
							else req.session.message = "注册成功";
							res.redirect("signup");
						});
					}
				});
			}
		});	
});

http.createServer(app).listen(8080);
