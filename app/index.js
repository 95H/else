/**
 * Created by wangyin on 18/8/3.
 */
import * as actions from './actions';
import * as getters from './getters';
import mutations from './mutations';

const state = {
  RestaurantData:{},//餐厅数据
  DishesBigClass:{},//菜品大类
  DishesSmallClass:{}, //菜品小类
  MealPeriod:{},//获取餐段
  BillingStatements:{},//账单明细表
  SalesSummary:{},//获取菜品项目销售汇总表查询数据
  hotel:{},//当前酒店数据
  salesexportpdf:'',
  TransactionDetailData:{},//查询结账方式交易明细
  opencheckreportList:{},//餐厅未结账单表
  closedchecksemployeelist:{},//员工账单已结列表
  onlinepaymentsummary:{}, //交易摘要
  summarytotalData:{}, //结账交易明细表
  empclosedchecksData:{},//员工已结账单
  DiscountSummmaryData:{},//折扣摘要
  EntData:{},//宴请
  RevenueCenterFinancialData:{},//餐厅财务列表
  employeeslData:{},//员工编号
  loginType:true,//验证token是否失效
  bigClassQueryData:{},//查询菜品大类
  foodCategoryData:{},//查询菜品类别
  foodbelongstoTypeData:{},//查询菜品所属类别
  employeesreportData:{},//员工财务报表
  outstandingbillsData:{},//员工未结账单
  outstandingbilldetailData:{},//员工未结账单明细
  RestaurantBillData:{},//餐厅未结账单
  highestSishesSalesData:{},//最高菜品销售
  highestDrinksSalesData:{},//最高酒水销售
  BeverageAnalysisData:{},//酒水分析报表
  OcData:{},//oc报表
  getFinancialMealPeriodData:{},//餐厅餐段财务报表餐厅数据
  getSegmentReportdData:{},//餐厅餐段财务报表数据
  EmployeeFinancialStatementsData:{},//员工财务报表
  SegmentSummaryReportData:{},//餐段概要报表
  RestaurantReturnFoodData:{},//
  dishesbigtypesalesData:{},//菜品销售大类
  dishesSmallTypeSalesData:{},//菜品销售小类
  TipReportData:{},//餐厅小费报表,
  EmployeesFoodBackData:{},//员工退菜
  tablePeopleReportData:{},//员工退菜
  transactiondetaildetailsData:{},//
  selectresturantbillData:{},//餐饮帐单明细表
  pmgLogData:{},//PMS传帐日志
  operationLogData:{},//后台操作日志
  getbreakfastLogData:{},//早餐消费日志报表
  tableconsumptiondata:{},//餐桌消费报表

  // quantityData: {data: {}, code: ''}
};

export default {
  state,
  actions,
  getters,
  mutations
};
