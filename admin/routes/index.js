var express = require("express");
var router = express.Router();
var log = require("log4js").getLogger("index");

/// catch 404 and forward to error handler

/* GET home page. */
router.get("/", function(req, res) {
	log.debug("This is in the index module");
	res.send({success: true});
});

module.exports = router;
