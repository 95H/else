var express = require("express");
var router = express.Router();
var log = require("log4js").getLogger("master");
var file = require("../../utils/fileHelper.js");
var db = require("../../utils/dbHelper.js");
var webConfig = require("../../config/webConfig.js");

router.use("/", function(req, res) {
	res.render("admin/dashboard");
});

module.exports = router;
