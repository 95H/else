#公众号 | pubname
上格云                 |   sagacloud
测试账户               |    sagatest
广电国际酒店客房服务      |   sagahotel
朵朵报修                |   sagaduoduo
慧盈管家                |   sagaowner

#查看吐槽项列表
GET
    
    http://localhost:58007/weChat/{pubname}/custom/feedbackItems?projectId=Pj1101080002
  
返回：
    
    {
        "result": "success",
        "message": null,
        "content": [
            {
                "id": 1,
                "name": "有点冷"
            },
            {
                "id": 2,
                "name": "冷死了"
            }
        ]
    }  
    
#查询空间温度、湿度、PM2.5、CO2
GET
    
    http://localhost:58007/weChat/{pubname}/custom//spaceProperty?projectId=Pj1101080002&spaceId=Sp1101080002001000001  
    
返回：

    {
        "result": "success",
        "message": null,
        "content": [
            {
                "CO2": "831.0"
            },
            {
                "温度": "32.0"
            },
            {
                "湿度": ""
            },
            {
                "PM2.5": ""
            }
        ]
    }  
    
#查询微信appid和ticket(pubname=sagatest) 
GET
    
    http://localhost:58007/weChat/{pubname}/getToken?pubname=sagatest

返回：

    {
        "result": "success",
        "message": null,
        "ticket": "",
        "appid": ""
    }    
    
#获取微信accesstoken和openid
GET

    http://localhost:58007/weChat/{pubname}/oauth2/accessToken
    
返回：
    
    {
        "result": "success",
        "message": null,
        "openid": "",
        "access_token": "",
        "refresh_token": ""
    }                    