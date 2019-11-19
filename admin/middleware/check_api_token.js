// 检查用户会话
module.exports = function(req, res, next) {
	//  未登录
	if(!req.session.adminInfo){
		return res.status(403).send({
			success: false,
			message: "请登录"
		});
	}

	next();
};