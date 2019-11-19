import api from '@/config/apiconfig'
import http from '@/util/http';
export default {
  fetchLiveLog(params) { //操作记录
    return http.get(`${api.liveUrl}/api/live/lives/${params.id}/log`, params);
  },
  fetchLiveDetails(params) { //直播详情
    return http.get(`${api.liveUrl}/api/live/lives/${params.id}/detail/${params.currentPage}/${params.pageSize}`, params);
  },
  fetchLiveStayAnalysis(params) { //直播用户停留分析接口
    return http.get(`${api.liveUrl}/api/live/lives/${params.id}/report/interval`, params);
  },
  fetchDataImaging(params) { //直播数据图形化数据接口
    return http.get(`${api.liveUrl}/api/live/lives/${params.id}/statistics/diagram`, params);
  },
  fetchBaseData(params) { //直播基本统计数据接口
    return http.get(`${api.liveUrl}/api/live/lives/${params.id}/statistics/basic`, params);
  },
  fetchLiveList(params) { //直播库列表
    return http.get(`${api.liveUrl}/api/live/lives/${params.currentPage}/${params.pageSize}`, params);
  },
  patchLiveRecord(params) {
    return http.patch(`${api.liveUrl}/api/live/lives/rooms/${params.id}`, params)
  },
  fetchMenus() { //获取学科列表
    return http.get(`${api.appUrl}/bxg/interface/menus`)
  },
  fetchTeachers(params) { //获取教师列表
    return http.get(`${api.appUrl}/bxg/interface/teachers`, params)
  },
  postLives(params) { // 新增直播课
    return http.post(`${api.liveUrl}/api/live/lives`, params)
  },
  getPermissions(params) { //获取权限
    return http.get(`${api.liveUrl}/api/live/lives/${params.liveId}/permissions`, params)
  },
  postPermissions(params) { //设置权限
    return http.post(`${api.liveUrl}/api/live/lives/${params.liveId}/permissions`, params)
  },
  setStatus(params) { //启禁用直播课
    return http.put(`${api.liveUrl}/api/live/lives/${params.liveId}/status/${params.targetStatus}`, params)
  },
  getRooms(params) { //获取直播间数据
    return http.get(`${api.liveUrl}/api/live/lives/${params.liveId}/rooms`, params)
  },
  getDepositList(params) { //预报名费查询列表
    return http.get(`${api.bmfUrl}/deposit/depositList`, params)
  },
  getDepositDetail(params) { //查看报名费详情
    return http.get(`${api.bmfUrl}/deposit/depositDetail`, params)
  },
  getDepositRefundDetail(params) { // 查看预报名费的退款信息
    return http.get(`${api.bmfUrl}/deposit/depositRefundDetail`, params)
  },
  postSaveDepositRefund(params) { // 预报名费退款(已支付已生效的单据才可退费)
    return http.post(`${api.bmfUrl}/deposit/saveDepositRefund`, params)
  },
  //预报名费管理
  getDepositManageList(params) { //预报名费管理列表
    return http.get(`${api.bmfUrl}/depositMessageTemplate/getMessageTemplateList`, params)
  },
  setDepositManageStatus(params) { //预报名费模板禁用
    return http.get(`${api.bmfUrl}/depositMessageTemplate/updateTemplateStatus`, params)
  },
  sendNewsDepositManage(params) { //预报名费模板发送消息
    return http.get(`${api.bmfUrl}/depositMessageTemplate/saveMessage`, params)
  },
  getDepositTemplateName(params) { //预报名费模板名称检索
    return http.get(`${api.bmfUrl}/depositMessageTemplate/getQueryCondition4CreateTemplate`, params)
  },
  getDepositTemplateSearchData(params) { //预报名费模板搜索数据
    return http.get(`${api.bmfUrl}/depositMessageTemplate/getQueryCondition`, params)
  },
  postDepositTemplate(params) { //新建预报名费模板
    return http.post(`${api.bmfUrl}/depositMessageTemplate/saveTemplate`, params)
  },
  getDepositInformationList(params) { //新建预报名费通知列表
    return http.get(`${api.bmfUrl}/depositMessage/getMessageList`, params)
  },
  getDepositInformationTemplate(params) { //新建预报名费通知模板名称
    return http.get(`${api.bmfUrl}/depositMessage/getQueryCondition`, params)
  },
  postDepositInformationExport(params) { //新建预报名费通知数据导出
    return http.get(`${api.bmfUrl}/depositMessage/exportData`, params)
  },
  postChangeFepositCourse(params) { // 更换课程
    return http.post(`${api.bmfUrl}/deposit/changeDepositCourse`, params)
  },
  getCourselogs(params) { // 查看更换课程历史
    return http.get(`${api.bmfUrl}/deposit/courselogs`, params)
  },
  getExportDepositData(params) { //导出预报名费列表数据
    return http.get(`${api.bmfUrl}/deposit/exportDepositData`, params)
  },
  getQueryCondition4ChangeCourse() { //获取更换课程查询条件数据
    return http.get(`${api.bmfUrl}/deposit/getQueryCondition4ChangeCourse`)
  },
  getPlaybackData(params) { // 回放列表分页接口
    return http.get(`${api.liveUrl}/api/live/lives/${params.liveId}/records/${params.currentPage}/${params.pageSize}`)
  },
  putPlaybackstate(params) { // 启禁用回放数据
    return http.put(`${api.liveUrl}/api/live/records/${params.recordId}/status/${params.targetStatus}`)
  },
  getLiveDetail(params) { // 直播详情
    return http.get(`${api.liveUrl}/api/live/lives/${params.id}/detail/${params.currentPage}/${params.pageSize}`)
  },
  getLiveCourse(params) { // 根据多学科id获取课程列表
    return http.get(`${api.appUrl}/bxg/interface/getAllCourses`, params)
  },
  getLiveUseAll(params) { // 获取某直播下所有用户列表/获取用户列表
    if (params.currentPage || params.pageSize) {
      return http.get(`${api.appUrl}/bxg/interface/users/${params.currentPage}/${params.pageSize}`, params)
    } else {
      return http.get(`${api.appUrl}/bxg/interface/users`, params)
    }
  },
  putEditorLives(params) { //编辑直播课
    return http.put(`${api.liveUrl}/api/live/lives/${params.id}`, params)
  },
  getOrderManagement(params) { //订单管理
    return http.get(`${api.bmfUrl}/order/list`, params);
  },
  getOrderDetails(params) { //订单详情
    return http.get(`${api.bmfUrl}/order/${params.orderId}`);
  },
  getPaySystemData() { //订单管理支付方式
    return http.get(`${api.bmfUrl}/system/payment/`);
  },
  /**
   * 附件
   */
  getAttachmentDetail(params) { // 根据文件url获取文件摘要信息接口
    return http.get(`${api.bmfUrl}/attachment/detail`, params)
  },
  /**
   *以下为课程中心
   **/
  getPhases(params = {}) { // 获取学习阶段分页数据
    return http.get(`${api.bmfUrl}/learning/stages`, params)
  },
  patchPhaseStatus(params = {}) { // 学习阶段启用禁用
    let phaseId = params.stageId
    return http.patch(`${api.bmfUrl}/learning/stages/${phaseId}/status`, params)
  },
  postPhaseCreation(params = {}) { // 新建阶段管理
    return http.post(`${api.bmfUrl}/learning/stages`, params)
  },
  patchPhaseById(params = {}) { // 根据学习阶段ID修改内容数据
    let phaseId = params.stageId
    return http.patch(`${api.bmfUrl}/learning/stages/${phaseId}`, params)
  },
  deletePhaseById(params = {}) { // 根据学习阶段ID删除学习阶段
    let phaseId = params.stageId
    return http.delete(`${api.bmfUrl}/learning/stages/${phaseId}`, params)
  },
  postPhaseSort(params = {}) { // 学习阶段上移下移
    let phaseId = params.stageId
    return http.post(`${api.bmfUrl}/learning/stages/${phaseId}/sort`, params)
  },
  getPhasesBySubjectId(params = {}) {
    let subjectId = params.subjectId
    params.subjectId = Number(params.subjectId)
    return http.get(`${api.bmfUrl}/learning/stages/${subjectId}/stages`, params)
  },
  getTasksByPhaseId(params = {}) {
    let phaseId = params.phaseId
    return http.get(`${api.bmfUrl}/learning/stages/${phaseId}/tasks`, params)
  },
  getTasks(params = {}) { // 获取学习任务分页数据
    params.phaseId = Number(params.phaseId)
    return http.get(`${api.bmfUrl}/learning/tasks`, params)
  },
  postTaskCreation(params = {}) { // 创建学习任务
    return http.post(`${api.bmfUrl}/learning/tasks`, params)
  },
  patchTaskById(params = {}) { // 根据任务ID修改任务内容数据
    let taskId = params.taskId
    return http.patch(`${api.bmfUrl}/learning/tasks/${taskId}`, params)
  },
  patchTaskStatus(params = {}) { // 根据任务ID启用or禁用学习任务
    let taskId = params.taskId
    return http.patch(`${api.bmfUrl}/learning/tasks/${taskId}/status`, params)
  },
  patchTaskSort(params = {}) { // 根据任务ID上移或下移学习任务
    let taskId = params.taskId
    return http.patch(`${api.bmfUrl}/learning/tasks/${taskId}/sort`, params)
  },
  deleteTaskById(params = {}) { // 根据学习任务ID删除学习任务
    let taskId = params.taskId
    return http.delete(`${api.bmfUrl}/learning/tasks/${taskId}`, params)
  },
  getSubjects(params = {}) { // 获取学科信息
    return http.get(`${api.bmfUrl}/student/subjects`, params)
  },
  /**
   *以下为教学中心
   **/
  getStudentInfo(params) { //获取学籍卡详情数据接口
    return http.get(`${api.bmfUrl}/school/card/users/${params.uuid}`)
  },
  /**
   * 我的学员
   */
  postMyStudents(params) { //我的学员列表
    return http.post(`${api.bmfUrl}/process/groups/students`, params)
  },
  getProcesses(params) { //我的学员列表-->整体进度
    return http.get(`${api.bmfUrl}/learn/detail/user/total-processes`, params)
  },
  getStageOf(params) { //获取阶段群
    return http.get(`${api.bmfUrl}/groups/teaching`, params)
  },
  postAddGroups(params) { //创建阶段群
    return http.post(`${api.bmfUrl}/groups/`, params)
  },
  patchUpdataGroups(params) { //修改阶段群
    return http.patch(`${api.bmfUrl}/groups/${params.groupId}`, params)
  },
  deleteGroups(params) { //删除阶段群
    return http.delete(`${api.bmfUrl}/groups/${params.groupId}`)
  },
  deleteGroupsTeacher(params) { //删除阶段群导师和班主任
    return http.delete(`${api.bmfUrl}/groups/teachers/${params.groupAssistantId}`)
  },
  postAddGroupsTeacher(params) { //添加阶段群导师和班主任
    return http.post(`${api.bmfUrl}/groups/teachers`, params)
  },
  getGroupsTeacherLog(params) { //导师和班主任变更日志
    return http.get(`${api.bmfUrl}/groups/teachers/logs/${params.groupId}`, params)
  },
  getGroupsTeacher(params) { //阶段群老师列表
    return http.get(`${api.bmfUrl}/groups/${params.groupId}/teachers`, params)
  },
  getSearchGroups(params) { //搜索阶段群
    return http.get(`${api.bmfUrl}/groups/`, params)
  },
  getClassStage(params) { //学科下阶段
    return http.get(`${api.bmfUrl}/groups/stages/${params.subjectId}`, params)
  },
  getClassStageFlock(params) { //阶段下阶段群
    return http.get(`${api.bmfUrl}/groups/stageId/${params.stageId}`, params)
  },
  getPromoted(params) { //学员晋级操作
    return http.post(`${api.bmfUrl}/process/group/student-promotion`, params)
  },
  getRoles(params) { //角色
    return http.get(`${api.bmfUrl}/groups/roles`, params)
  },
  getRolesMan(params) { //角色对应的人员
    return http.get(`${api.bmfUrl}/groups/${params.groupId}/Lecturers`, params)
  },
  postStageOf(params) { //阶段群
    return http.post(`${api.bmfUrl}/process/getAllGroupUser/${params.currentPage}/${params.pageSize}`, params)
  },
  getLogList(params) { //日志列表
    return http.get(`${api.bmfUrl}/process/group/student-logs`, params)
  },
  getDelStudent(params) { //删除学员
    return http.delete(`${api.bmfUrl}/process/group/student`, params)
  },
  getGroups(params) { //我得学员阶段群
    return http.get(`${api.bmfUrl}/process/groups`, params)
  },
  coursesList(params) { //所有课程列表
    return http.get(`${api.bmfUrl}/process/courses`, params)
  },
  getSubjectsList(params) { //学员管理获取学科列表
    return http.get(`${api.bmfUrl}/student/learners/subjects`, params)
  },
  getCoursesList(params) { //学员管理根据学科id获取课程列表
    return http.get(`${api.bmfUrl}/student/learners/courses`, params)
  },
  /**
   * 课程学员管理
   */
  getCourseStudent(params) { //获取该课程下的学员列表
    // courseId, courseType
    return http.get(`${api.bmfUrl}/course/students`, params)
  },
  getOptionsList(params) {
    // courseId
    return http.get(`${api.bmfUrl}/options/${params.courseId}`, params)
  },
  getPhaseLock(params) {
    // courseId, userId
    return http.get(`${api.bmfUrl}/student/phase`, params)
  },
  getPhaseLockLog(params) {
    // stuCourseId, pageNum, pageSize
    return http.get(`${api.bmfUrl}/phase/logs`, params)
  },
  patchPhaseLockStatus(params) {
    // type, courseId, userId, phaseId, stuCourseId, reason
    return http.patch(`${api.bmfUrl}/phase/status`, params)
  },
  getClassList(params) { //就业课/微课/直播课列表
    return http.get(`${api.bmfUrl}/course/manager`, params)
  },
  getliveCourseModuleList(params) { //获取直播课列表课程模块
    return http.get(`${api.bmfUrl}/live/${params.courseId}/module`, params)
  },
  /**
   * 学习过程管理
   */
  getLatestStatistics(params) { //最新统计数据 --> 列表
    return http.get(`${api.bmfUrl}/process/data/groups`, params)
  },
  getWeekStatistics(params) { //周统计数据 --> 列表
    return http.get(`${api.bmfUrl}/process/data/${params.pageNumber}/${params.pageSize}/teachingGroup/groupWeekOfStatistics`, params)
  },
  getDates() { //获取日期列表
    return http.get(`${api.bmfUrl}/process/data/teachingGroup/countTheDatesOfTheWeeks`)
  },
  getPlans(params) { //获取沟通计划数据 --> 列表
    return http.get(`${api.bmfUrl}/plans/`, params)
  },
  getJurisdiction(params) { //获取沟通计划数据 --> 新建+操作按钮 -- 判断是否有权限
    return http.get(`${api.bmfUrl}/plans/permission`, params)
  },
  getGroupsCurrentLogin(params) { // 获取沟通计划 --> 新建计划 --> 阶段群
    return http.get(`${api.bmfUrl}/groups/current-login`, params)
  },
  getGroupsStudents(params) { //获取沟通计划 --> 新建计划 --> 学员
    return http.get(`${api.bmfUrl}/groups/${params.groupId}/students`, params)
  },
  getTeacher(params) { //获取沟通计划 --> 新建计划 --> 沟通人
    return http.get(`${api.bmfUrl}/groups/${params.id}/staffs`, params)
  },
  postSavePlan(params) { //新建沟通计划 --> 保存沟通计划
    return http.post(`${api.bmfUrl}/plans/`, params)
  },
  getFinishPlan(params) { //沟通计划 --> 标记完成
    return http.get(`${api.bmfUrl}/communication/group/${params.groupId}/studentCourse/${params.studentCourseId}`, params)
  },
  patchFinishPlan(params) { //沟通计划 --> 标记完成 --> 确认完成
    return http.patch(`${api.bmfUrl}/plans/${params.planId}/communication/${params.communicationId}`, params)
  },
  patchAbandon(params) { //沟通计划 --> 标记完成 --> 放弃沟通计划 / 修改沟通计划
    return http.patch(`${api.bmfUrl}/plans/${params.planId}`, params)
  },
  getDetailPlan(params) { //沟通计划 --> 查看详情
    return http.get(`${api.bmfUrl}/plans/${params.planId}`, params)
  },
  /**
   * 沟通记录
   **/
  getInitCommunication(params) { //沟通记录-->数据初始化
    return http.get(`${api.bmfUrl}/communication/group/${params.groupId}/student/${params.studentId}`, params)
  },
  getOfCommunication(params) { //沟通记录-->任务内容
    return http.get(`${api.bmfUrl}/students/${params.studentId}/course/${params.courseId}/task`)
  },
  getChooseStage(params) { //沟通记录-->新建任务-->选择阶段
    return http.get(`${api.bmfUrl}/learning/stages/${params.subjectId}/stages`)
  },
  getChooseTask(params) { //沟通记录-->新建任务-->选择任务
    return http.get(`${api.bmfUrl}/learning/stages/${params.stageId}/tasks`)
  },
  postSaveTask(params) { //沟通记录-->新建保存任务
    return http.post(`${api.bmfUrl}/students/tasks`, params)
  },
  postChangetask(params) { //沟通记录-->修改后保存任务
    return http.post(`${api.bmfUrl}/students/studentTask/${params.studentTaskId}/task/${params.taskId}`, params)
  },
  postSubmit(params) { //沟通记录整体提交
    return http.post(`${api.bmfUrl}/communication/`, params)
  },
  getCoursesPage(params) { //课程详情分页数据列表接口
    return http.get(`${api.bmfUrl}/school/card/courses`, params)
  },
  postpones(params) { //修改服务时间接口
    return http.patch(`${api.bmfUrl}/school/card/postpones`, params)
  },
  getRelevance(params) { //沟通记录-->关联沟通计划
    return http.get(`${api.bmfUrl}/plans/group/${params.groupId}/studentCourse/${params.studentCourseId}`)
  },
  getCommunicationTeacher(params) { //沟通记录-->下次沟通计划--> 弹窗--选择老师
    return http.get(`${api.bmfUrl}/groups/${params.id}/staffs`, params)
  },
  /**
   *以下为学习详情
   **/
  getStuDynamic(params) { //学员动态接口
    return http.get(`${api.bmfUrl}/students/${params.studentId}/course/${params.courseId}/task/communication`, params)
  },
  getClassModule(params) { //分页查询课程模块列表接口
    return http.get(`${api.bmfUrl}/learn/detail/course/modules`, params)
  },
  getVideoSchedule(params) { //查询视频进度接口
    return http.get(`${api.bmfUrl}/learn/detail/video/processes`, params)
  },
  getModuleSchedule(params) { //分页获取模块进度接口
    return http.get(`${api.bmfUrl}/learn/detail/module/processes`, params)
  },
  getPhaseWork(params) { //分页查询阶段阶段作业接口
    return http.get(`${api.bmfUrl}/learn/detail/phasehomework`, params)
  },
  getClassPhaseWork(params) { //查询课程下的阶段列表接口
    return http.get(`${api.bmfUrl}/learn/detail/${params.courseId}/phases`, params)
  },
  getStudyTrack(params) { //学习轨迹列表查询接口
    return http.get(`${api.bmfUrl}/learn/detail/student/${params.studentId}/course/${params.courseId}/studyPath`, params)
  },
  getStudyFeedback(params) { //学习反馈分页查询接口
    return http.get(`${api.bmfUrl}/feedBack/student/${params.studentId}/course/${params.courseId}`, params)
  },
  getStudyNote(params) { //笔记分页查询接口
    return http.get(`${api.bmfUrl}/notes/student/${params.studentId}/course/${params.courseId}`, params)
  },
  getStudentsAsk(params) { //查询学员所有提问问题分页数据列表接口
    return http.get(`${api.bmfUrl}/school/card/asks/${params.uuid}`, params)
  },
  getAskDetails(params) { //问答提问查看详情接口
    return http.get(`${api.bmfUrl}/school/card/asks/details/${params.id}`, params)
  },
  getExpandInfo(params) { //查询拓展资料列表接口
    return http.get(`${api.bmfUrl}/learn/detail/student-phaseextend/${params.pageNumber}/${params.pageSize}`, params)
  },
  getExpandPlan(params) { //查询拓展资料进度接口
    return http.get(`${api.bmfUrl}/learn/detail/student-phaseextend/process`, params)
  },
  getStudyDetails(params) { //获取学习详情接口
    return http.get(`${api.bmfUrl}/learn/detail/learn-details/${params.stuCourseId}`, params)
  },
  suspensions(params) { //休学接口
    return http.patch(`${api.bmfUrl}/school/card/suspensions`, params)
  },
  suspensionsOver(params) { //结束休学接口
    return http.patch(`${api.bmfUrl}/school/card/suspensions/over`, params)
  },
  patchRefunds(params) { //退费接口
    return http.patch(`${api.bmfUrl}/school/card/refunds`, params)
  },
  getOperationLog(params) { //课程操作日志分页数据列表接口
    return http.get(`${api.bmfUrl}/school/card/logs/${params.userId}`, params)
  },
  getLoginLog(params) {  //用户登陆分页数据列表接口
    return http.get(`${api.bmfUrl}/school/card/login/logs/${params.userId}`, params)
  },
  getLogsInfo(params) { //根据类型查看课程操作日志
    return http.get(`${api.bmfUrl}/school/card/logs/info/${params.id}`, params)
  },
  getQuestions(params) { //查询学员所有提问问题分页数据列表接口
    return http.get(`${api.bmfUrl}/school/card/asks/${params.uuid}`, params)
  },
  getCurrentTask(params) { //读取当前任务接口
    return http.get(`${api.bmfUrl}/students/${params.studentId}/course/${params.courseId}/task`)
  },
  postCommunicationRecord(params) { //保存沟通记录
    return http.post(`${api.bmfUrl}/communication/`, params)
  },
  getModulesList(params) { //查询课程下的模块列表
    return http.get(`${api.bmfUrl}/learn/detail/modules`, params)
  },
  getModuleLiveList(params) { //直播课获取学习详情课程模块
    return http.get(`${api.bmfUrl}/student/live/module`, params)
  },
  /**
   * 学习过程管理（数据）
   */
  getLatestDateList() { // 最新数据日期筛选列表
    return http.get(`${api.bmfUrl}/process/data/dates`)
  },
  getLatestStats(params) { // 获取学科, 阶段, 阶段群最新统计列表
    // dataType, pageNumber, pageSize
    return http.get(`${api.bmfUrl}/process/data/groups`, params)
  },
  getTotalStatistics(params) { // 获取学科, 阶段, 阶段群汇总数据
    // dataType, dateCondition
    return http.get(`${api.bmfUrl}/process/data/data-total`, params)
  },
  getWeekDateList() { // 周数据日期筛选列表
    return http.get(`${api.bmfUrl}/process/data/teachingGroup/countTheDatesOfTheWeeks`)
  },
  getWeekSubjectStats(params) { // 获取学科周汇总数据
    // previousDate, laterDate, pageNumber, pageSize
    return http.get(`${api.bmfUrl}/process/data/${params.pageNumber}/${params.pageSize}/teachingGroup/subjectWeekOfStatistics`, params)
  },
  getWeekStageStats(params) { // 获取阶段周汇总数据
    return http.get(`${api.bmfUrl}/process/data/${params.pageNumber}/${params.pageSize}/teachingGroup/stageWeekOfStatistics`, params)
  },
  getWeekStageGroupStats(params) {
    return http.get(`${api.bmfUrl}/process/data/${params.pageNumber}/${params.pageSize}/teachingGroup/groupWeekOfStatistics`, params)
  },
  getGroupsList(params) { //阶段群列表
    return http.get(`${api.bmfUrl}/groups/teaching`, params)
  },
  getStagesList(params) { //学科下阶段列表
    return http.get(`${api.bmfUrl}/groups/stages/${params.subjectId}`)
  },
  /**
   * 学习任务管理
   */
  getPageLearningTasks(params) { // 获取当前页学习任务数据
    let studentId = params.studentId
    let courseId = Number(params.courseId)
    return http.get(`${api.bmfUrl}/students/${studentId}/courses/${courseId}/tasks`, params)
  },
  getLearningPhases(params) { // 获取学员课程阶段
    let studentId = params.studentId
    let courseId = Number(params.courseId)
    return http.get(`${api.bmfUrl}/students/${studentId}/courses/${courseId}/stages`, params)
  },
  postLearningTask(params) {
    return http.post(`${api.bmfUrl}/students/tasks`, params)
  },
  patchLearningTaskStatus(params) { // 终止任务
    let reason = params.reason
    let taskId = Number(params.taskId)

    return http.patch(`${api.bmfUrl}/students/studentTask/${taskId}`, {
      reason,
      id: taskId
    })
  },
  getWaitStudents(params) { //查询阶段群未添加学员列表
    return http.get(`${api.bmfUrl}/process/group/wait-students`, params)
  },
  postStudent(params) { //添加学员
    return http.post(`${api.bmfUrl}/process/group/student`, params);
  },
  getCourses(params) { //获取课程列表
    return http.get(`${api.bmfUrl}/student/courses`, params)
  },

  /**
   * 教务管理
   *  电子合同
   */
  getElectronicContractList(params) { //电子合同列表
    return http.get(`${api.bmfUrl}/contractManage/pageContract`, params)
  },
  /**
   * 财务管理
   */
  getCourseList(params) { //获取课程列表（可多选，单选）
    return http.get(`${api.bmfUrl}/student/course/${params.mark}/list`, params)
  },
  getSubjectList(params) { //获取学科列表（已启用，已禁用）
    return http.get(`${api.bmfUrl}/student/subject/${params.mark}/list`, params)
  },
  //开通课程
  getOCBatchExport(params) { //批量导出
    return http.get(`${api.bmfUrl}/import/course/export/data`, params)
  },
  getOpenClassList(params) { //开通课程列表
    return http.get(`${api.bmfUrl}/import/course/list`, params)
  },
  getOpenClassSave(params) { //保存
    return http.post(`${api.bmfUrl}/import/course/`, params)
  },
  //补录订单
  getCOBatchExport(params) { //批量导出
    return http.get(`${api.bmfUrl}/import/order/export/data`, params)
  },
  getCOSave(params) { //保存
    return http.post(`${api.bmfUrl}/import/order/`, params)
  },
  getCollectOrderList(params) { //补录订单列表
    return http.get(`${api.bmfUrl}/import/order/list`, params)
  },
  getServicePeriod(params) { //根据金额计算服务期
    return http.get(`${api.bmfUrl}/import/order/service/period`, params)
  },
  getStudentInfoF(params) { //获取学员信息
    return http.get(`${api.bmfUrl}/student/student/${params.mark}/info`, params)
  },
  getMyCouponsFee(params) { //获取优惠券和报名费
    return http.get(`${api.bmfUrl}/order/coupon-deposit`, params)
  },
  /*
   * 财务需求模块
   */
  getCollectionOrder(params) { //补录支付流水
    return http.get(`${api.bmfUrl}/import/payment/orders`, params)
  },
  getSystemData() { //获取补录流水下拉框
    return http.get(`${api.bmfUrl}/import/payment/system-variate`)
  },
  getOrderContent(params) { //订单内容
    return http.get(`${api.bmfUrl}/import/payment/order/${params.orderId}
`, params)
  },
  postCollectioWater(params) { //补录流水操作
    return http.post(`${api.bmfUrl}/import/payment`, params)
  },
  getAuditCollection(params) { //获取审核补录流水列表
    return http.get(`${api.bmfUrl}/import/payment`, params)
  },
  getPaymentDetail(params) { //补录流水详情
    return http.get(`${api.bmfUrl}/import/payment/${params.id}`, params)
  },
  getPaymentlogList(params) { //补录流水日志
    return http.get(`${api.bmfUrl}/import/payment/logs`, params)
  },
  postSaveReceiptno(params) { //修改补录流水得收据号
    return http.patch(`${api.bmfUrl}/import/payment/${params.id}`, params)
  },
  postAuditPayment(params) { //补录流水审核
    return http.patch(`${api.bmfUrl}/import/payment/audit`, params)
  },

  /**
   * 资讯管理
   */
  //咨讯列表
  getInfoManageList(params) {
    return http.get(`${api.bmfUrl}/articles`, params)
  },
  //一级栏目
  getFirstColumn() {
    return http.get(`${api.bmfUrl}/student/subjects`)
  },
  //预览
  getPreview(params) {
    return http.get(`${api.bmfUrl}/articles/${params.id}/preview`, params)
  },

  //提交||撤回
  patchArticles(params) {
    return http.patch(`${api.bmfUrl}/articles/${params.ids}/operation/${params.operation}`, params)
  },
  //日志
  getLog(params) {
    return http.get(`${api.bmfUrl}/articles/${params.id}/logs`, params)
  },
  //统计
  getStatistics(params) {
    return http.get(`${api.bmfUrl}/article-statistics`, params)
  },

  /**
  *  用户管理-学员管理
  *
  */
  getStudentList(params) { //学员分页条件查询
    return http.get(`${api.bmfUrl}/student/learners`, params)
  },
  getJobYears(params) { //获取工作年限列表
    return http.get(`${api.bmfUrl}/student/learners/job/years`, params)
  },
  getRegisterResources(params) { //获取注册来源列表
    return http.get(`${api.bmfUrl}/student/learners/register/resources`, params)
  },
  getProvinces(params) { //查询所有省份
    return http.get(`${api.bmfUrl}/student/learners/provinces`, params)
  },
  getLearnersTeachers(params) { //查询未关联后台用户列表
    return http.get(`${api.bmfUrl}/student/learners/teachers`, params)
  },
  associatedTeacher(params) { //关联老师
    return http.post(`${api.bmfUrl}/student/learners/teacher`, params)
  },
  /**
  *  用户管理-后台用户管理  backgroundUser
  *
  */
  getbackgroundUserList(params){ // 获取后台用户列表
    return http.get(`${api.userUrl}/users/${params.page}/${params.size}`)
  },
  patchPhaseBackgroundUser(params){ // 启动/禁用
    return http.patch(`${api.userUrl}/users/${params.id}/status/${params.status}`,params)
  },
  ResetPassword(params){  // 重置密码
    return http.put(`${api.userUrl}/users/email/${params.email}`)
  },
  addBackgroundUser(params){  // 添加用户
    return http.post(`${api.userUrl}/users`, params)
  },
  setBackgroundUser(params){  // 修改用户
    return http.put(`${api.userUrl}/users/${params.id}`, params)
  },
  getBackgroundUser(params){  // 根据邮箱查询用户
    return http.get(`${api.userUrl}/users/email/${params.email}`)
  },
  getRoleList(params){
    return http.get(`${api.userUrl}/roles`, params)
  },

  /**
   * 资讯
   */
  getListArticles(params) { //资讯列表
    return http.get(`${api.bmfUrl}/articles`, params)
  },
  postSaveArticles(params) { // articles 保存/更新资讯文章
    return http.post(`${api.bmfUrl}/articles`, params)
  },
  getArticlesItem(params) { // 获取文章内容
    return http.get(`${api.bmfUrl}/articles/${params.id}`)
  },
  //上传图片
  postFileImg(params, headers) {
    return http.post(`${api.bmfUrl}/attachment/files`, params, headers)
  },
  /**
   * 权限管理
   */
  getRolManagementList(params) { //角色列表
    return http.get(`${api.userUrl}/roles`, params)
  },
  keepRolMangement(params) { //保存角色
    return http.post(`${api.userUrl}/roles`, params)
  },
  putRolMangement(params) { //修改角色
    return http.put(`${api.userUrl}/roles/${params.id}`, params)
  },
  deleteRolMangement(params) { //删除角色
    return http.delete(`${api.userUrl}/roles${params.id}`, params)
  },
  patchRolMangement(params) { //启/禁用角色
    return http.patch(`${api.userUrl}/roles/${params.id}/status/${params.status}`, null)
  },
  getRolResourceList(params) { //资源列表
    return http.get(`${api.userUrl}/resources`, params)
  },
  /**
   * 消息推送
   */ 
  getMessageList(params) {  // 消息推送列表
    return http.get(`${api.bmfUrl}/push/message`, params)
  },
  postMessageAdd(params) { // 消息推送添加
    return http.post(`${api.bmfUrl}/push/message`, params)
  },
  patchMessageModify(params) { // 消息推送修改
    return http.patch(`${api.bmfUrl}/push/message`, params)
  },
  getMessagePush(params){ // 获取消息推送
    return http.get(`${api.bmfUrl}/push/message/${params.id}`)
  },
  getMessageCheck(params){ // 检查是否超时
    return http.get(`${api.bmfUrl}/push/message/check/${params.id}`)
  },
  patchMessageClose(params) { // 关闭消息推送
    return http.patch(`${api.bmfUrl}/push/message/close/${params.id}`)
  },
  getMessageCourselis(params){ // 课程列表
    return http.get(`${api.bmfUrl}/push/message/courses`,params)
  },
  getMessageCourses(params){ // 课程列表
    return http.get(`${api.bmfUrl}/push/message/courses/${params.menuId}`)
  },
  getMessageMenus(params){ // 学科列表
    return http.get(`${api.bmfUrl}/push/message/menus`, params)
  },
  getMessagePlanCount(params){ // 获取推送人群人数
    return http.get(`${api.bmfUrl}/push/message/plan-count`, params)
  },
  getMessageLiveList(params){ // 根据学科ID查询直播列表  menuId
    return http.get(`${api.liveUrl}/api/live/lives`, params)
  },
  getMessageLivexiangq(params){ // 根据直播ID查询直播详情 
    return http.get(`${api.liveUrl}/api/live/`, params)
  },
  getMessageListcheck(params) {  //检查是否超时
    return http.get(`${api.bmfUrl}/push/message/check/${params.id}`)
  },
  
}
