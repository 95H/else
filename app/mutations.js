import * as Types from './mutation-type';

const mutations = {
  [Types.GET_RESTAURANT] (state,data) { //获取餐厅
    state.RestaurantData = data;
  },
  [Types.GET_DISHESBIGCLASS](state,data){ //获取菜品大类
    state.DishesBigClass = data;
  },
  [Types.GET_DISHESSMALLCLASS](state,data){ //获取菜品小类
    state.DishesSmallClass = data;
  },
  [Types.GET_MEALPERIOD](state,data){ //获取餐段
    state.MealPeriod = data;
  },
  [Types.GET_BILLINGSTATEMENTS](state,data){ //获取餐饮账单明细报表
    state.BillingStatements = data;
  },
  [Types.GET_SALESSUMMARYTABLE](state,data){ //获取餐饮账单明细报表
    state.SalesSummary = data;
  },
  [Types.GET_HOTEL](state,data){ //获取餐当前登陆酒店
    state.hotel = data;
  },
  [Types.GET_OPENCHECKREPORT](state,data){ //查询结账方式交易明细
    state.opencheckreportList = data
  },
  [Types.GET_CLOSEDCHECKSEMPLOYEELIST](state,data){ //查询结账方式交易明细
    state.closedchecksemployeelist = data
  },
  [Types.GET_ONLINEPAYMENTSUMMARY](state,data){ //查询结账方式交易明细
    state.onlinepaymentsummary = data
  },
  [Types.GET_SUMMARYTOTAL](state,data){ //结账交易明细表
    state.summarytotalData = data
  },
  [Types.GET_EMPCLOSEDCHECKS](state,data){ //员工已结账单
    state.empclosedchecksData = data;
  },
  [Types.GET_DISCOUNTSUMMMARY](state,data){ //折扣摘要
    state.DiscountSummmaryData = data;
  },
  [Types.GET_ENT](state,data){ //宴请
    state.EntData = data;
  },
  [Types.GET_REVENUECENTERFINANCIAL](state,data){ //餐厅财务报表
    state.RevenueCenterFinancialData = data
  },
  [Types.GET_EMPLOYEESL](state,data){ //员工编号
    state.employeeslData = data;
  },
  // 失败
  [Types.FINISH_LOGIN] (state) {
    state.loginType = false
  },
  // 完成后赋值
  [Types.SET_LOGIN_TYPE] (state) {
    state.loginType = true
  },
  [Types.GET_BIGCLASSQUERY](state,data){ //查询菜品大类
    state.bigClassQueryData = data;
  },
  [Types.GET_FOODCATEGORY](state,data){ //菜品类别
    state.foodCategoryData = data;
  },
  [Types.GET_FOODBELONGSTOTYPE](state,data){ //菜品所属类别
    state.foodbelongstoTypeData = data;
  },
  [Types.GET_EMPLOYEESREPORT](state,data){ //菜品财务列表
    state.employeesreportData = data;
  },
  [Types.GET_OUTSTANDINGBILLS](state,data){ //员工未结账单列表
    state.outstandingbillsData = data;
  },
  [Types.GET_OUTSTANDINGBILLDETAIL](state,data){ //员工未结账单明细
    state.outstandingbilldetailData = data;
  },
  [Types.GET_RESTAURANTBILL](state,data){ //员工未结账单明细
    state.RestaurantBillData = data;
  },
  [Types.GET_HIGHESTSISHESSALES](state,data){ //最高菜品销售
    state.highestSishesSalesData = data;
  },
  [Types.GET_HIGHESTDRINKSSALES](state,data){ //最高酒水销售
    state.highestDrinksSalesData = data;
  },
  [Types.GET_BEVERAGEANALYSIS](state,data){
    state.BeverageAnalysisData = data;
  },
  [Types.GET_OC](state,data){ //oc报表
    state.OcData = data;
  },
  [Types.GET_FINANCIALMEALPERIOD](state,data){ //最高酒水销售
    state.getFinancialMealPeriodData = data;
  },
  [Types.GET_SEGMENTREPORT](state,data){ //最高酒水销售
    state.getSegmentReportdData = data;
  },
  [Types.GET_EMPLOYEEFINANCIALSTATEMENTS](state,data){ //员工财务报表
    state.EmployeeFinancialStatementsData = data;
  },
  [Types.GET_SEGMENTSUMMARYREPORT](state,data){ //餐段概要报表
    state.SegmentSummaryReportData = data;
  },
  [Types.GET_RESTAURANTRETURNFOOD](state,data){ //餐厅退菜报表
    state.RestaurantReturnFoodData = data;
  },
  [Types.GET_DISHESBIGTYPESALES](state,data){ //餐厅退菜报表
    state.dishesbigtypesalesData = data;
  },
  [Types.GET_DISHESSMALLTYPESALES](state,data){ //餐厅退菜报表
    state.dishesSmallTypeSalesData = data;
  },
  [Types.GET_TIPREPORT](state,data){ //餐厅小费报表
    state.TipReportData = data;
  },
  [Types.GET_EMPLOYEESFOODBACK](state,data){ //餐厅小费报表
    state.EmployeesFoodBackData = data;
  },
  [Types.GET_GETTABLEPEOPLEREPORT](state,data){ //餐厅小费报表
    state.tablePeopleReportData = data;
  },
  [Types.GET_TRANSACTIONDETAILDETAILS](state,data){ //餐厅小费报表
    state.transactiondetaildetailsData = data;
  },
  [Types.GET_SELECTRESTURANTBILL](state,data){ //餐饮账单明细表
    state.selectresturantbillData = data;
  },
  [Types.GET_PMSLOG](state,data){ //餐饮账单明细表
    state.pmgLogData = data;
  },
  [Types.GET_OPERATIONLOG](state,data){ //后台操作日志
    state.operationLogData = data;
  },
  [Types.GET_GETBREAKFASTLOG](state,data){ //早餐消费日志报表
    state.getbreakfastLogData = data;
  },
  [Types.GET_TABLECONSUMPTION](state,data){ //餐桌消费报表
    state.tableconsumptiondata = data;
  },


  // [Types.SET_QUANTITY](state,data){ //查询时间
  //   state.quantityData = data;
  // },GET_OPERATIONLOG


}
export default mutations;
