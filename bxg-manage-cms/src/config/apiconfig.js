let apiConfig = null;
if (process.env.NODE_ENV === 'development') { //开发
  console.log('development')
  apiConfig = {
    "liveUrl": "http://div-api-d.boxuegu.com",
    "appUrl": "https://app-d.boxuegu.com",
    'bmfUrl': 'http://bxg-admin-api-dev.boxuegu.com', //dv环境
    // 'bmfUrl': 'http://172.17.0.126:3011', //dev1环境
    "pdfServe": 'https://previewpdf-t.boxuegu.com/web/viewer.html?file=', //PDF预览服务
    "userUrl": 'http://bxg-admin-auth-api-dev.boxuegu.com',//用户管理
    // 'bmfUrl': 'http://bxg-admin-api-dev1.boxuegu.com', //dev1环境
    'newsUrl': 'https://online-dev.boxuegu.com/'
  };
} else {
  if (process.env.type === 'test') { //测试
    console.log('test')
    apiConfig = {
      "liveUrl": "http://div-api-t.boxuegu.com",
      "appUrl": "https://proxy.boxuegu.com/portal-api-test",
      "pdfServe": 'https://previewpdf-t.boxuegu.com/web/viewer.html?file=',
      "userUrl": 'http://bxg-admin-auth-api-test.boxuegu.com',//用户管理
      "bmfUrl": "http://bxg-admin-api-test.boxuegu.com",
      'newsUrl': 'https://online-test.boxuegu.com'
    };
  } else if (process.env.type === 'test2') { //测试2
    console.log('test2')
    apiConfig = {
      "liveUrl": "http://div-api-t.boxuegu.com",
      "appUrl": "https://proxy.boxuegu.com/portal-api-test1",
      "pdfServe": 'https://previewpdf-t.boxuegu.com/web/viewer.html?file=',
      "userUrl": 'http://bxg-admin-auth-api-test.boxuegu.com',//用户管理
      "bmfUrl": "http://172.17.0.126:3012",
      'newsUrl': 'https://online-test2.boxuegu.com'
    };
  } else if(process.env.type === 'uat') { //预发布
    console.log('uat')
    apiConfig = {
      "liveUrl": "http://div-api-uat.boxuegu.com",
      "appUrl": "https://proxy.boxuegu.com/portal-api-pred",
      "bmfUrl": "http://bxg-admin-api-uat.boxuegu.com",
      "pdfServe": 'https://previewpdf-t.boxuegu.com/web/viewer.html?file=',
      "userUrl": 'http://bxg-admin-auth-api-uat.boxuegu.com',//用户管理
      'newsUrl': 'https://portal-ysc.boxuegu.com'
    };
  } else {
    console.log('production')
    apiConfig = { //线上
      "liveUrl": "https://live-api.boxuegu.com",
      "appUrl": "https://app.boxuegu.com",
      "bmfUrl": "https://admin-api.boxuegu.com",
      "pdfServe": 'https://previewpdf.boxuegu.com/web/viewer.html?file=',
      "userUrl": 'https://admin-auth-api.boxuegu.com', // 用户管理
      'newsUrl': 'https://www.boxuegu.com'
    };
  }
}
export default apiConfig;
