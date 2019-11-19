# 广电项目web后台接口

## 接口规范

除登录接口外,所有请求需要在header中增加 Authorization=token

所有响应内容都有result参数,result=success表示执行成功,否则会返回message描述异常信息.
所有响应内容中表示时间的数据统一返回毫秒级时间戳

## 基础服务
#### 校验token是否有效
请求方式: GET /service/token/status
请求参数:

```

```

响应内容:

```json
{
    "result": "success",
    "status": 1  # 0无效, 1有效
}
```

## 登录与登出

#### 接口名称: 登录

请求方式: POST /service/login

请求参数:

```
{
	"username": "user@email.com",
	"password": "123456"
}

```

响应内容:

```
{
    "result": "success"  # 登录成功
    "token": "xxxxx"    
}
```

#### 接口名称: 登出

请求方式: GET /service/logout

请求参数:

```

```

响应内容:

```
{
    "result": "success"  # 登出成功
}
```

## 入住管理
#### 接口名称: 所有楼层

请求方式: GET /service/regions

请求参数:

```

```

响应内容:

```
{
    "result": "success",
    "data": [
    	{
    		"id":"xx",
    		"name": "4层",
    		"spaces":[
                {
                    "id": "roomid",
                    "name": "401"
                }
    		]
    	}
    ]
}
```
#### 接口名称: 楼层对应的房间

请求方式: GET /service/spaces?regionId=xxxx

请求参数:

```

```

响应内容:

```
{
    "result": "success",
    "data": [
    	{
    		"id":"xx",
    		"name": "410"
    	}
    ]
}
```

#### 接口名称: 入住查询

请求方式: POST /service/customer/list

请求参数:

```
{
    page: 1,
    size: 100,
    params: {
        regionId: '',
        status: 1
    }
}
```

响应内容:

```
{
    "result": "success",
    "data": [
    	{
    		"id": 123,                  # 离店和编辑时用这个id
    		"checkinTime": 123123123123, # 时间戳
    		"checkoutTIme": 1231213123, 
    		"room": {
    			"id": "xxx",
    			"name": "401"
    		},
    		"customer": {
    			"id": 123,
    			"name": "张三",
    			"phone": "13111112222",
    			"gender": "male"

    		}
    	}
    ]
}
```

#### 接口名称: 校验手机号是否可用

请求方式: POST /service/customer/checkPhone

请求参数:

```
{
    "id": 123,              # 编辑时传入id,新入住不需要传入id
    "phone": 13122223333
}
```

响应内容:

```
{
    "result": "success",
   	"valid": true         # true可用, false不可用 
}
```

#### 

#### 接口名称: 入住

请求方式: POST /service/customer/checkin

请求参数:

```
[
    {
        "name": "张三",
        "gender": "male",
        "phone": "13111112222",
        "regionId": "",
        "roomId": ""
    }
}

```

响应内容:

```
{
    "result": "success"
}
```

#### 接口名称: 编辑入住信息

请求方式: POST /service/customer/edit

请求参数:

```
[
	{
        "id": 123,
        "name": "张三",
        "gender": "male",
        "phone": "13111112222",        
        "regionId": "xxx",
        "roomId": "xxx
    }
]

```

响应内容:

```
{
    "result": "success"
}
```

#### 接口名称: 离店

请求方式: POST /service/customer/checkout

请求参数:

```
{
	"id": 123
}

```

响应内容:

```
{
    "result": "success"
}
```

## 客房服务
#### 客房服务查询
请求方式: GET /service/roomservice/list

请求参数:

```
	{
        page: 1,
        size: 10,
        criteria: {
            status: 1 # 待确认, 2已确认
            type: 0,  # 全部
            floorId: "Flxxxx",
            roomId: "Spxxx",
            startDate: "yyyyMMdd",
            endDate: "yyyyMMdd",
            keyword: ""
        },
        orders: [
            {column: "startTime", asc: true},
        ]
	}
```

响应内容:

```
{
    "result": "success"
    "data": [
    	{
    		"id": 123,                  # 确认时使用这个id
    		"type": 1, 
    		"startTime": 1233333311,    # 预约时间
    		"endTime": 1233333311,      # 预约结束时间:行李寄存领取时间
    		"confirmTime": 1233121121,  # 确认时间
    		"remark": "备注",

			"roomId": "xxxx",
    		"roomName": "401",

            "customerId": 123,
            "customerName": "张三",
            "customerPhone": "13111112222",
            "customerGender": "male"
    	}
    ]
}
```

#### 客房服务确认
请求方式: POST /service/roomservice/confirm

请求参数:

```
{
	"id": 123
}
	
```

响应内容:

```
{
    "result": "success"
}
```


## 报修管理
#### 报修查询
请求方式: POST /service/workorder/list

请求参数:

```
{
	"page": 1,
	"size": 10,
	"params": {
        "status": 1,  # 1待处理 3处理中 4完成
        "spaceId": "Spxxxxx",
        "startDate": "yyyyMMdd",
        "endDate": "yyyyMMdd",
        "keyword": "关键字：手机号和备注模糊查询"
	},
    orders: [
        {column: "createTime", asc: false},
    ]
}
	
```

响应内容:

```
{
    "result": "success",
    "data": [
    	{
    		"id": "xxxxxxxxx",
    		"status": 1,  # 1待处理 2处理中 3完成
    		"type": "家具-灯泡坏了",
    		"createTime": "报修时间",
    		"region": "区域",
    		"space": "地点",
    		"phone": "联系电话",
    		"remark": "备注"
	    }
    ]

}
```