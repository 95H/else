<template>
  <Card>
    <Row :gutter="16" class="baseOption" style="margin-bottom:20px;">
      <Col span="6">
        <Select placeholder="请选择学科" v-model="searchParams.menuIds" filterable multiple clearable @on-change="subjecChange">
          <Option :title="item.menuName" v-for="item in subjectList" :value="item.menuId" :key="item.menuId">{{ item.menuName }}</Option>
        </Select>
      </Col>
      <Col span="6">
        <Select placeholder="请选择课程" v-model="searchParams.courseIds" filterable clearable multiple>
          <Option :title="item.courseName" v-for="(item,index) in coursesList" :value="item.id" :key="index">{{ item.courseName }}</Option>
        </Select>
      </Col>
      <Col span="6">
        <Select placeholder="工作年限" v-model="searchParams.jobYears" filterable clearable>
          <Option :title="item" v-for="(item,index) in jobYearsList" :value="index" :key="index">{{ item }}</Option>
        </Select>
      </Col>
      <Col span="6">
        <Select placeholder="注册来源" v-model="searchParams.origin" filterable clearable>
          <Option :title="item" v-for="(item,index) in registerResourcesList" :value="index" :key="index">{{ item }}</Option>
        </Select>
      </Col>
    </Row>
    <Row :gutter="16" class="baseOption" style="margin-bottom:20px;">
      <Col span="6">
        <Input placeholder="用户账号/用户名/用户UID" v-model="searchParams.loginName" clearable/>
      </Col>
      <Col span="6">
        <Select placeholder="购买次数" v-model="searchParams.purchaseCount" filterable clearable>
          <Option :value="0">0</Option>
          <Option :value="1">1</Option>
          <Option :value="2">大于1</Option>
        </Select>
      </Col>
      <Col span="6">
        <Select placeholder="消费金额" v-model="searchParams.actualPay" filterable clearable>
          <Option :value="0">0元</Option>
          <Option :value="1">1-200元</Option>
          <Option :value="2">201-500元</Option>
          <Option :value="3">大于500元</Option>
        </Select>
      </Col>
      <Col span="6">
        <Select placeholder="地域" v-model="searchParams.regionId" filterable clearable>
          <Option :title="item.name" v-for="(item,index) in provincesList" :value="item.id" :key="index">{{ item.name }}</Option>
        </Select>
      </Col>
      <!-- <Col span="6">
        <Select placeholder="登录次数" v-model="searchParams.visitSum" filterable clearable>
          <Option :value="0">1次</Option>
          <Option :value="1">2-10次</Option>
          <Option :value="2">大于10次</Option>
        </Select>
      </Col> -->
    </Row>
    <Row :gutter="16" class="baseOption float-div" style="margin-bottom:20px;">
      <Col span="6">
        <DatePicker @on-change="regTimeChange" type="daterange" placeholder="注册时间" v-model="regTime" style="width:100%"></DatePicker>
      </Col>
      <!-- <Col span="6">
        <DatePicker @on-change="landTimeChange" type="daterange" placeholder="登录时间" v-model="landTime" style="width:100%"></DatePicker>
      </Col> -->
      <Col span="6">
        <span @click="serchInfo"><Button type="primary" icon="ios-search">搜索</Button></span>
        <span @click="clearInfo"><Button >清除</Button></span>
      </Col>
    </Row>
    <Row id="table-student-management">
      <Col span="24">
        <Table border :height="baseHeight" :loading="loading" :columns="columns" :data="list"></Table>
      </Col>
      <Col class="margin-top-20" span="24">
        <Page placement="top" :current="pageInfo.pageNumber" :page-size-opts="arrPage" show-total show-elevator show-sizer style="text-align: right;" :total="pageInfo.total" @on-change="changeCurrentPage" @on-page-size-change="changeSelect"></Page>
      </Col>
    </Row>
    <associatedTeacherLog ref="associatedTeacherLog" v-bind:onAassociateChange="onAassociateChange" />
  </Card>
</template>

