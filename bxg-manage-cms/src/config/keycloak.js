let config = null;
if (process.env.NODE_ENV === 'development') { //本地
  console.log('development')
  config = {
    "url": "http://auth-dev.boxuegu.com/auth",
    "realm": "employee",
    // "clientId": "bxg-manage-static-dev"
    "clientId": "bxg-manage-static"
  };
} else {
  if (process.env.type === 'test' || process.env.type === 'test2') { //测试
    console.log('test')
    config = {
      "url": "http://auth-t.boxuegu.com/auth",
      "realm": "employee",
      "clientId": "bxg-manage-static"
    };
  } else if (process.env.type === "uat") { //预发布环境
    console.log('uat')
    config = {
      "url": "http://auth-uat.boxuegu.com/auth",
      "realm": "employee",
      "clientId": "bxg-manage-static"
    };
  } else { //线上
    console.log('production')
    config = {
      "url": "https://eauth.boxuegu.com/auth",
      "realm": "employee",
      "clientId": "bxg-manage-static"
    };
  }
}
export default config;
