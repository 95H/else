var fs = require("fs");
var log = require("log4js").getLogger("fileHelper");
var moment = require('moment');
// var uuid = require('uuid');

exports.getFolderPath = function(){
  var folderPath = "public/upload/" + moment().format("YYYYMM");
  fs.exists(folderPath, function(exists) {
    if(!exists){
      fs.mkdirSync(folderPath, 0777);
    }

    return folderPath;
  });
}
