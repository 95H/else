import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import keycloak from './modules/keycloak';
import liveku from './modules/liveku';
import feeReceipts from './modules/feeReceipts';
import feeManage from "./modules/feeManage";
import stageOf from "./modules/stageOf";
import student from './modules/student';
import courseCenter from './modules/courseCenter';
import recordOfCommunication from "./modules/recordOfCommunication";
import learningCenter from "./modules/learningCenter";
import stageGroup from "./modules/stageGroup"
import stuCondition from './modules/stuCondition';
import myStudents from "./modules/myStudents";
import learningTaskManage from './modules/learningTaskManage';
import learningStatistics from './modules/learningStatistics';
import electronicContract from './modules/electronicContract';
import financial from './modules/financial';
import orderManagement from './modules/orderManagement';
import finance from './modules/finance';
import latestStatistics from './modules/latestStatistics';
import weekStatistics from './modules/weekStatistics';
import communicationPlans from './modules/communicationPlans';
import classStuManagement from './modules/classStuManagement';
import courseStudents from './modules/courseStudents/courseStudents';
import userManagementBase from './modules/userManagementBase';
import infoManage from './modules/infoManage';
import roleManagement from './modules/roleManagement';
import messagepush from './modules/messagepush';
import refundManagement from './modules/refundManagement';

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    app,
    keycloak,
    liveku,
    feeReceipts,
    feeManage,
    student,
    courseCenter, // 课程中心
    stageOf, //学习过程管理-->阶段群
    learningCenter, //学习中心
    recordOfCommunication, //沟通记录
    myStudents, //学习过程管理-->我的学员
    stageGroup, //阶段群
    stuCondition, //学习详情
    financial, //财务管理(开通课程、补录订单)
    orderManagement, //订单管理,
    finance, //财务管理
    learningTaskManage, // 学习任务管理
    electronicContract, //电子合同
    learningStatistics, // 学习过程管理（数据）
    latestStatistics, //学习过程管理-->最新统计数据
    weekStatistics, //学习过程管理-->周统计数据
    communicationPlans, //学习过程管理-->沟通计划
    classStuManagement, //课程学员管理
    courseStudents,
    userManagementBase, //用户管理
    infoManage, //咨讯管理
    roleManagement, //咨讯管理
    messagepush, //消息推送
    refundManagement //退费管理
  }
})
