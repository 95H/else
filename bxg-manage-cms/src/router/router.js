//权限对象
// import { openCourses, collectionOrder, collectionToPayWater, auditCollectionToPay } from '@/util/jurisdiction'

const Main = r => require.ensure([], () => r(require('@/pages/Main')), 'main')
const login = r => require.ensure([], () => r(require('@/pages/login')), 'login')
const home = r => require.ensure([], () => r(require('@/pages/home/home')), 'home')
const ownspace = r => require.ensure([], () => r(require('@/pages/own-space/own-space')), 'ownspace')
const liveku = r => require.ensure([], () => r(require('@/pages/liveku/liveku')), 'liveku')
const feeManage = r => require.ensure([], () => r(require('@/pages/sales-manage/fee-manage/fee-manage')), 'feeManage')
const feeReceipts = r => require.ensure([], () => r(require('@/pages/sales-manage/fee-receipts/fee-receipts')), 'feeReceipts')
const refundManage = r =>require.ensure([], () => r(require('@/pages/sales-manage/refund-manage/refund-manage')), 'refundManage')
const liveplayback = r => require.ensure([], () => r(require('@/pages/live-playback/live-playback')), 'liveplayback')
const livevisual = r => require.ensure([], () => r(require('@/pages/live-visual/live-visual')), 'livevisual')

/**
 * 课程中心
 */
const phaseManage = r => require.ensure([], () => r(require('@/pages/course-center/phase-manage')), 'phaseManage')
const taskManage = r => require.ensure([], () => r(require('@/pages/course-center/task-manage')), 'taskManage')
const phaseGroupManage = r => require.ensure([], () => r(require('@/pages/teaching-center/phase-group-manage/phase-group-manage')), 'phaseGroupManage')

/**
 * 教学中心
 */
const learningManageStat = r => require.ensure([], () => (require('@/pages/teaching-center/learning-manage-stat/learning-manage-stat')), 'learningManageStat')
const learningManageMentor = r => require.ensure([], () => (require('@/pages/teaching-center/learning-manage-mentor/learning-manage-mentor')), 'learningManageMentor')
const learningManageHeadTeacher = r => require.ensure([], () => (require('@/pages/teaching-center/learning-manage-headteacher/learning-manage-headteacher')), 'learningManageHeadTeacher')
const studentInfo = r => require.ensure([], () => r(require('@/pages/student-info/student-info')), 'studentInfo')
const mentorRecord = r => require.ensure([], () => r(require('@/pages/mentor-record/mentor-record')), 'mentorRecord')
const stuinfoDetail = r => require.ensure([], () => r(require('@/pages/stuinfo-detail/stuinfo-detail')), 'stuinfoDetail') //teacher-record
const teacherRecord = r => require.ensure([], () => r(require('@/pages/teacher-record/teacher-record')), 'teacherRecord')
const learningTaskManageMentor = r => require.ensure([], () => r(require('@/pages/teaching-center/learning-manage-mentor/learning-task-manage')), 'learningTaskManageMentor')
const learningTaskManageHeadTeacher = r => require.ensure([], () => r(require('@/pages/teaching-center/learning-manage-headteacher/learning-task-manage')), 'learningTaskManageHeadTeacher')
const mentorStudentsList = r => require.ensure([], () => r(require('@/pages/mentor-students-list/mentor-students-list')), 'mentor_students_list')
const shujuStudentsList = r => require.ensure([], () => r(require('@/pages/data-students-list/data-students-list')), 'data-students-list')
const teacherStudentsList = r => require.ensure([], () => r(require('@/pages/teacher-students-list/teacher-students-list')), 'teacher_students_list')
const classStuManagement = r => require.ensure([], () => r(require('@/pages/teaching-center/class-stu-management/class-stu-management/class-stu-manage')), 'classStuManagement')
// const learnDetails = r => require.ensure([], () => r(require('@/pages/teaching-center/class-stu-management/learn-details/learn-details')), 'learnDetails')
const seeStudentsEmployment = r => require.ensure([], () => r(require('@/pages/teaching-center/class-stu-management/see-students/see-students-employment')), 'seeStudentsEmployment')
const seeStudentsMicro = r => require.ensure([], () => r(require('@/pages/teaching-center/class-stu-management/see-students/see-students-micro')), 'seeStudentsMicro')
const seeStudentsLive = r => require.ensure([], () => r(require('@/pages/teaching-center/class-stu-management/see-students/see-students-live')), 'seeStudentsLive')
/**
 * 教务中心
 */
