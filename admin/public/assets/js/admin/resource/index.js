// table 定义
// table 定义
$('#datagrid').twbsDatagrid({
    url : '/admin/resource/getData',
    pagination : '#dg-pagination',	// pagination plugin id (default: '#dg-pagination')
    pageSize : 3,			// page size (default: 10)
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
        field : 'categoryCode',
        title : '资源编码',
        formatter: function(val, rowdata){
        	return "<img style='max-width:40px; height:auto;' src="+ rowdata.orgImg +" /><br>" + val
        }
    }, {
        field : 'orgCode',
        title : '机构代码'
    }, {
        field : 'resourceScore',
        title : '资源积分'
    }, {
        field : 'categoryName',
        title : '分类名称'
    }, {
        field : 'categoryLogo',
        title : '分类logo'
    }, {
        field : 'categoryUnit',
        title : '资源单位'
    },{
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
        formatter: function(val){
        	return '<a href="#" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal_edit_user_5"><i class="fa fa-pencil" aria-hidden="true"></i></a>'
        }
    }]
});

// 搜索
$("#search").click(function(){
	var items = $('form').serializeArray(), params = {};
    // [{a:1},{b:1}]
    // {a:1,b:2}
	items.forEach(function(item){
		params[item.name] = item.value;
	});

	$('#datagrid').twbsDatagrid('reload', params);
});