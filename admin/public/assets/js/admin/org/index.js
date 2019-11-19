// table 定义
$('#datagrid').twbsDatagrid({
    url : '/admin/org/getOrgList',
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
    }, {
        field : 'orgName',
        title : '组织名称',
        formatter: function(val, rowdata){
        	return "<img style='max-width:40px; height:auto;' src="+ rowdata.orgImg +" /><br>" + val
        }
    }, {
        field : 'orgCode',
        title : '机构代码'
    }, {
        field : 'orgContactTel',
        title : '联系电话'
    }, {
        field : 'orgManageCommunity',
        title : '管辖社区'
    }, {
        field : 'state',
        title : '状态',
        formatter: function(val){
        	return val ? "禁用" : "启用"
        }
    }, {
        field : 'createTime',
        title : '创建时间',
        formatter: function(val){
        	return val ? moment(val).format("YYYY-MM-DD") : "";
        }
    }, {
        field : 'updateTime',
        title : '更新时间',
        formatter: function(val){
        	return val ? moment(val).format("YYYY-MM-DD") : "";
        }
    },
    {
        "field": "op",
        "title": "操作",
        formatter: function(val, rowdata){
        	return '<a href="/admin/org/add?id='+ rowdata.id +'" class="btn btn-primary btn-sm" ><i class="fa fa-pencil" aria-hidden="true"></i></a>'
        }
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
