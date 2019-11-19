 //require方式把express框架倒入
var express=require("express");
//给当前的express变量 进行初始化 实例化
var app=express();
//使用express框架里面的router方法 创建路由 后台接口
var apiRouter = express.Router();
//把data数据调用过来
var data=require("./data.json");
console.log(data);
//三个变量分别获取三个数据的字段
var seller = data.seller;
var goods = data.goods;
var ratings = data.ratings;
app.all("*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  next();
});
//get方法第一个参数是我们的path路径
//逗号隔开后，有个回调函数
//函数里有两个参数  res(response),req(request)
apiRouter.get("/seller",function(req,res){
	// res,req的区别
    //req叫请求  res叫响应
   res.json({
   	erroron:0,
   	seller:seller
   });
});
apiRouter.get("/goods",function(req,res){
	// res,req的区别
//req叫请求  res叫响应
   res.json({
   	erroron:0,
   	goods:goods
   });
});
apiRouter.get("/ratings",function(req,res){
	// res,req的区别
//req叫请求  res叫响应
   res.json({
   	erroron:0,
   	ratings:ratings
   });
});
//请使用当前的路由功能 路由功能开启
//两个参数：第一个参数 path路径
// htpp://localhost:8080/api/seller
app.use("/api",apiRouter);
//端口号设置
app.listen("8081");
console.log('执行完毕');