const electronicContract = r => require.ensure([], () => (require('@/pages/educational-administration/electronic-contract/electronic-contract')), 'electronicContract');

/**
 * 财务管理
 */
const dredgeClass = r => require.ensure([], () => (require('@/pages/finance-manage/dredge-class')), 'dredgeClass');
const backTrackingOrder = r => require.ensure([], () => (require('@/pages/finance-manage/back-tracking-order')), 'backTrackingOrder');
const backTrackingPay = r => require.ensure([], () => (require('@/pages/finance-manage/back-tracking-pay')), 'backTrackingPay');
const backTrackingCheck = r => require.ensure([], () => (require('@/pages/finance-manage/back-tracking-check')), 'backTrackingCheck');
const orderManage = r => require.ensure([], () => (require('@/pages/finance-manage/order-manage')), 'orderManage');
const ordersDetails = r => require.ensure([], () => (require('@/pages/finance-manage/orders-details')), 'ordersDetails');
const refundOnlineInterChange = r => require.ensure([], () => (require('@/pages/finance-manage/refund-online-interchange')), 'refundOnlineInterChange');

const refundUnderline = r => require.ensure([], () => (require('@/pages/finance-manage/refund-underline')), 'refundUnderline');
/**
 * 资讯管理
 */
const infoList = r => require.ensure([], () => (require('@/pages/info-manage/info-list/info-list')), 'infoList');
const addArticle = r => require.ensure([], () => (require('@/pages/add-article/add-article')), 'addArticle');
const updateArticle = r => require.ensure([], () => (require('@/pages/update-article/update-article')), 'updateArticle');
const auditManage = r => require.ensure([], () => (require('@/pages/info-manage/audit-manage/audit-manage')), 'auditManage');
const statistics = r => require.ensure([], () => (require('@/pages/info-manage/statistics/statistics')), 'statistics');
/**
 * 用户管理
 */
const studentManagement = r => require.ensure([], () => (require('@/pages/user-management/student-management/student-management')), 'studentManagement');
const BackgroundUserManagement = r => require.ensure([], () => (require('@/pages/user-management/backgroundUser-management/backgroundUser-management')), 'BackgroundUserManagement');
/**
 *权限管理
 */
const roleManagement = r => require.ensure([], () => (require('@/pages/permissions-management/role-management/role-management')), 'roleManagement');
/**
 *  消息管理
 */
