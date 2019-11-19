// table 定义
$('#datagrid').twbsDatagrid({
    url : '/admin/org/getCardList',
    pagination : '#dg-pagination',	// pagination plugin id (default: '#dg-pagination')
    pageSize : 20,			// page size (default: 10)
    params : {},			// custom params (it will convert to string when send request)
    method : 'get',			// ajax method, post/get (default: 'post')
    language : {			// pagination plugin button language
        first : '首页',
        prev : '上一页',
        next : '下一页',
        last : '末页'
    },
    columns : [{
        field : 'id',
        title : '编号'
    },{
        field : 'cardCode',
        title : '卡号'
    },{
        field : 'orgName',
        title : '机构名称'
    },{
        field : 'cardType',
        title : '卡片类型',
        formatter: function(val){
            return val == 1 ? "电子卡" : "实体卡";
        }
    },{
        field : 'mobile',
        title : '激活手机号'
    },{
        field : 'createTime',
        title : '创建时间'
    },{
        field : 'updateTime',
        title : '更新时间'
    }]
});

// 搜索
$("#search").click(function(){
	var items = $('form').serializeArray(), params = {};

	items.forEach(function(item){
		params[item.name] = item.value;
	});

	$('#datagrid').twbsDatagrid('reload', params);
});

$("#uploadThumb").click(function(){
    $("#orgImg").click();
});

$("#orgImg").change(function(){
    var fileUpload = this.files[0]
    // 转换成url加载到页面中
    $("#uploadThumb").attr("src", URL.createObjectURL(fileUpload));
});

$.getJSON("/admin/org/getOrgList", function(data){
    debugger;
    if(data.success){
        data.datas.forEach(function(item){
            $("#selOrg").append("<option val="+ item.orgCode +">"+ item.orgName +"</option>");
        });
    }
});

