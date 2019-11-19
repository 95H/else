import Vue from 'vue'
import Router from 'vue-router'
import examine from './examine' //审核
import change from './change' //变更
import personnel from './personnel' //人员
import projectCont from './projectCont' //项目详情
import reportNumber from './reportNumber' // 报告号设置管理
import fullpageRouter from './fullpageRouter' // 报告号设置管理
import powerAdmin from './powerAdmin' //人员权限管理
Vue.use(Router)
export default new Router({
	linkActiveClass: "is-active",
	routes: [{
			path: '/',
			redirect: '/login'
		},
		//登陆
		{
			path: '/login',
			component: resolve => require(['@/page/login/login'], resolve)
		},
		//404
		{
			path: '/errorinfo',
			component: resolve => require(['@/page/errorinfo/errorinfo'], resolve)
		},
		//文件预览
		{
			name: "filePreview",
			path: "/filePreview",
			//component: resolve => require(['@/page/fullPageModule/filePreview'], resolve),
			component: resolve => require(['@/page/fullPageModule/filePreview-pdf'], resolve),
		},
		// 查看明细表[报告说明中的关联数据]
		{
			name: 'openRelationDetail',
			path: '/openRelationDetail',
			component: resolve => require(['@/page/fullPageModule/openRelationDetail'], resolve)
		},
		//首页
		{
			path: '/zlpg',
			component: resolve => require(['@/page/zlpg'], resolve),
			redirect: {
				name: 'home'
			},
			children: [
				//首页
				{
					name: 'home',
					path: 'home',
					component: resolve => require(['@/page/home/home'], resolve),
				},
				//待办
				{
					name: 'toDealt',
					path: 'toDealt',
					component: resolve => require(['@/page/toDealt/toDealt'], resolve),
				},
				//已办
				{
					name: 'haveDealt',
					path: 'haveDealt',
					component: resolve => require(['@/page/haveDealt/haveDealt'], resolve),
				},
				//项目
				{
					name: 'project',
					path: 'project',
					component: resolve => require(['@/page/project/project'], resolve),
					redirect: {
						name: 'projectList'
					},
					children: [
						//--项目列表
						{
							name: 'projectList',
							path: 'projectList',
							component: resolve => require(['@/page/project/projectList'], resolve)
						},
						//--项目详情
						{
							name: 'projectCont',
							path: 'projectCont',
							component: resolve => require(['@/page/project/projectCont'], resolve),
							redirect: {
								name: 'projectInformation'
							},
							children: projectCont
						}
					]
				},
				//审核
				{
					name: 'examine',
					path: 'examine',
					component: resolve => require(['@/page/examine/examine'], resolve),
					redirect: {
						name: 'newApproval'
					},
					children: examine
				},
				//立项审核
				/*{
					name: 'newExamine',
					path: 'newExamine',
					component: resolve => require(['@/page/newExamine/newApproval'], resolve),
				},*/
				//里程碑
				{
					name: 'milepost',
					path: 'milepost',
					component: resolve => require(['@/page/milepost/milepost'], resolve)
				},
				//任务
				{
					name: 'task',
					path: 'task',
					component: resolve => require(['@/page/task/task'], resolve),
					redirect: {
						name: 'spotTask'
					},
					children: [
						//--工时填报
						{
							name: 'spotTask',
							path: 'spotTask',
							component: resolve => require(['@/page/task/spotTask'], resolve)
						},
						//--工时查询
						{
							name: 'assessTask',
							path: 'assessTask',
							component: resolve => require(['@/page/task/assessTask'], resolve)
						}
					]
				},
				//底稿
				{
					name: 'manuscript',
					path: 'manuscript',
					component: resolve => require(['@/page/manuscript/manuscript'], resolve),
					redirect: {
						name: 'itemScript'
					},
					children: [{
						name: 'itemScript',
						path: 'itemScript',
						component: resolve => require(['@/page/manuscript/itemScript'], resolve)
					}, ]
				},
				//变更
				{
					name: 'change',
					path: 'change',
					component: resolve => require(['@/page/change/change'], resolve),
					redirect: {
						name: 'changeshowprojectlist'
					},
					children: change
				},
				//工时
				{
					name: 'workingHours',
					path: 'workingHours',
					component: resolve => require(['@/page/workingHours/workingHoursList'], resolve),
					redirect: {
						name: 'workinghoursWrite'
					},
					children: [
						//--工时填报
						{
							name: 'workinghoursWrite',
							path: 'workinghoursWrite',
							component: resolve => require(['@/page/workingHours/workinghoursWrite'], resolve)
						},
						//--工时查询
						{
							name: 'workinghoursQuery',
							path: 'workinghoursQuery',
							component: resolve => require(['@/page/workingHours/workinghoursQuery'], resolve)
						}
					]
				},
				//人员
				{
					name: 'personnel',
					path: 'personnel',
					component: resolve => require(['@/page/personnel/personnel'], resolve)
				},
				//发送
				{
					name: 'send',
					path: 'send',
					component: resolve => require(['@/page/send/send'], resolve)
				},
				//报告号管理
				{
					name: 'reportNumber',
					path: 'reportNumber',
					component: resolve => require(['@/page/reportNumber/reportNumber'], resolve),
					redirect: {
						name: 'auditing'
					},
					children: reportNumber
				},
				//权限管理
				{
					name: 'powerAdmin',
					path: 'powerAdmin',
					component: resolve => require(['@/page/powerAdmin/powerAdmin'], resolve),
					redirect: {
						name: 'organization'
					},
					children: powerAdmin
				}
			]
		},
		{
			path: "*", // 此处需特别注意置于最底部
			redirect: "/errorinfo"
		}
	]
})
