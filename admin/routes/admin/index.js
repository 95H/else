var express = require("express");
var common = require("./common");
var auth = require("./auth");
var dashboard = require("./dashboard");
var master = require("./master");
var org = require("./org");
var community = require("./community");
var category = require("./category");
var resource = require("./resource");
var user = require("./user");
var sign = require("./sign");

var app = express();
var check_api_token = require("../../middleware/check_api_token");

app.use("/auth", auth);
app.use("/dashboard", dashboard);
app.use("/common", common);

// 统一权限验证
// app.use(check_api_token);
app.use("/master", master);
app.use("/org", org);
app.use("/community", community);
app.use("/category", category);
app.use("/resource", resource);
app.use("/user", user);
app.use("/sign", sign);

module.exports = app;
