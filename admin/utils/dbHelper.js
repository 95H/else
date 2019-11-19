var mysql = require("mysql");
var async = require("async");
var asyncMap = require("async/map");
var log = require("log4js").getLogger("dbHelper");
var mysqlConfig = require("../config/mysql");
var pool = mysql.createPool(mysqlConfig);

// 执行sql语句
exports.query = function(sql, values, callback) {
	var errinfo;
	pool.getConnection(function(err, connection) {
		if (err) {
			callback({success: false, message: "DB-获取数据库连接异常:" + err});
		} else {
			var querys = connection.query(sql, values, function(err, results) {
				release(connection);
				if (err) {
					callback({success: false, message: "DB-SQL语句执行错误:" + err});
				} else {
					callback(null, results);
				}
			});
			console.log(querys.sql);
			log.info(querys.sql);
		}
	});
};

function release(connection) {
	try {
		connection.release();
		log.info("数据库关闭");
	} catch (err) {
		log.info("关闭出错了");
	}
}

// 事务执行 并列和层级
exports.execTransaction = function(sqlArr, callback) {
	pool.getConnection(function(err, connection) {
		connection.beginTransaction(function(err) {
			if (err) {
				callback({ success: false, message: "启动事务出错" });
				return;
			}

			asyncMap(sqlArr, doQuery, function(err, results) {
				for (var i = 0; i < results.length; i++) {
					if (!results[i].success) {
						log.info("事务发现了错误，回滚");
						return connection.rollback(function() {
							callback({ success: false, message: "提交事务失败" });
						});
					}
				}

				// 事务提交
				return connection.commit(function(err) {
					log.info("事务没有发现错误，提交");
					if (err) {
						log.info("事务没有发现错误，提交失败，继续回滚");
						return connection.rollback(function() {
							callback({ success: false, message: "提交事务失败" });
						});
						return;
					}

					log.info("事务没有发现错误，提交成功");
					callback({ success: true, message: "提交事务成功" });
				});
			});

			// 循环执行多条语句
			function doQuery(execItem, done) {
				const query = connection.query(execItem.sql, execItem.values, function(
					error,
					results,
					fields
				) {
					if (error) {
						log.info("事务内单条query失败");
						done(null, { success: false, message: "事务回滚" });
					} else {
						log.info("事务内单条query成功");
						done(null, { success: true, message: "事务没有异常" });
					}
				});

				log.info("事务内单条query", query.sql);
			}
		});
	});
};