const messagePush = r => require.ensure([], () => (require('@/pages/message-manage/message-push/message-push')), 'messagePush');
const messageNew = r => require.ensure([], () => (require('@/pages/message-new/message-new')), 'messageNew');
const messagepushInfo = r => require.ensure([], () => r(require('@/pages/messagepush-Info/messagepush-Info')), 'messagepushInfo')
const messagepushEdit = r => require.ensure([], () => r(require('@/pages/messagepush-Edit/messagepush-Edit')), 'messagepushEdit')
// 不作为Main组件git checkout messagepush-v1.0.0的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: '登录',
    requiresAuth: true
  },
  component: login
};
// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: Main,
  children: [{
    path: 'home',
    meta: {
      title: '首页',
      requiresAuth: true
    },
    name: 'home_index',
    component: home
  }, {
    path: 'ownspace',
    meta: {
      title: '个人中心',
      requiresAuth: true
    },
    name: 'ownspace_index',
    component: ownspace
  },
  {
    path: 'liveplayback',
    meta: {
      title: '直播回放',
      requiresAuth: true
    },
    name: 'liveplayback_index',
    component: liveplayback
  },
  {
    path: 'livevisual',
    meta: {
      title: '直播数据',
      requiresAuth: true
    },
    name: 'livevisual_index',
    component: livevisual
  },
  {
    path: 'taskmanage',
    meta: {
      title: '任务管理',
      requiresAuth: true
    },
    name: 'task_manage',
    component: taskManage
  },
  {
    path: 'stuinfo-detail',
    meta: {
      title: '学习详情',
      requiresAuth: true
    },
    name: 'stuinfo_detail',
    component: stuinfoDetail
  },
  {
    path: 'mentor-record',
    meta: {
      title: '沟通记录（导师）',
      requiresAuth: true
    },
    name: 'mentor_record',
    component: mentorRecord
  },
  {
    path: 'studentinfo',
    meta: {
      title: '学籍卡信息',
      requiresAuth: true
    },
    name: 'student_info',
    component: studentInfo
  },
  {
    path: 'teacher-record',
    meta: {
      title: '沟通记录(班主任)',
      requiresAuth: true
    },
    name: 'teacher_record',
    component: teacherRecord
  },
  {
    path: 'teacher-students-list',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '学员列表（班主任）',
      requiresAuth: true,
      keepAlive: true
    },
    name: 'teacher_students_list',
    component: teacherStudentsList
  },
  {
    path: 'mentor-students-list',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '学员列表（导师）',
      requiresAuth: true,
      keepAlive: true
    },
    name: 'mentor_students_list',
    component: mentorStudentsList
  },
  { 
    path: 'data-students-list',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '学员列表（数据）',
      requiresAuth: true,
      keepAlive: true
    },
    name: 'data-students-list',
    component: shujuStudentsList
  },
  {
    path: '/learning-task-mentor',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '学习任务管理（导师）',
      requiresAuth: true
    },
    name: 'learning_task_mentor',
    component: learningTaskManageMentor
  },
  {
    path: '/learning-task-headteacher',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '学习任务管理（班主任）',
      requiresAuth: true
    },
    name: 'learning_task_headteacher',
    component: learningTaskManageHeadTeacher
  },
  {
    path: '/orders-details/:orderId',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '订单详情',
      requiresAuth: true
    },
    name: 'orders-details',
    component: ordersDetails
  },
  {
    path: '/see-students',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '查看学员（直播课）',
      requiresAuth: true
    },
    name: 'see-students',
    component: seeStudentsLive
  },
  {
    path: '/see-students-employment',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '查看学员（就业课）',
      requiresAuth: true
    },
    name: 'see-students-employment',
    component: seeStudentsEmployment
  },
  {
    path: '/see-students-micro',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '查看学员（微课）',
      requiresAuth: true
    },
    name: 'see-students-micro',
    component: seeStudentsMicro
  },
  // {
  //   path: '/learn-details',
  //   icon: 'md-arrow-dropright-circle',
  //   meta: {
  //     title: '学习详情',
  //     requiresAuth: true
  //   },
  //   name: 'learn-details',
  //   component: learnDetails
  // },
  {
    path: '/add-article',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '添加资讯',
      requiresAuth: true,
      keepAlive: true
    },
    name: 'add-article',
    component: addArticle
  }, 
  {
    path: '/update-article',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '修改资讯',
      requiresAuth: true,
      keepAlive: true
    },
    name: 'update-article',
    component: updateArticle
  },
  {
    path: '/message-new',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '新建消息',
      requiresAuth: true,
      keepAlive: true
    },
    name: 'message-new',
    component: messageNew
  },
  {
    path: '/messagepushinfo',
    meta: {
      title: '查看',
      requiresAuth: true
    },
    name: 'messagepush_info',
    component: messagepushInfo
  },
  {
    path: '/messagepushedit',
    meta: {
      title: '编辑',
      requiresAuth: true
    },
    name: 'messagepush_edit',
    component: messagepushEdit
  },
  ]
}
// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [{
  path: '/livemanage',
  icon: 'ios-albums',
  name: 'livemanage',
  meta: {
    title: '资源库',
    requiresAuth: true,
    accessClient: 'bxg-live-api-dist',
    accessIdentity: 'resources'
  },
  component: Main,
  children: [{
    path: 'index',
    icon: 'logo-youtube',
    meta: {
      title: '直播库',
      requiresAuth: true,
      accessClient: 'bxg-live-api-dist',
      accessIdentity: 'resources_lives'
    },
    name: 'liveku',
    component: liveku
  }]
},
{
  path: '/salesmanage',
  icon: 'ios-stats',
  name: 'salesmanage',
  meta: {
    title: '销售管理',
    requiresAuth: true,
    accessClient: 'bxg-admin-api-dist',
    accessIdentity: 'sales'
  },
  //qx: true,
  component: Main,
  children: [{
    path: 'fee-manage',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '预报名费管理',
      requiresAuth: true,
      accessClient: 'bxg-admin-api-dist',
      accessIdentity: 'sales_deposits'
    },
    name: 'fee-manage',
    component: feeManage
  },
  {
    path: 'fee-receipts',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '预报名费单据',
      requiresAuth: true,
      accessClient: 'bxg-admin-api-dist',
      accessIdentity: 'sales_deposits_invoices'
    },
    name: 'fee-receipts',
    component: feeReceipts
  },
  {
    path: 'dredge-class',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '开通课程',
      requiresAuth: true,
      accessClient: 'bxg-admin-api-dist',
      accessIdentity: 'sales_imports_courses'
    },
    // qx: openCourses,
    name: 'dredge-class',
    component: dredgeClass
  },
  {
    path: 'back-tracking-order',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '补录订单',
      requiresAuth: true,
      accessClient: 'bxg-admin-api-dist',
      accessIdentity: 'sales_imports_orders'
    },
    // qx: collectionOrder,
    name: 'back-tracking-order',
    component: backTrackingOrder
  },
  {
    path: 'order-manage',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '订单管理',
      requiresAuth: true,
      accessClient: 'bxg-admin-api-dist',
      accessIdentity: 'sales_orders'
    },
    //qx: true,
    name: 'order-manage',
    component: orderManage
  },
  {
    path: 'refund-manage',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '退费管理',
      requiresAuth: true,
      accessClient: 'bxg-admin-api-dist',
      accessIdentity: 'sales_orders'
    },
    name: 'refund-manage',
    component: refundManage
  },
  {
    path: 'refund-underline',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '学费转移-转线下',
      requiresAuth: true,
      accessClient: 'bxg-admin-api-dist',
      accessIdentity: 'sales_orders'
    },
    name: 'refund-underline',
    component: refundUnderline
  },
  {
    path: 'refund-online-interchange',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '学费转移-线上互转',
      requiresAuth: true,
      accessClient: 'bxg-admin-api-dist',
      accessIdentity: 'sales_orders'
    },
    name: 'refund-online-interchange',
    component: refundOnlineInterChange
  }]
},
{
  path: '/coursecenter',
  icon: 'md-briefcase',
  name: 'coursecenter',
  meta: {
    title: '课程中心',
    requiresAuth: true,
    accessClient: 'bxg-admin-api-dist',
    accessIdentity: 'courses'
  },
  component: Main,
  children: [{
    path: 'phase-manage',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '阶段与任务管理',
      requiresAuth: true,
      accessClient: 'bxg-admin-api-dist',
      accessIdentity: 'courses_stages'
    },
    name: 'phase-manage',
    component: phaseManage
  }]
},
{
  path: '/teachingcenter',
  icon: 'ios-bookmarks',
  name: 'teachingcenter',
  meta: {
    title: '教学中心',
    requiresAuth: true,
    accessClient: 'bxg-admin-api-dist',
    accessIdentity: 'teaching'
  },
  component: Main,
  children: [{
    path: 'phase-group-manage',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '阶段群管理',
      requiresAuth: true,
      accessClient: 'bxg-admin-api-dist',
      accessIdentity: 'teaching_groups'
    },
    name: 'phase-group-manage',
    component: phaseGroupManage
  }, {
    path: 'learning-manage-mentor',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '学习过程管理（导师）',
      requiresAuth: true,
      accessClient: 'bxg-admin-api-dist',
      accessIdentity: 'teaching_students_process_mentors'
    },
    name: 'learningManageMentor',
    component: learningManageMentor
  }, {
    path: 'learning-manage-headteacher',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '学习过程管理（班主任）',
      requiresAuth: true,
      accessClient: 'bxg-admin-api-dist',
      accessIdentity: 'teaching_students_process_teachers'
    },
    name: 'learning-manage-headteacher',
    component: learningManageHeadTeacher
  }, {
    path: 'learning-manage-stat',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '学习过程管理（数据）',
      requiresAuth: true,
      keepAlive: true,
      accessClient: 'bxg-admin-api-dist',
      accessIdentity: 'teaching_students_process_data'
    },
    name: 'learning_manage_stat',
    component: learningManageStat
  }, {
    path: 'class-stu-management',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '课程学员管理',
      requiresAuth: true,
      keepAlive: true,
      accessClient: 'bxg-admin-api-dist',
      accessIdentity: 'teaching_courses_students'
    },
    name: 'class-stu-management',
    component: classStuManagement
  }]
},
{
  path: '/educational-administration',
  icon: 'md-bookmarks',
  name: 'educational-administration',
  meta: {
    title: '教务管理',
    requiresAuth: true,
    accessClient: 'bxg-admin-api-dist',
    accessIdentity: 'affairs'
  },
  component: Main,
  children: [{
    path: 'electronicContract',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '电子合同',
      requiresAuth: true,
      accessClient: 'bxg-admin-api-dist',
      accessIdentity: 'affairs_contracts'
    },
    name: 'electronic-contract',
    component: electronicContract
  }]
},
{
  path: '/info-manage',
  icon: 'ios-calendar',
  name: 'info-manage',
  meta: {
    title: '资讯管理',
    requiresAuth: true,
    accessClient: 'bxg-admin-api-dist',
    accessIdentity: 'articles'
  },
  component: Main,
  children: [{
    path: 'info-list',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '资讯列表',
      requiresAuth: true,
      keepAlive: true,
      accessClient: 'bxg-admin-api-dist',
      accessIdentity: 'articles_list'
    },
    name: 'info-list',
    component: infoList
  },
  {
    path: 'audit-manage',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '审核管理',
      requiresAuth: true,
      accessClient: 'bxg-admin-api-dist',
      accessIdentity: 'articles_audits'
    },
    name: 'audit-manage',
    component: auditManage
  },
  {
    path: 'statistics',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '统计',
      requiresAuth: true,
      accessClient: 'bxg-admin-api-dist',
      accessIdentity: 'articles_statistics'
    },
    name: 'statistics',
    component: statistics
  }]
},
{
  path: '/user-management',
  icon: 'ios-people',
  name: 'user-management',
  meta: {
    title: '用户管理',
    requiresAuth: true,
    accessClient: 'bxg-admin-api-dist',
    accessIdentity: 'users'
  },
  component: Main,
  children: [{
    path: 'student-management',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '学员管理',
      requiresAuth: true,
      accessClient: 'bxg-admin-api-dist',
      accessIdentity: 'users_students'
    },
    name: 'student-management',
    component: studentManagement
  },
  {
    path: 'backgroundUser-management',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '后台用户管理',
      requiresAuth: true,
      accessClient: 'bxg-admin-auth-api-dist',
      accessIdentity: 'users_manager'
    },
    name: 'backgroundUser-management',
    component: BackgroundUserManagement
  }]
},
{
  path: '/finance-manage',
  icon: 'logo-usd',
  name: 'finance-manage',
  meta: {
    title: '财务管理',
    requiresAuth: true,
    accessClient: 'bxg-admin-api-dist',
    accessIdentity: 'finances'
  },
  // 临时
  //qx: true,
  component: Main,
  children: [
    {
      path: 'back-tracking-pay',
      icon: 'md-arrow-dropright-circle',
      meta: {
        title: '补录支付流水',
        requiresAuth: true,
        accessClient: 'bxg-admin-api-dist',
        accessIdentity: 'finances_import_payment'
      },
      // 临时
      // qx: collectionToPayWater,
      name: 'back-tracking-pay',
      component: backTrackingPay
    },
    {
      path: 'back-tracking-check',
      icon: 'md-arrow-dropright-circle',
      meta: {
        title: '审核补录支付流水',
        requiresAuth: true,
        accessClient: 'bxg-admin-api-dist',
        accessIdentity: 'finances_audits_import_payment'
      },
      // 临时
      // qx: auditCollectionToPay,
      name: 'back-tracking-check',
      component: backTrackingCheck
    }]
},
{
  path: '/permissions-management',
  icon: 'ios-people',
  name: 'permissions-management',
  meta: {
    title: '权限管理',
    requiresAuth: true,
    accessClient: 'bxg-admin-auth-api-dist',
    accessIdentity: 'auth'
  },
  component: Main,
  children: [{
    path: 'roleManagement',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '角色管理',
      requiresAuth: true,
      accessClient: 'bxg-admin-auth-api-dist',
      accessIdentity: 'auth_roles'
    },
    name: 'role-Management',
    component: roleManagement
  }]
},
{
  path: '/message-manage',
  icon: 'ios-text-outline',
  name: 'message-manage',
  meta: {
    title: '消息管理',
    requiresAuth: true,
    accessClient: 'bxg-admin-api-dist',
    accessIdentity: 'messages'
  },
  component: Main,
  children: [{
    path: 'messagePush',
    icon: 'md-arrow-dropright-circle',
    meta: {
      title: '推送消息',
      requiresAuth: true,
      accessClient: 'bxg-admin-api-dist',
      accessIdentity: 'messages_push'
    },
    name: 'message-push',
    component: messagePush
  }]
}
]
//404
export const page404 = {
  path: '/*',
  redirect: "/"
};

export const routers = [
  // loginRouter,
  otherRouter,
  ...appRouter,
  page404
];
