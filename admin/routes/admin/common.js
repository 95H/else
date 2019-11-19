var express = require("express");
var router = express.Router();
var {withPartials} = require("../../utils/util.js");

router.get("/success", function(req, res, next) {
	res.render('admin/common/success', withPartials(req.query))
});

module.exports = router;