<script>
  import api from '@/api/index'
  import util from '@/util/util'
  import { mapActions, mapState, mapMutations,mapGetters } from 'vuex'
  import associatedTeacherLog from './associated-teacher-log'
  export default {
    name: "student-management",
    components:{
      associatedTeacherLog
    },
    data(){
      const hasxuejika = this.hasSomeApiAccess('users_students_cards')
      const hasguanlian = this.hasSomeApiAccess('users_students_managers')

      return {
        regTime:null,//注册时间
        landTime:null,//登陆时间
        subjectList:[],
        coursesList:[],
        arrPage:[10,20,30,40,100,200],
        baseHeight:0,//高度
        loading:false,
        //搜索
        searchParams: {
          menuIds:null,//学科
          courseIds:null, //课程
          jobYears:null, //工作年限
          origin:null,   //注册来源
          loginName:null,//用户账号、用户名、uid
          purchaseCount:null,//购买次数
          actualPay:null,//消费金额
          visitSum:null,//登录次数
          regionId:null,//地域
          registerTimeStart:null,//注册开始时间
          registerTimeEnd:null,//注册结束时间
          lastLoginTimeStart:null,//登录开始时间
          lastLoginTimeEnd:null//登录结束时间
        },
        list:[],//列表数据
        // 分页信息
        pageInfo: {
          // 当前页码
          pageNumber: 1,
          // 数据总条数
          total: 0,
          // 每页条数
          pageSize: 10
        },
        columns: [
          {
            title: "序号",
            type: "",
            align: "center",
            width: 60,
            render: (h, params) => {
              return h(
                'span',
                params.index + (this.pageInfo.pageNumber - 1) * this.pageInfo.pageSize + 1
              )
            }
          },
          {
            title: "用户名",
            key: "name",
            minWidth: 120,
            ellipsis: true,
            render: (h, params) => {
              return h(
                'span',
                {
                  domProps: {
                    title: params.row.name
                  }
                },
                params.row.name?params.row.name:'--'
              )
            }
          },
          {
            title: "用户账号",
            key: "loginName",
            minWidth: 120,
            ellipsis: true,
            render: (h, params) => {
              return h(
                'span',
                {
                  domProps: {
                    title: params.row.loginName
                  }
                },
                params.row.loginName?params.row.loginName:'--'
              )
            }
          },
          {
            title: "用户UID",
            key: "itcastUuid",
            align: "right",
            width: 100,
            ellipsis: true,
            render: (h, params) => {
              return h(
                'span',
                {
                  domProps: {
                    title: params.row.itcastUuid
                  }
                },
                params.row.itcastUuid?params.row.itcastUuid:'--'
              )
            }
          },
          {
            title: "购买次数",
            key: "purchaseCount",
            align: "right",
            width: 100
          },
          {
            title: "工作年限",
            key: "jobYears",
            align: "right",
            width: 90,
            render: (h, params) => {
              let years=this.jobYearsList;
              let year;
              if( params.row.jobYears!==1){
                params.row.jobYears?year= years[params.row.jobYears]:year="--"
              }else{
                year="--"
              }
              return h(
                'span',
                year
              )
            }
          },
          {
            title: "消费金额（元）",
            key: "actualPay",
            align: "right",
            width: 130,
            render: (h, params) => {
              return h(
                'span',
                params.row.actualPay?params.row.actualPay:'--'
              )
            }
          },
          {
            title: "地域",
            key: "region",
            width: 100,
            render: (h, params) => {
              return h(
                'span',
                params.row.region?params.row.region:'--'
              )
            }
          },
          {
            title: "注册来源",
            key: "origin",
            width: 100,
            ellipsis: true,
            render: (h, params) => {
              let str;
              if (params.row.origin != null) {
                if (params.row.origin == "dual") {
                  str="双元";
                }
                if (params.row.origin == "bxg") {
                  str="院校";
                }
                if (params.row.origin == "recruit") {
                  str="招聘";
                }
                if (params.row.origin == "online" || params.row.origin == "ONLINE") {
                  str="在线-官网";
                }
                if (params.row.origin == "app") {
                  str="在线-APP";
                }
                if (params.row.origin == "mobile_web") {
                  str="在线-H5";
                }
                if (params.row.origin == "orderInput") {
                  str="在线-补录";
                }
              } else {
                str="__";
              }
              return h(
                'span',
                {
                  domProps: {
                    title: str
                  }
                },
                str
              )
            }
          },
          {
            title: "注册时间",
            key: "createTime",
            align: "right",
            width: 140,
            render: (h, params) => {
              return h(
                'span',
                params.row.createTime?params.row.createTime:'--'
              )
            }
          },
          // {
          //   title: "登录次数",
          //   key: "visitSum",
          //   align: "right",
          //   width: 100
          // },
          // {
          //   title: "停留时长",
          //   key: "stayTime",
          //   align: "right",
          //   width: 100,
          //   render: (h, params) => {
          //     return h(
          //       'span',
          //       params.row.stayTime+"s"
          //     )
          //   }
          // },
          // {
          //   title: "最后登录时间",
          //   key: "lastLoginDate",
          //   align: "right",
          //   width: 140,
          //   render: (h, params) => {
          //     return h(
          //       'span',
          //       params.row.lastLoginDate?params.row.lastLoginDate:'--'
          //     )
          //   }
          // },
          {
            title: "操作",
            key: "action",
            align: "center",
            fixed: 'right',
            width: 220,
            render: (h, params) => {
              let xuejikaBtn = null
              let guanlianBtn = null

              if (hasxuejika) {
                xuejikaBtn = h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.studentInfo(params.row);
                    }
                  }
                }, '学籍卡信息')
              }

              if (hasguanlian) {
                guanlianBtn = h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$refs.associatedTeacherLog.modal1=true;
                      this.$refs.associatedTeacherLog.getTeacherData({
                        studentId: params.row.id,
                        adminUserId: params.row.adminUserId
                      });
                    }
                  }
                }, '关联后台用户')
              }

              return h('div', [
                xuejikaBtn,
                guanlianBtn
              ])
            }
          }
        ]
      }
    },
    created(){
      // 获取学科
      this.fetchSubjects();
      //获取工作年限
      this.getJobYears();
      //获取注册来源列表
      this.getRegisterResources();
      //所有省份
      this.getProvinces();
      //获取table数据
      this.fetchPhases();
    },
    computed: {
      ...mapState({
        //工作年限
        jobYearsList: state => state.userManagementBase.jobYearsList,
        //获取注册来源列表
        registerResourcesList: state => state.userManagementBase.registerResourcesList,
        //所有省份
        provincesList: state => state.userManagementBase.provincesList,
      })
    },
    methods:{
      ...mapActions([
        //工作年限
        "getJobYears",
        //获取注册来源列表
        "getRegisterResources",
        //所有省份
        "getProvinces"
      ]),
      // 绑定后台用户数据变更时刷新列表，获取最新的用户数据
      onAassociateChange() {
        this.fetchPhases();
      },
      //学科改变拿到课程
      async subjecChange(str){
        var obj={subjectIds:str.toString()};
        //获取课程
        var data=await api.getCoursesList(obj);
        if(data.status==200){
          this.coursesList=data.result;
        }else{
          this.$Message.error("获取课程失败");
        }
      },
      //注册时间
      regTimeChange($event){
        let time=this.regTime=$event;
        this.searchParams.registerTimeStart=time[0];
        this.searchParams.registerTimeEnd=time[1];
      },
      //登陆时间
      landTimeChange($event){
        let time=this.landTime=$event;
        this.searchParams.lastLoginTimeStart=time[0];
        this.searchParams.lastLoginTimeEnd=time[1];
      },
      //公共查询
      fetchPhases() {
        let obj=JSON.parse(JSON.stringify(this.searchParams));
        if(obj.menuIds){
          obj.menuIds=obj.menuIds.toString();
        }
        if(obj.courseIds){
          obj.courseIds=obj.courseIds.toString()
        }
        this.loading = true;
        return api.getStudentList({...this.pageInfo,...obj})
          .then(data => {
            if (data.status === 200) {
              this.list=data.result.list;
              this.pageInfo.total=data.result.total;
            }
          })
          .catch(err => {
            this.$Message.error(err.message);
          })
          .finally(() => {
            this.loading = false
          })
      },
      //清除
      clearInfo(){
        this.searchParams={
          menuIds:null,//学科
          courseIds:null, //课程
          jobYears:null, //工作年限
          origin:null,   //注册来源
          loginName:null,//用户账号、用户名、uid
          purchaseCount:null,//购买次数
          actualPay:null,//消费金额
          visitSum:null,//登录次数
          regionId:null,//地域
          registerTimeStart:null,//注册开始时间
          registerTimeEnd:null,//注册结束时间
          lastLoginTimeStart:null,//登录开始时间
          lastLoginTimeEnd:null//登录结束时间
        };
        this.pageInfo.pageNumber=1;
        this.regTime=["",""];
        this.landTime=["",""];
        this.fetchPhases();
      },
      //获取学科
      async fetchSubjects(){
        let data=await api.getSubjectsList();
        if(data.status==200){
          this.subjectList=data.result;
        }else{
          this.$Message.error("获取学科失败");
        }
      },
      //搜索
      serchInfo(){
        this.pageInfo.pageNumber=1;
        this.fetchPhases();
      },
      //分页改变当前页
      changeCurrentPage(page) {
        this.pageInfo.pageNumber = page;
        this.fetchPhases()
      },
      changeSelect(nub){
        this.pageInfo.pageSize = nub;
        this.fetchPhases()
      },
      //跳转学籍卡详情
      studentInfo(data) {
        this.$router.push({
          name: 'student_info',
          query: {
            uuid: data.itcastUuid,
            userId: data.id,
            from: 'student-management'
          }
        })
      }
    },
    mounted(){
      //获取table-height
      this.$nextTick(()=>{
        let dom=document.getElementById("table-student-management");
        this.baseHeight=util.baseHeight(dom,82);
      })
    }
  }
</script>

<style scoped>
  .float-div .ivu-col{
    float:left;
  }
</style>
