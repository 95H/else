var log4js = require("log4js");
var express = require("express");
var path = require("path");
// var favicon = require("static-favicon");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var engines = require("consolidate");

// var RedisStore = require("connect-redis")(session);

//We won't need this.
//var logger = require('morgan');
var log = log4js.getLogger("app");

var  index = require("./routes/index");
var admin = require("./routes/admin");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");
app.engine("html", engines.mustache);
app.set("view engine", "html");

// app.use(favicon());

// var allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'content-type,x-access-token');
//     res.header('Access-Control-Allow-Credentials','true');
//     res.header("Access-Control-Expose-Headers", "Content-Range");
//     if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
//     next();
// };
// app.use(allowCrossDomain);

// replace this with the log4js connect-logger
// app.use(logger('dev'));
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: "auto" }));

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded());
app.use(cookieParser());

// Use the session middleware
// app.use(
// 	session({
// 		store: new RedisStore({ host: "120.78.137.191", port: 6379, ttl: 10 }),
// 		secret: "aifenlei",
//     saveUninitialized: false,
// 		resave: false
// 	})
// );

// app.use(function (req, res, next) {
//   if (!req.session) {
//     return next(new Error('session disconnect')) // handle error
//   }
//   next() // otherwise continue
// })

// 设置 session 的可选参数
// 目前只用在了验证码发送上
app.use(
	session({
		secret: "recommand 128 bytes random string", // 建议使用 128 个字符的随机字符串
		cookie: {
			maxAge: 20 * 60 * 1000 // 20分钟
		},
		rolling: true,
		// store: new FileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    	saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    	resave: false  // 是否每次都重新保存会话，建议false
	})
);

app.use("/", index);
app.use("/admin", admin);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
	app.use(function(err, req, res, next) {
		log.error("500:", err);
		res.status(err.status || 500);
		res.send({
			success: false,
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	log.error("Something went wrong:", err);
	res.status(err.status || 500);
	res.send({
		success: false,
		message: err.message
	});
});

module.exports = app;
