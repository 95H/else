import fullpageRouter from './fullpageRouter' // 报告号设置管理
export default [
	// 项目-综合信息
	{
		name: 'projectInformation',
		path: 'projectInformation',
		component: resolve => require(['@/page/project/projectInformation/projectInformation'], resolve)
	},
	// 项目-商机
	{
		name: 'projectBusiness',
		path: 'projectBusiness',
		component: resolve => require(['@/page/project/projectBusiness/projectBusiness'], resolve)
	},
	// 项目-竞技场
	{
		name: 'projectArena',
		path: 'projectArena',
		component: resolve => require(['@/page/project/projectArena/projectArena'], resolve)
	},
	// 项目-立项
	{
		name: 'projectApproval',
		path: 'projectApproval',
		component: resolve => require(['@/page/project/projectApproval/projectApproval'], resolve)
	},
	// 项目-审核
	{
		name: 'projectAuditing',
		path: 'projectAuditing',
		component: resolve => require(['@/page/project/projectAuditing/projectAuditing'], resolve),
		redirect: {
			name: 'projectProjectAudit'
		},
		children: [
			//--立项审核
			{
				name: 'projectProjectAudit',
				path: 'projectProjectAudit',
				component: resolve => require(['@/page/project/projectAuditing/projectProjectAudit'], resolve),
			},
			//--报告审核
			{
				name: 'projectReportAudit',
				path: 'projectReportAudit',
				component: resolve => require(['@/page/fullPageModule/fullPage'], resolve),
				redirect: {
					path: '/zlpg/project/projectCont/projectAuditing/projectReportAudit/projectInfo'
				},
				children: fullpageRouter
			},
			//--外审修改审核
			{
				name: 'projectExternalAudit',
				path: 'projectExternalAudit',
        component: resolve => require(['@/page/project/projectAuditing/externalAudit'], resolve),
				children: [//--线上作业
					{
						name: 'externalOnLineAudit',
						path: 'externalOnLineAudit',
						component: resolve => require(['@/page/fullPageModule/fullPage'], resolve),
						redirect: {
							path: '/zlpg/project/projectCont/projectAuditing/projectExternalAudit/externalOnLineAudit/externalAuditApply'
						},
						children: fullpageRouter
					},
					{
						name: 'externalOffLineAudit',
						path: 'externalOffLineAudit',
						component: resolve => require(['@/page/fullPageModule/fullPage'], resolve),
						redirect: {
							path: '/zlpg/project/projectCont/projectAuditing/projectExternalAudit/externalOffLineAudit/underLineHome'
						},
						children: fullpageRouter
					}
				]
			},
			//查看签发
			{
				name: 'projectIssuedVersion',
				path: 'projectIssuedVersion',
				component: resolve => require(['@/page/project/projectAuditing/projectIssuedVersion'], resolve),
				children: [//--线上作业
					{
						path: 'IssuedOnLineVersion',
						component: resolve => require(['@/page/fullPageModule/fullPage'], resolve),
						redirect: {
							path: '/zlpg/project/projectCont/projectAuditing/projectIssuedVersion/IssuedOnLineVersion/assetBased'
						},
						children: fullpageRouter
					}
				]
			},
			//--变更审核
			{
				name: 'projectChangeAudit',
				path: 'projectChangeAudit',
				component: resolve => require(['@/page/project/projectAuditing/projectChangeAudit'], resolve),
			},
			//--工时审核
			{
				name: 'projectWorkingHourAudit',
				path: 'projectWorkingHourAudit',
				component: resolve => require(['@/page/project/projectAuditing/projectWorkingHourAudit'], resolve),
			},
			//--结项审核
			{
				name: 'projectUltimateAudit',
				path: 'projectUltimateAudit',
				component: resolve => require(['@/page/project/projectAuditing/projectUltimateAudit'], resolve),
			},
		]
	},
	// 项目-作业
	{
		name: 'projectImplementation',
		path: 'projectImplementation',
		component: resolve => require(['@/page/project/projectImplementation/projectImplementation'], resolve),
		redirect: {
			name: 'projectOnlineTask'
		},
		children: [
			//--线下作业
			{
				name: 'projectUnderLineTask',
				path: 'projectUnderLineTask',
				component: resolve => require(['@/page/fullPageModule/fullPage'], resolve),
				redirect: {
					path: '/zlpg/project/projectCont/projectImplementation/projectUnderLineTask/projectInfo'
				},
				children: fullpageRouter
			},
			//--线上作业
			{
				name: 'projectOnlineTask',
				path: 'projectOnlineTask',
				component: resolve => require(['@/page/fullPageModule/fullPage'], resolve),
				redirect: {
					path: '/zlpg/project/projectCont/projectImplementation/projectOnlineTask/projectInfo'
				},
				children: fullpageRouter
			},
		]
	},
	// 项目-底稿
	{
		name: 'projectManuscript',
		path: 'projectManuscript',
		component: resolve => require(['@/page/project/projectManuscript/projectManuscript'], resolve)
	},
	// 项目-进度
	{
		name: 'projectSchedule',
		path: 'projectSchedule',
		component: resolve => require(['@/page/project/projectSchedule/projectSchedule'], resolve)
	},
	// 项目-人员
	{
		name: 'projectPersonnel',
		path: 'projectPersonnel',
		component: resolve => require(['@/page/project/projectPersonnel/projectPersonnel'], resolve)
	},
	// 项目-工时
	{
		name: 'projectWorkinghours',
		path: 'projectWorkinghours',
		component: resolve => require(['@/page/project/projectWorkinghours/projectWorkinghours'], resolve),
		redirect: {
			name: 'projectWorkinghoursWrite'
		},
		children: [
			//--工时填报
			{
				name: 'projectWorkinghoursWrite',
				path: 'projectWorkinghoursWrite',
				component: resolve => require(['@/page/project/projectWorkinghours/projectWorkinghoursWrite'], resolve)
			},
			//--工时查询
			{
				name: 'projectWorkinghoursQuery',
				path: 'projectWorkinghoursQuery',
				component: resolve => require(['@/page/project/projectWorkinghours/projectWorkinghoursQuery'], resolve)
			}
		]
	},
	// 项目-变更
	{
		name: 'projectChange',
		path: 'projectChange',
		component: resolve => require(['@/page/project/projectChange/projectChange'], resolve)
	},
	// 项目-分配
	{
		name: 'projectDistribution',
		path: 'projectDistribution',
		component: resolve => require(['@/page/project/projectDistribution/projectDistribution'], resolve),
		redirect: {
			name: 'projectProjectAuditing'
		},
		children: [{
				name: 'projectProjectAuditing',
				path: 'projectProjectAuditing',
				component: resolve => require(['@/page/project/projectDistribution/projectProjectAuditing'], resolve)
			},
			{
				name: 'projectProjectReportNumber',
				path: 'projectProjectReportNumber',
				component: resolve => require(['@/page/project/projectDistribution/projectProjectReportNumber'], resolve)
			},
			{
				name: 'projectProjectSeal',
				path: 'projectProjectSeal',
				component: resolve => require(['@/page/project/projectDistribution/projectProjectSeal'], resolve)
			}
		]
	},
	//外审修改
	{
		name: 'examineModification',
		path: 'examineModification',
		component: resolve => require(['@/page/examineModification/examineModification'], resolve),
		children: [//--线上作业
			{
				name: 'externalOnLineTask',
				path: 'externalOnLineTask',
				component: resolve => require(['@/page/fullPageModule/fullPage'], resolve),
				redirect: {
          path: '/zlpg/project/projectCont/examineModification/externalOnLineTask/externalAuditRecord'
				},
				children: fullpageRouter
			},
			{
				name: 'externalOffLineTask',
				path: 'externalOffLineTask',
				component: resolve => require(['@/page/fullPageModule/fullPage'], resolve),
				redirect: {
					path: '/zlpg/project/projectCont/examineModification/externalOffLineTask/underLineHome'
				},
				children: fullpageRouter
			}
		]
	}
]
