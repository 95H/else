// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/common.css'
import App from './App'
import echarts from 'echarts'
import 'es6-promise/auto'
import vuex from 'vuex'
import Qs from 'qs'
import CommonModel from '@/components/common'
import { showFullScreenLoading, tryHideFullScreenLoading } from '@/components/axiosInitHelper'
import vuescroll from 'vuescroll'
import 'vuescroll/dist/vuescroll.css'

Vue.prototype.$echarts = echarts
Vue.use(ElementUI)
Vue.use(vuex)
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(CommonModel) //
/*
	判断输入内容的长度
	val : 输入的内容
	len : 数据库限定的长度
	callback : 需要做的操作
*/
Vue.prototype.strLength = function(val, len, callback) {
  if (val.length > len) {
    this.$messageError(`输入的内容超过${len}个字`)
  } else {
    typeof callback === 'function' ? callback() : callback
  }
}

// 滚动条美化
Vue.use(vuescroll, {
  // 在这里设置全局默认配置
  ops: {
    bar: {
      background: '#cecece',
      onlyShowBarOnScroll: false,
      opacity: 0.5
    },
    scrollPanel: {
      scrollingX: false
    }
  }
})

Vue.prototype.showFullScreenLoading = showFullScreenLoading
Vue.prototype.tryHideFullScreenLoading = tryHideFullScreenLoading
const store = new vuex.Store({
  //store对象
  state: {
    //第一层侧面弹框的值
    showCommon: false,
    commonTitle: '',
    commonBtn: '',
    extraBtn: '',
    componentsType: '',
    cprWidth: false,
    isScroll: true,
    defaultBtnGroup: true,
    cprRightHg: '' /**侧边栏内容高度 */,
    //第二层侧面弹框的值
    showCommonOther: false,
    commonTitleOther: '',
    commonBtnOther: '',
    extraBtnOther: '',
    cprWidthOther: false,
    componentsTypeOther: '',
    groupId: '',
    status: '',
    //year:this.$getCookie("year") || new Date().getFullYear()*1,
    fieldinvestigationObj: {},
    //projectId:this.$getCookie("projectId") || '',
    dataObj: {},
    projectInfo: {},
    refresh: function() {},
    tabsTest: function() {},
    rejunction: function() {},
    handleNodeClick: function() {},
    sealNodeClick: function() {},
    refreshT: true,
    refreshQ: true,
    ifRevoke: '',
    isShowAudit: '',
    isYyzxzr: '',
    isYyzxzy: '',
    isCreatePerson: '',
    isReviewEdit: '',
    isEdit: '',
    //立项必填项
    projectRuls: '',
    independentRuls: [],
    planRuls: '',
    personRuls: [],
    travelRuls: [],
    projectStatus: '',
    //立项编辑保存的值
    setupProjectJson: '',
    otherProjectJson: '',
    otherCompanyJson: '',
    payerJson: '',
    contractDocJson: '',
    subProjectJson: '',
    projectSelfJson: [],
    selfSurveyDocsJson: [],
    projectPlanJson: '',
    milestonePlanJson: '',
    memberBudgetJson: '',
    travelBudgetJson: '',
    localBudgetJson: '',
    requiredProjectPlan: '',
    isEditorPerson: '',
    // investorId : window.localStorage.getItem("investorId") || "1",
    investorId: '',
    investorName: '',
    readonly: false, // 用于判断当前项目是否可修改
    moduleChildId: '',
    isOnlineBtn: '',
    agreeReviewFlag: true, //收起时点击审核通过改变
    menuTableData: [], //菜单管理页表格数据
    refreshTableData: function() {}, //更新菜单管理页表格数据
    addDdialogFlag: false,
    fullPageThis: {},
    showPageInfo: function() {}, //导入文件后更新资产占有方信息
    saveContent: null, //退出评估报告评估说明编辑
    fieldID: [],
    projectNumber: '',
    dataSource: [],
    dataSourceList: [],
    taskWorkType: '',
    jobTypeTab: '', //评估作业任务tab切换
    getCheckKeyData: '', //送审投资单位ID串
    getCheckedObjArr: [], //送审投资单位ID数组
    auditLogging: '', //送审方法
    showInfo: false, //外审页面显示共审人还是详情
    showaddAudit: false, //外审页面显示共审人还是详情
    showAuditTitle: false, //外审页面显示标题
    auditTree: true, //刷新左侧树
    auditData: true, //刷新外审数据
    isUserShow: false, //判断是否显示添加共审人
    addAuditBtn: false,
    companyId: '', //市场法公司id
    fileFlag: '',
    tableExist: true,
    listDataShow: false,
    controlBtn: '', //控制外审详情，撤回等按钮
    procInstId: '', //procInstId
    chrId: '', // chrId
    taskId: '',
    processStateId: '',
    setupAuditStatus: '',
    maxName: 0, //最大化和最小化的表控制
    isNumber: '',
    isfixedFlag: false,
    showSubmit: true, //当是报告号分配者时显示按钮
    //clickCconfirmBtn: true//点击资产基础法的条件查询的确定时改变
    kcseleName: '', //资产基础法14类别
    hierarchy: '', //资产基础法箭头层级的控制
    onlineOffline: '', //内部审核判断线上线下未送审
    changeOnlineOffline: '', //外部审核判断线上线下未送审
    oElemHg: '', //最大化最小化的高度
    isIssue: '', //报告是否签发
    isSavingFlag: false, // 资产基础法表格数据正在保存或修改标识
    commafyNumber(nums, digits) {
      if (isNaN(nums) || nums == '') return nums
      var digit = Number(nums).toFixed(digits || 2)
      // return digit.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
      return digit.replace(/(\d{1,3})(?=(\d{3})+(?:\.))/g, '$1,') //修改4位小数
    },
    rememberSearchCondition: false, //保留项目查询条件
    showCollectFlag: false, // 展示收藏模板的按钮
    switchIcon: false, // 切换收藏图标
    /**更新数据 (os:可参照资产基础法编写,滚动的div采用transform)
     * scrollTop:向上滚动的高度
     * itemHeight:tr单个的高度
     * mainId:需要滚动的id
     */
    renewVisibleData(scrollTop, itemHeight, mainId) {
      var itemHeight = Number(itemHeight)
      var scrollTop = scrollTop || 0
      var visibleCount = Math.ceil($('#' + mainId).height() / itemHeight) // 取得可见区域的可见列表项数量
      var start = Math.floor(scrollTop / itemHeight) // 取得可见区域的起始数据索引
      var end = start + visibleCount // 取得可见区域的结束数据索引
      return { start: start, end: end }
    },
    reloadIncomeTable: 0, //收益法倒入重载
    incomeInitId: '', //收益法模板id
    incomeTemplateName: '', //收益法模板信息
    monomerReport: true, //单体报表
    cashFlowCalculation: {}, // 现金流计算
    caseTxt: '只看案列', //资产基础法(默认按钮显示)
    caseTabFlag: true, //案列切换是否需要提示
    caseTabItem: 'costLaw', //案列默认展示的区域
    assetBasedSheetName: '', //当前科目
    allCaseEnable: [], //所有启用的案列
    resultDataUpdateRow: {}, // 案例中修改的当前行
    rememberSearchCondition: false, //保留项目查询条件
    setCalculateShow() {}, //计算和查看说明的显示
    setChaKanShuoMingShow() {}, //查看说明
    setDisplayFormula() {}, //公式显示
    calculateBtn() {}, //结果页面计算
    sheetStatus: '' //审核状态
  },
  mutations: {
    reloadIncomeTableFun(state) {
      state.reloadIncomeTable++
    },
    setMaxName(state) {
      state.maxName++
    },
    changeShowCommon(state) {
      // 变更状态
      if (state.showCommon == true) {
        state.cprWidth = false
        state.defaultBtnGroup = true
      }
      state.showCommon = !state.showCommon
      if (!state.showCommon) {
        state.commonTitle = ''
        state.commonBtn = ''
        state.extraBtn = ''
        state.componentsType = ''
        state.dataObj = {}
        state.thisTab = '0'
        state.refresh = function() {}
        state.rejunction = function() {}
        app.$el.style.overflow = ''
        state.isScroll = true
      } else {
        app.$el.style.overflow = 'hidden'
      }
    },
    changeShowCommonOther(state) {
      // 变更状态
      if (state.showCommonOther == true) {
        state.cprWidthOther = false
      }
      state.showCommonOther = !state.showCommonOther
      if (!state.showCommonOther) {
        state.commonTitleOther = ''
        state.commonBtnOther = ''
        state.extraBtnOther = ''
        state.componentsTypeOther = ''
        state.fieldinvestigationObj = {}
        if (!state.showCommon) {
          app.$el.style.overflow = ''
        }
      } else {
        app.$el.style.overflow = 'hidden'
      }
    },
    handleNodeClick(state, res) {
      state.handleNodeClick(res)
    },
    sealNodeClick(state, res) {
      state.sealNodeClick(res)
    },
    leftMenuClick(state, res) {
      state.leftMenuClick(res)
    },
    getMenuTable(state, { tableData }) {
      state.menuTableData = tableData
    },
    getMenuZltable(state, { refreshWay }) {
      state.refreshTableData = refreshWay
    },
    addDialogFlag(state) {
      state.addDdialogFlag = true
    },
    updateDialogFlag(state) {
      state.addDdialogFlag = false
    },
    transmitFullPageThis(state, { fullPageThis }) {
      state.fullPageThis = fullPageThis
    },
    getPossessioBonorumFunction(state, { showPageInfo }) {
      state.showPageInfo = showPageInfo
    }
  },
  actions: {
    handleNodeClick({ commit }, obj) {
      commit('handleNodeClick', obj)
    },
    sealNodeClick({ commit }, obj) {
      commit('sealNodeClick', obj)
    },
    leftMenuClick({ commit }, obj) {
      commit('leftMenuClick', obj)
    },
    getMenuTable({ commit }, tableData) {
      commit('getMenuTable', {
        tableData
      })
    },
    getMenuZltable({ commit }, refreshWay) {
      commit('getMenuZltable', {
        refreshWay
      })
    },
    addDialogFlag({ commit }) {
      commit('addDialogFlag')
    },
    updateDialogFlag({ commit }) {
      commit('updateDialogFlag')
    },
    transmitFullPageThis({ commit }, fullPageThis) {
      commit('transmitFullPageThis', {
        fullPageThis
      })
    },
    getPossessioBonorumFunction({ commit }, showPageInfo) {
      commit('getPossessioBonorumFunction', {
        showPageInfo
      })
    }
  }
})
//乘法
Vue.prototype.$accMul = (arg1, arg2) => {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {}
  try {
    m += s2.split('.')[1].length
  } catch (e) {}
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m)
}
//除法
Vue.prototype.$accDiv = (arg1, arg2) => {
  var t1 = 0,
    t2 = 0,
    r1,
    r2
  try {
    t1 = arg1.toString().split('.')[1].length
  } catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length
  } catch (e) {}
  r1 = Number(arg1.toString().replace('.', ''))
  r2 = Number(arg2.toString().replace('.', ''))
  return Vue.prototype.$accMul(r1 / r2, Math.pow(10, t2 - t1))
}
//加法
Vue.prototype.$accAdd = (arg1, arg2) => {
  var r1, r2, m
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}
//减法
Vue.prototype.$Subtr = (arg1, arg2) => {
  var r1, r2, m, n
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  n = r1 >= r2 ? r1 : r2
  return ((arg1 * m - arg2 * m) / m).toFixed(n)
}
Vue.prototype.$messageError = name => {
  ElementUI.Message.error({
    showClose: true,
    message: typeof name == 'string' ? name : '报错啦'
  })
  console.log(name)
}
Vue.prototype.$messageSuccess = name => {
  ElementUI.Message.success({
    showClose: true,
    message: name
  })
}
Vue.prototype.$messageWarning = name => {
  ElementUI.Message.warning({
    showClose: true,
    message: name
  })
}
Vue.prototype.$messageInfo = name => {
  ElementUI.Message.info({
    showClose: true,
    message: name
  })
}
Vue.prototype.$filename = name => {
  name = name
    .replace(/\%/g, '%25')
    .replace(/\#/g, '%23')
    .replace(/\+/g, '%2B')
    .replace(/\"/g, '%22')
    .replace(/\'/g, '%27')
    .replace(/\&/g, '%26')
    .replace(/\=/g, '%3D')
  return name
}
Vue.prototype.$filterSuffix = name => {
  if (name) {
    name = name.slice(((name.lastIndexOf('.') - 1) >>> 0) + 2)
    switch (name) {
      case 'xls':
      case 'xlsx':
        return 'iconexcel'
        break
      case 'doc':
      case 'docx':
        return 'iconword'
        break
      case 'pdf':
        return 'iconpdf'
        break
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
        return false
        break
      default:
        return 'iconunknownfile'
    }
  }
}
//cookie操作
Vue.prototype.$setCookie = (name, value, m) => {
  var d = new Date()
  d.setTime(d.getTime() + m * 1000)
  // d.setTime(d.getTime())
  // console.log(Date.parse(d))
  window.document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString()
}
Vue.prototype.$getCookie = name => {
  var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
  return v ? v[2] : null
}
Vue.prototype.$delCookie = name => {
  Vue.prototype.$setCookie(name, '', -1)
}
Vue.prototype.$delAllCookie = () => {
  var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
  if (keys) {
    for (var i = keys.length; i--; ) {
      Vue.prototype.$setCookie(keys[i], '', -1)
    }
  }
}

let app = new Vue({
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  created() {
    if (/static\/start\/index.html#\/user\/login/g.test(window.location.href)) {
      window.location.href = window.location.href.replace(/static\/start\/index.html#\/user\/login/g, '#/login')
    } else {
      // var _this = this;
      this.axiosHandle()
      this.watchRouter()
      // 判断菜单是否存在，不存在则请求接口，否则使用本地全局变量【顶级菜单】
      if (!this.$store.state.queryUserSysFunction && !/#\/(login)?$/g.test(window.location.href)) {
        this.$http
          .post('/api/queryUserSysFunction')
          .then(res => {
            this.$store.state.queryUserSysFunction = res.data
            // 【项目菜单】
            this.$http
              .post('/api/sysfunction/functionChildList', {
                id: (function() {
                  for (let i in res.data) {
                    if (res.data[i].jump == '/project') {
                      return res.data[i].id
                    }
                  }
                })()
              })
              .then(res => {
                this.$store.state.projectMenu = res.data
                this.commonDataHandle(() => {
                  this.$mount('#app')
                })
              })
              .catch(err => {
                this.$messageError(err)
              })
          })
          .catch(error => {
            this.$messageError(error)
          })
      } else {
        this.commonDataHandle(() => {
          this.$mount('#app')
        })
      }
      ;(this.$store.state.year = this.$getCookie('year') || new Date().getFullYear() * 1),
        (this.$store.state.projectId = this.$getCookie('projectId') || '')
    }
  },
  methods: {
    //处理axios
    axiosHandle: function() {
      var _this = this,
        loading
      //添加请求拦截器
      this.$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
      this.$http.interceptors.request.use(
        function(config) {
          if (config.data && config.data.showLoading == false) {
          } else if (config.data && config.data.bgColor) {
            _this.$store.state.isSavingFlag = true
            _this.showFullScreenLoading(config.data.bgColor)
          } else {
            _this.showFullScreenLoading()
          }
          //在发送请求之前做某事
          if (config.method === 'get') {
            config.headers.get['token'] = _this.$getCookie('token')
          }
          if (_this.$getCookie('token')) {
            config.headers.post['token'] = _this.$getCookie('token')
          }
          if (config.method === 'post') {
            config.data = Qs.stringify(config.data)
          }
          /*if(!(config.url=="/api/reportEvalDirectory/generationReport" || config.url=="/api/reportDescDirectory/generationExplain")){
					loading = _this.$loading({
						lock: true,
						fullscreen: true,
						background: 'rgba(0, 0, 0, 0.2)'
					});
				}*/
          return config
        },
        function(error) {
          //请求错误时做些事
          return Promise.reject(error)
        }
      )
      //添加响应拦截器
      this.$http.interceptors.response.use(
        function(response) {
          //对响应数据做些事
          if (response.config.data && Qs.parse(response.config.data).showLoading == 'false') {
          } else {
            _this.tryHideFullScreenLoading()
          }
          if (response.data.code == 4011 || response.data.code == 5011 || response.data.code == 6011) {
            if (_this.$store.state.showCommon) {
              _this.$store.state.showCommon = false
            }
            if (_this.$store.state.showCommonOther) {
              _this.$store.state.showCommonOther = false
            }
            _this.$router.push({
              path: '/login'
            })
            setTimeout(function() {
              _this.$delAllCookie()
              sessionStorage.clear()
              window.location.reload()
            }, 500)
            if (response.data.code == 4011) {
              return Promise.reject('登陆超时，请重新登陆！')
            } else {
              return Promise.reject(response.data.msg)
            }
          } else if (response.data.code != 200) {
            return Promise.reject(response.data.msg)
          }
          return response.data
        },
        function(error) {
          _this.tryHideFullScreenLoading()
          if (error.config && error.config.url == '/api/assetownerinformation/completeAssetsPossession') return
          //if(loading){loading.close();}
          return Promise.reject('数据异常')
        }
      )
    },
    commonDataHandle: function(callback) {
      var _this = this
      if (/#\/(login)?$/g.test(window.location.href)) {
        callback()
        return
      }
      this.$http
        .post('/api/projects/findXmSx')
        .then(function(data) {
          if (data.code == 200) {
            var common = {}
            for (const key in data.data) {
              common[key] = {}
              var item = data.data[key]
              for (var i = 0; i < item.length; i++) {
                common[key][item[i].id] = item[i].name
              }
            }
            window.commonOriginalData = data.data
            window.commonData = common
            callback()
          }
        })
        .catch(function(error) {
          _this.$messageError(error)
        })
    },
    watchRouter() {
      this.$router.beforeEach((to, from, next) => {
        if (from.name == 'assessment' && this.$store.state.saveContent) {
          this.$store.state.saveContent()
          this.$store.state.saveContent = null
        }
        if (to.path == '/' || to.path == '/login') {
          this.$delAllCookie()
          next()
        } else {
          next()
        }
      })
    }
  }
})
