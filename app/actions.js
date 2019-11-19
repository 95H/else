import * as Types from './mutation-type'
import axios from 'axios'
import request from '../request'

/**
 * Created by wangyin on 18/8/3.
 */


//获取餐厅
export const getRestaurant = ({commit}, param) => { //获取餐厅
  return request(commit).post('/report/selectToResturantentity', param)
    .then((results) => {
      results.data.data.unshift({ avgmoney: null,
        avgmoney_description: null,
        beforehand: null,
        beforehand_description: null,
        checktype: null,
        discount: null,
        discountprint: null,
        groupcode: null,
        handwork: null,
        handwork_description: null,
        handworkprint: null,
        handworkprint_descripton: null,
        initialize: null,
        insertdate: null,
        insertuser: null,
        insertusername: null,
        kitchenpart: null,
        kitchenwhole: null,
        moneyway: null,
        moneyway_method: null,
        nightauditor: null,
        nighttype: null,
        payticket: null,
        payticket_description: null,
        pmscode: null,
        pmscode_description: null,
        popup: null,
        printend: null,
        printexpected: null,
        receiptca: null,
        receiptcb: null,
        receiptcc: null,
        receiptcd: null,
        receiptce: null,
        receiptea: null,
        receipteb: null,
        receiptec: null,
        receipted: null,
        receiptee: null,
        receipttype: null,
        receipttype_description: null,
        regioncode: null,
        resortcode: null,
        resturantcode: "All",
        resturantdescription: null,
        resturantname: "全部餐厅",
        resturantnamee: null,
        rowid: null,
        statecodes: null,
        updatedate: null,
        updateuser: null,
        updateusername: null,}); //追加一个全部餐厅，code为All
      return commit(Types.GET_RESTAURANT, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    })
};

//获取菜品大类
export const getDishesBigClass = ({commit}, param) => {
  return request(commit).post('/report/selectBigTypeMessage', param)
    .then((results) => {
      return commit(Types.GET_DISHESBIGCLASS, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    })
};

//获取菜品小类
export const getDishesSmallClass = ({commit}, param) => {
  return request(commit).post('/report/selectMinTypeMessage', param)
    .then((results) => {
      return commit(Types.GET_DISHESSMALLCLASS, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    })
};



export const getBillingStatementsTable = ({commit}, param) => { //获取餐饮账单明细报表
  return request(commit).post('/report/selectToMarketSublist', param)
    .then((results) => {
      return commit(Types.GET_BILLINGSTATEMENTS, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    })
};



//获取菜品项目销售汇总表查询数据
export const getSalesSummaryTable = ({commit}, param) => { //获取餐饮账单明细报表
  return request(commit).post('/report/selectDishesMarket', param)
    .then((results) => {
      return commit(Types.GET_SALESSUMMARYTABLE, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    })
};



//获取单点登陆的酒店
// export const getHotel= ({commit}, param) => { //获取餐饮账单明细报表
//   return request(commit).post('http://122.112.214.22:8887/appCommon/getResortName', param)
//     .then((results) => {
//       return commit(Types.GET_HOTEL, results.data);
//     })
//     .catch((error) => {
//       console.log('请求错误: ', error);
//     })
// };





export const getOpenCheckReport= ({commit}, param) => { //餐厅未结账单
  return request(commit).post('/report/selectRestruantNo', param)
    .then((results) => {
      return commit(Types.GET_OPENCHECKREPORT, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    })
};



export const getClosedChecksEmployeeList = ({commit}, param) => { //员工已结账单
  return request(commit).post('/report/selectEmployeeByCode', param)
    .then((results) => {
      return commit(Types.GET_CLOSEDCHECKSEMPLOYEELIST, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    })
};

 export const getOnlinePaymentSummary = ({commit}, param) => { //交易摘要
  return request(commit).post('/report/selectTransactionSummary', param)
    .then((results) => {
      return commit(Types.GET_ONLINEPAYMENTSUMMARY, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    })
};



export const getSummaryTotal = ({commit}, param) => { //结账交易明细表
  return request(commit).post('/report/selectToAccountDetails', param)
    .then((results) => {
      return commit(Types.GET_SUMMARYTOTAL, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    })
};


export const getEmpClosedChecks = ({commit}, param) => { //员工已结账单表明细
  return request(commit).post('/report/selectEmployeeBySerialnumber', param)
    .then((results) => {
      return commit(Types.GET_EMPCLOSEDCHECKS, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    })
};

export const getDiscountSummmary = ({commit}, param) => { //折扣摘要
  return request(commit).post('/report/selectDiscoutnSummary', param)
    .then((results) => {
      return commit(Types.GET_DISCOUNTSUMMMARY, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    })
};


export const getEnt = ({commit}, param) => { //宴请
  return request(commit).post('/report/selectToBanquet', param)
    .then((results) => {
      return commit(Types.GET_ENT, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    })
};

export const getEmployeesFoodBack = ({commit}, param) => { //员工退菜
  return request(commit).post('/report/selectEmployeeBack', param)
    .then((results) => {
      return commit(Types.GET_EMPLOYEESFOODBACK, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    })
};



export const getRevenueCenterFinancial = ({commit}, param) => { //餐厅财务报表
  return request(commit).post('/report/selectResturantMoney', param)
    .then((results) => {
      return commit(Types.GET_REVENUECENTERFINANCIAL, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    })
};



export const getemployeesCode = ({commit}, param) => { //查询员工编号
  return request(commit).post('/report/selectEmployee', param)
    .then((results) => {
      return commit(Types.GET_EMPLOYEESL, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    })
};


export const setLoginType = ({commit}, param) => { //权限
  return commit(Types.SET_LOGIN_TYPE, param)
};

export const bigClassQuery = ({commit}, param) => { //查询菜品大类
  return request(commit).post('/report/selectBigGroup', param)
    .then((results) => {
      return commit(Types.GET_BIGCLASSQUERY, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    });
};

export const FoodCategory = ({commit}, param) => { //查询菜品类别
  return request(commit).post('/report/selectGerenatGroup', param)
    .then((results) => {
      return commit(Types.GET_FOODCATEGORY, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    });
};


export const FoodbelongstoType = ({commit}, param) => { //查询菜品所属类别
  return request(commit).post('/report/selectGroupDishes', param)
    .then((results) => {
      return commit(Types.GET_FOODBELONGSTOTYPE, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    });
};

export const EmployeesReport = ({commit}, param) => { //员工财务列表
  return request(commit).post('/report/selecteEmployeeFinace', param)
    .then((results) => {
      return commit(Types.GET_EMPLOYEESREPORT, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    });
};

export const employeesOutstandingbills = ({commit}, param) => { //员工未结账单列表
  return request(commit).post('/report/selectEmployeeNo', param)
    .then((results) => {
      return commit(Types.GET_OUTSTANDINGBILLS, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    });
};


export const OutstandingBillDetail = ({commit}, param) => { //员工未结账单明细
  return request(commit).post('/report/selectEmployeeNoCheck', param)
    .then((results) => {
      return commit(Types.GET_OUTSTANDINGBILLDETAIL, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    });
};


export const RestaurantBill = ({commit}, param) => { //餐厅未结账单
  return request(commit).post('/report/selectResturantCheck', param)
    .then((results) => {
      return commit(Types.GET_RESTAURANTBILL, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    });
};

export const highestSishesSales = ({commit}, param) => { //最高菜品销售
  return request(commit).post('/report/selectMarketDishes', param)
    .then((results) => {
      return commit(Types.GET_HIGHESTSISHESSALES, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    });
};

export const highestDrinksSales = ({commit}, param) => { //最高酒水销售
  return request(commit).post('/report/selectHighest', param)
    .then((results) => {
      return commit(Types.GET_HIGHESTDRINKSSALES, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    });
};

export const BeverageAnalysis = ({commit}, param) => { //酒水分析报表
  return request(commit).post('/report/selectEngineWine', param)
    .then((results) => {
      return commit(Types.GET_BEVERAGEANALYSIS, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    });
};


export const getOc = ({commit}, param) => { //OC报表
  return request(commit).post('/report/selectOcBanquet', param)
    .then((results) => {
      return commit(Types.GET_OC, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    });
};

export const getFinanciaLMealPeriod = ({commit}, param) => { //获取餐厅餐段财务报表的餐段
  return request(commit).post('/report/selectMeal', param)
    .then((results) => {
      return commit(Types.GET_FINANCIALMEALPERIOD, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    });
};


export const getSegmentReport = ({commit}, param) => { //获取餐厅餐段财务报表数据
  return request(commit).post('/report/selectResturantmealMoney', param)
    .then((results) => {
      return commit(Types.GET_SEGMENTREPORT, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    });
};

export const EmployeeFinancialStatements = ({commit}, param) => { //员工财务报表
  return request(commit).post('/report/selectEemployeeStatements', param)
    .then((results) => {
      return commit(Types.GET_EMPLOYEEFINANCIALSTATEMENTS, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    });
};


export const SegmentSummaryReport = ({commit}, param) => { //餐段概要报表
  return request(commit).post('/report/selectMealSection', param)
    .then((results) => {
      return commit(Types.GET_SEGMENTSUMMARYREPORT, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    });
};

export const RestaurantReturnFood = ({commit}, param) => { //餐厅退菜报表
  return request(commit).post('/report/selectResturantBack', param)
    .then((results) => {
      return commit(Types.GET_RESTAURANTRETURNFOOD, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    });
};

export const dishesBigTypeSales = ({commit}, param) => { //菜品销售大类
  return request(commit).post('/report/selectClassReport', param)
    .then((results) => {
      return commit(Types.GET_DISHESBIGTYPESALES, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    });
};

export const dishesSmallTypeSales = ({commit}, param) => { //菜品销售小类
  return request(commit).post('/report/selectSubReport', param)
    .then((results) => {
      return commit(Types.GET_DISHESSMALLTYPESALES, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    });
};


export const RestaurantTipReport = ({commit}, param) => { //餐厅小费报表
  return request(commit).post('/report/selectResturantTip', param)
    .then((results) => {
      return commit(Types.GET_TIPREPORT, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    });
};
export const getMealPeriod = ({commit}, param) => { //根据餐厅编码获取餐段
  return request(commit).post('/report/selectResturantMeal', param)
    .then((results) => {
      return commit(Types.GET_MEALPERIOD, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    });
};


export const getTablePeopleReport = ({commit}, param) => { //餐桌人数销售报表
  return request(commit).post('/report/selectTableNumber', param)
    .then((results) => {
      return commit(Types.GET_GETTABLEPEOPLEREPORT, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    });
};
// // 传递变量
// export const setQuantity = ({commit}, param) => {
//   return commit(Types.SET_QUANTITY, param)
// }
export const getTransactionDetailDetails = ({commit}, param) => { //员工未结账单明细
  return request(commit).post('/report/selectReceiptnumber', param)
    .then((results) => {
      return commit(Types.GET_TRANSACTIONDETAILDETAILS, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    });
};
export const selectResturantBill = ({commit}, param) => { //餐饮账单明细表
  return request(commit).post('/report/selectResturantBill', param)
    .then((results) => {
      return commit(Types.GET_SELECTRESTURANTBILL, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    });
};

export const getPMSlog = ({commit}, param) => { //传PMS日志
  return request(commit).post('/report/selectTranspmslog', param)
    .then((results) => {
      return commit(Types.GET_PMSLOG, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    });
};

export const getOperationLog = ({commit}, param) => { //后台操作日志
  return request(commit).post('/report/selectSystemlog', param)
    .then((results) => {
      return commit(Types.GET_OPERATIONLOG, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    });
};


export const getBreakfastLog = ({commit}, param) => { //早餐消费日志报表
  return request(commit).post('/report/selectBreakfastlog', param)
    .then((results) => {
      return commit(Types.GET_GETBREAKFASTLOG, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    });
};

export const getTableConsumptionData = ({commit}, param) => { //早餐消费日志报表
  return request(commit).post('/report/selectDeskMessage', param)
    .then((results) => {
      return commit(Types.GET_TABLECONSUMPTION, results.data);
    })
    .catch((error) => {
      console.log('请求错误: ', error);
    });
};
