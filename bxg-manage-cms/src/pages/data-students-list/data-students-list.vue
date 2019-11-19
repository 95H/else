<template>
  <Card class="students-wrap">
    <Row :gutter="10" class="baseOption" style="margin-bottom:16px;">
      <Col span="6">
        <Select placeholder="请选择课程" v-model="searchParams.courseId" filterable clearable>
          <Option :title="item.gradeName" v-for="(item,index) in coursesList" :value="item.id" :key="index">{{ item.gradeName }}</Option>
        </Select>
      </Col>
      <Col span="6">
        <Select placeholder="学籍状态" v-model="searchParams.censusStatus" filterable clearable>
          <Option v-for="(item,index) in selectCensus" :value="item.value" :key="index">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col span="6">
        <Select placeholder="是否失联" v-model="searchParams.contactState" filterable clearable>
          <Option v-for="(item,index) in selectContac" :value="item.value" :key="index">{{ item.label }}</Option>
        </Select>
      </Col>
       <Col span="6">
        <Select placeholder="学习效果风险评估" v-model="searchParams.riskEffectStatus" filterable clearable>
          <Option v-for="(item,index) in SelectRiskEffect" :value="item.value" :key="index">{{ item.label }}</Option>
        </Select>
      </Col>
    </Row>
    <Row :gutter="10" class="baseOption" style="margin-bottom:16px;">
      <Col span="6">
        <Select placeholder="学习状态风险评估" v-model="searchParams.riskStudyStatus" filterable clearable>
          <Option v-for="(item,index) in SelectRiskStudy" :value="item.value" :key="index">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col span="6">
        <Input placeholder="请输入姓名/UID/登录账号" v-model="searchParams.userSearch" clearable/>
      </Col>
      <Col span="6">
        <DatePicker @on-change="startNextDate" type="daterange" placeholder="导师下次沟通时间" v-model="start_time" style="width:100%"></DatePicker>
      </Col>
    </Row>
    <Row :gutter="10" class="baseOption" style="margin-bottom:16px;">
      <Col span="6">
        <DatePicker @on-change="endNextDate" type="daterange" placeholder="班主任下次沟通时间" v-model="end_time" style="width:100%"></DatePicker>
      </Col>
      <Col span="6">
        <span @click="serchInfo"><Button type="primary" icon="ios-search">搜索</Button></span>
        <span @click="clearInfo" style="margin-left:6px;"><Button >清除</Button></span>
      </Col>
    </Row>
    <Row id="table-student-list">
      <Col span="24">
        <Table border :height="baseHeight" :loading="students_loading" :columns="myStudentsTit" :data="myStudentsList"></Table>
      </Col>
      <Col class="m-t20" span="24">
        <Page style="text-align: right; padding-bottom: 1px"
              :total="pageList.total"
              :current="pageParams.pageNumber"
              :page-size="pageParams.pageSize"
              :page-size-opts="arrPage"
              @on-change="changeCurrent"
              @on-page-size-change="changePageSize"
              :transfer="true"
              show-total show-elevator show-sizer>
        </Page>
      </Col>
    </Row>
    <PopupTable
      :total="total1"
      :current="pageNumber1"
      :pageSize="pageSize1"
      :isShowPopupTable='isShowPopupTable'
      :moduleCoData="moduleCoData"
      :moduleDaData="moduleDaData"
      :module_title="module_title"
      :model_op_one="model_op_one"
      :model_op_two="model_op_two"
      :model_name_one="model_name_one"
      :model_name_two="model_name_two"
      :model_list_one="model_list_one"
      :model_list_two="model_list_two"
      @moduleCloseClick="closeModuleClick"
      @moduleSearchClick="searchModuleClick"
      @moduleSelectChange="moduleSelectChange"
      @moduleSelectChangeTwo="moduleSelectChangeTwo"
      @moduleClearClick="moduleClearClick"
      @modulePageChangeClick="modulePageChangeClick"
      @modulePageSizeChangeClick="modulePageSizeChangeClick"
    />
    <PopupTable
      :total="total2"
      :current="pageNumber2"
      :pageSize="pageSize2"
      :isShowPopupTable='isShowPopupTable2'
      :moduleCoData="moduleCoData2"
      :moduleDaData="moduleDaData2"
      :module_title="module_title2"
      :model_op_one="model_op_one2"
      :model_op_two="model_op_two2"
      :model_name_one="model_name_one2"
      :model_name_two="model_name_two2"
      :model_list_one="model_list_one2"
      :model_list_two="model_list_two2"
      @moduleCloseClick="closeModuleClick2"
      @moduleSearchClick="searchModuleClick2"
      @moduleSelectChange="moduleSelectChange2"
      @moduleSelectChangeTwo="moduleSelectChangeTwo2"
      @moduleClearClick="moduleClearClick2"
      @modulePageChangeClick="modulePageChangeClick2"
      @modulePageSizeChangeClick="modulePageSizeChangeClick2"
    />
    <PopupTable
      :total="total3"
      :current="pageNumber3"
      :pageSize="pageSize3"
      :isShowPopupTable='isShowPopupTable3'
      :moduleCoData="moduleCoData3"
      :moduleDaData="moduleDaData3"
      :module_title="module_title3"
      :model_op_one="model_op_one3"
      :model_op_two="model_op_two3"
      :model_name_one="model_name_one3"
      :model_name_two="model_name_two3"
      :model_list_one="model_list_one3"
      :model_list_two="model_list_two3"
      @moduleCloseClick="closeModuleClick3"
      @moduleSearchClick="searchModuleClick3"
      @moduleSelectChange="moduleSelectChange3"
      @moduleSelectChangeTwo="moduleSelectChangeTwo3"
      @moduleClearClick="moduleClearClick3"
      @modulePageChangeClick="modulePageChangeClick3"
      @modulePageSizeChangeClick="modulePageSizeChangeClick3"
    />
  </Card>
</template>

<script>
  import api from '@/api/index'
  import util from '@/util/util'
  import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
  import PopupTable from '@/components/popup-table/popup-table'
  export default {
    props: {
      type: Number
    },
    components: {
      PopupTable
    },
    data() {
      let self = this

      let from = this.$route.query.from
      let hasrenwuguanli
      let hasxiangqing
      let hasxuejika
      
      // if (from == 'learning-manage-stat_stage-of') {
      hasrenwuguanli = this.hasSomeApiAccess('teaching_students_process_data_groups_students_tasks')
      hasxiangqing = this.hasSomeApiAccess('teaching_students_process_data_groups_students_details')
      hasxuejika = this.hasSomeApiAccess('teaching_students_process_data_groups_students_cards')
      // } 

      return {
        from: from,
        arrPage:[10,20,30,40,100,200],
        baseHeight:0,//table高度
        typeList:0,//0学员列表标识1阶段群进去的
        students_loading: true,
        //弹窗1
        pageSize1: 10,
        pageNumber1: 1,
        total1: 0,
        isShowPopupTable: false,
        moduleCoData: [
          {
            title: '序号',
            key: 'Num',
            render: (h, params) => {
              return h(
                'span',
                params.index +
                1 +
                this.pageSize1 * (this.pageNumber1 - 1)
              )
            }
          },
          {
            title: '模块名称',
            key: 'Module_name'
          },
          {
            title: '模块进度（已完成/节总量）',
            key: 'Module_plan',
            render: (h, params) => {
              return h('div', [
                h(
                  'div',
                  {
                    style: {
                      color: '#2d8cf0',
                      cursor: 'pointer'
                    },
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.modulePlanClick(params.row)
                      }
                    }
                  },
                  params.row.Module_plan
                )
              ])
            }
          },
          {
            title: '模块状态',
            key: 'Module_status'
          }
        ],
        moduleDaData: [],
        module_title: '整体进度-志刚',
        model_op_one: '',
        model_op_two: '',
        model_name_one: '课程模块：',
        model_name_two: '模块状态：',
        model_list_one: [],
        model_list_two: [
          {
            value: -1,
            label: '未开始'
          },
          {
            value: 0,
            label: '进行中'
          },
          {
            value: 1,
            label: '已完成'
          }
        ],
        //弹窗2
        pageNumber2: 1,
        pageSize2: 10,
        total2: 0,
        isShowPopupTable2: false,
        moduleCoData2: [
          {
            title: '序号',
            key: 'Num',
            render: (h, params) => {
              return h(
                'span',
                params.index +
                1 +
                this.pageSize2 * (this.pageNumber2 - 1)
              )
            }
          },
          {
            title: '节名称',
            key: 'Knob_name'
          },
          {
            title: '视频进度（已完成/视频总量）',
            key: 'Video_plan',
            render: (h, params) => {
              return h('div', [
                h(
                  'div',
                  {
                    style: {
                      color: '#2d8cf0',
                      cursor: 'pointer'
                    },
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.videoPlanClick(params.row)
                      }
                    }
                  },
                  params.row.Video_plan
                )
              ])
            }
          },
          {
            title: '小节测试（正确率）',
            key: 'Knob_test'
          },
          {
            title: '节状态',
            key: 'Knob_status'
          }
        ],
        moduleDaData2: [],
        module_title2: '模块进度-1-JavaScript基础语法-志刚',
        model_op_one2: '',
        model_op_two2: '',
        model_name_one2: '节名称：',
        model_name_two2: '节状态：',
        model_list_one2: [],
        model_list_two2: [
          {
            value: -1,
            label: '未开始'
          },
          {
            value: 0,
            label: '进行中'
          },
          {
            value: 1,
            label: '已完成'
          }
        ],
        //弹窗3
        total3: 0,
        pageSize3: 10,
        pageNumber3: 1,
        isShowPopupTable3: false,
        moduleCoData3: [
          {
            title: '知识点名称',
            key: 'knowledge_name'
          },
          {
            title: '视频状态',
            key: 'video_status'
          },
          {
            title: '视频总时长',
            key: 'video_total_time'
          },
          {
            title: '最新观看日期',
            key: 'new_watch_date'
          },
          {
            title: '观看总时长',
            key: 'watch_total_time'
          },
          {
            title: '播放设备',
            key: 'play_facility'
          },
          {
            title: '播放次数',
            key: 'play_num'
          }
        ],
        moduleDaData3: [],
        module_title3: '拓展资料·模块进度-1-JavaScript基础语法-志刚',
        model_op_one3: '',
        model_op_two3: '',
        model_name_one3: '节名称：',
        model_name_two3: '节状态：',
        model_list_one3: [],
        model_list_two3: [
          {
            value: -1,
            label: '未开始'
          },
          {
            value: 1,
            label: '进行中'
          },
          {
            value: 2,
            label: '已完成'
          }
        ],
        //=======================================================
        start_time: '',
        end_time: '',
        searchParams: {
          // groupId: '',          //阶段群
          courseId:'',          //所在课程
          censusStatus: '',     //学籍状态
          contactState: '',     //是否失联
          riskEffectStatus: '', //学习效果风险
          riskStudyStatus: '',  //学习状态风险
          userSearch: '',       //姓名/UID/登录账号
          tutorTeacherNextContactTime: '', //导师下次沟通时间
          headTeacherNextContactTime: '',   //班主任下次沟通时间
          menuId:'',                        //学科id
        },
        pageParams: {
          pageNumber: 1,
          pageSize: 10
        },
        userId: '',
        courseId: '',
        moduleId: '',
        sectionId: '',
        realName: '',
        currentVideoPosition: '',
        selectCensus: [
          {
            id: '0',
            value: -1,
            label: '休学'
          },
          {
            id: '1',
            value: 1,
            label: '在读'
          },
          {
            id: '2',
            value: 8,
            label: '退费'
          }
        ],
        selectContac: [
          {
            value: '0',
            label: '是'
          },
          {
            value: '1',
            label: '否'
          }
        ],
        SelectRiskEffect: [
          {
            value: 0,
            label: '正常'
          },
          {
            value: 1,
            label: '预警'
          },
          {
            value: 2,
            label: '问题'
          }
        ],
        SelectRiskStudy: [
          {
            value: 0,
            label: '正常'
          },
          {
            value: 1,
            label: '预警'
          },
          {
            value: 2,
            label: '问题'
          }
        ],
        //日期
        formItem: {},
        //表格title
        myStudentsTit: [
          {
            title: '序号',
            key: 'Num',
            align: 'center',
            width: 60,
            render: (h, params) => {
              return h(
                'span',
                params.index +
                1 +
                this.pageParams.pageSize * (this.pageParams.pageNumber - 1)
              )
            }
          },
          {
            title: 'UID',
            key: 'itcastUUID',
            align:"right",
            width: 80,
            ellipsis: true,
            render: (h, params) => {
              return h(
                'span',
                {
                  domProps: {
                    title: params.row.itcastUUID
                  }
                },
                params.row.itcastUUID?params.row.itcastUUID:'--'
              )
            }
          },
          {
            title: '姓名',
            key: 'realName',
            width: 90,
            ellipsis: true,
            render: (h, params) => {
              return h(
                'span',
                {
                  domProps: {
                    title: params.row.realName
                  }
                },
                params.row.realName?params.row.realName:'--'
              )
            }
          },
          {
            title: '所在课程',
            key: 'courseName',
            minWidth: 150,
            ellipsis: true,
            render: (h, params) => {
              return h(
                'span',
                {
                  domProps: {
                    title: params.row.courseName
                  }
                },
                params.row.courseName?params.row.courseName:'--'
              )
            }
          },
          {
            title: '阶段群名称',
            key: 'groupName',
            minWidth: 120,
            ellipsis: true,
            render: (h, params) => {
              return h(
                'span',
                {
                  domProps: {
                    title: params.row.groupName
                  }
                },
                params.row.groupName?params.row.groupName:'--'
              )
            }
          },
          {
            title: '剩余服务天数',
            key: 'remainServiceDays',
            align:"right",
            width: 120
          },
          {
            title: '在本群天数',
            key: 'stayGroupDays',
            align:"right",
            width: 100
          },
          {
            title: '学籍状态',
            key: 'censusStatus',
            width: 100
          },
          {
            title: '是否失联',
            key: 'contactState',
            width: 100
          },
          {
            title: '学习效果风险评估',
            key: 'riskEffectStatus',
            width: 140
          },
          {
            title: '学习状态风险评估',
            key: 'riskStudyStatus',
            width: 140
          },
          {
            title: '目前任务',
            key: 'currentTask',
            width: 100,
            ellipsis: true,
            render: (h, params) => {
              return h(
                'span',
                {
                  domProps: {
                    title: params.row.currentTask
                  }
                },
                params.row.currentTask?params.row.currentTask:'--'
              )
            }
          },
          {
            title: '当前视频学习位置',
            key: 'currentVideoPosition',
            width: 320,
            render(h, params) {
              let div = 'div'
              let Button = 'Button'
              const modulePlanClick = _.partial(
                self.modulePlanClick,
                params.row
              )
              return (
                <div>
                {params.row.currentVideoPosition}
              {params.row.moduleId && <Button class="see-details" type="primary" {...{ on: { click: modulePlanClick } }}>{params.row.currentHomeworkName?'':'查看'}</Button>}
              </div>
              )
            }
          },
          {
            title: '整体进度',
            key: 'wholeProcess',
            width: 130,
            render(h, params) {
              let div = 'div'
              let Button = 'Button'
              const initStateShow = _.partial(
                self.initStateShow,
                params.row
              )
              return (
                <div>
                {params.row.wholeProcess}
            <Button class="see-details" type="primary" {...{ on: { click: initStateShow } }}>查看</Button>
              </div>
            )
            }
          },
          {
            title: '最后一次导师沟通',
            key: 'tutorLastContactTime',
            width: 150,
            align:"right",
            render(h, params) {
              let span = 'span'
              return <span>{params.row.tutorLastContactTime || '-'}</span>
            }
          },
          {
            title: '导师下次沟通时间',
            key: 'tutorTeacherNextContactTime',
            width: 150,
            align:"right",
            render(h, params) {
              let span = 'span'
              return <span>{params.row.tutorTeacherNextContactTime || '-'}</span>
            }
          },
          {
            title: '最后一次班主任沟通',
            key: 'headTeacherLastContactTime',
            width: 150,
            align:"right",
            render(h, params) {
              let span = 'span'
              return <span>{params.row.headTeacherLastContactTime || '-'}</span>
            }
          },
          {
            title: '班主任下次沟通时间',
            key: 'headTeacherNextContactTime',
            width: 150,
            align:"right",
            render(h, params) {
              let span = 'span'
              return <span>{params.row.headTeacherNextContactTime || '-'}</span>
            }
          },
          {
            title: '操作',
            key: 'action',
            UUID: 'itcastUUID',
            userId: 'userId',
            courseId: 'courseId',
            stuCourseId: 'stuCourseId',
            align:"center",
            menuId: 'menuId',
            fixed: 'right',
            width: 350,
            render(h, params) {
              let div = 'div'
              let Button = 'Button'
              const studentInfo = _.partial(
                self.studentInfo,
                params.row.itcastUUID,
                params.row.userId,
              )
              const stuinfoDetail = _.partial(
                self.stuinfoDetail,
                params.row.courseId,
                params.row.userId,
                params.row.stuCourseId
              )
              const communicationMentor = _.partial(
                self.communicationMentor,
                params.row.courseId,
                params.row.userId,
                params.row.menuId
              )
              const learningTasks = _.partial(
                self.learningTasks,
                params.row.roleType,
                params.row.courseId,
                params.row.userId,
                params.row.stuCourseId,
                params.row.menuId
              )
              return (
                <div>
                  {hasrenwuguanli && <Button class="bg-b" type="text" {...{ on: { click: learningTasks } }}>学习任务管理</Button>}
                  {hasxiangqing && <Button class="bg-b" type="text" {...{ on: { click: stuinfoDetail } }}>学习详情</Button>}
                  {hasxuejika && <Button class="bg-b" type="text" {...{ on: { click: studentInfo } }}>学籍卡信息</Button>}
                </div>
              )
            }
          }
        ]
      }
    },
    created(){
      //获取数据
      this.getStudentListData();
    },
    computed: {
      ...mapState({
        pageList: state => state.myStudents.pageData,
        myStudentsList: state => state.myStudents.myStudentsData,
        groupList : state=>state.myStudents.groupsData,
        coursesList: state => state.student.coursesList,
        //弹窗数据
        expandPlan: state => state.myStudents.processesAll,
        videoSchedule: state => state.stuCondition.videoSchedule,
        moduleSchedule: state => state.stuCondition.moduleSchedule
      })
    },
    methods: {
      ...mapActions([
        'postMyStudents',
        'getProcesses',
        'fetchVideoSchedule',
        'fetchModuleSchedule',
        'getGroups'
      ]),
      ...mapActions({
        getCoursesList: "student/getCoursesList"
      }),
      getStudentListData(){
        this.getGroups({
          dataTab:"DATA"
        })
        this.getCoursesList();
        this.fecthMyStudents()
      },
      startNextDate(date) {
        //this.start_time = date.toString();
        this.searchParams.tutorTeacherNextContactTime = date.toString();
        /*if(this.type == 1){
          this.searchParams.tutorTeacherNextContactTime = date+','+this.end_time
        }else{
          this.searchParams.headTeacherNextContactTime = date+','+this.end_time
        }*/
      },
      endNextDate(date) {
        //this.end_time = date.toString();
        this.searchParams.headTeacherNextContactTime = date.toString();
        /*if(this.type == 1){
          this.searchParams.tutorTeacherNextContactTime = date.toString();
        }else{
          this.searchParams.headTeacherNextContactTime = this.start_time+','+date
        }*/
      },
      //获取我的学员列表
      async fecthMyStudents(data) {
        this.students_loading=true;
        if(data) {
          // this.searchParams.groupId=data.groupId;
          // this.searchParams.menuId=data.menuId;
          this.typeList = 1;
        } else {
          data = {}
        }
        let page_params = JSON.parse(sessionStorage.getItem(`page_obj${this.type}`));
        let pageN = page_params ? page_params.pageN : null
        let pageS = page_params ? page_params.pageS : null
        /*this.pageParams.pageNumber = pageN || 1
        this.pageParams.pageSize = pageS || 10*/
        this.pageParams.pageNumber =1;
        this.pageParams.pageSize = 10;
        await this.postMyStudents({
          /*pageNumber: pageN || this.pageParams.pageNumber,
          pageSize: pageS || this.pageParams.pageSize,*/
          pageNumber:this.pageParams.pageNumber,
          pageSize:this.pageParams.pageSize,
          typeList: this.typeList,
          dataTab:"DATA",
          groupId: this.$route.query.groupId,
          ...data,
          ...this.searchParams,
        })
        this.students_loading=false;
        /*this.students_loading = this.$store.state.myStudents.myStudentsData ? false : true*/
      },
      //根据条件查询列表
      async serchInfo() {
        this.students_loading=true;
        this.pageParams.pageNumber = 1
        let obj = Object.assign(
          {
            pageNumber: 1,
            pageSize: this.pageParams.pageSize,
            dataTab:"DATA",
            typeList: this.typeList,
            groupId: this.$route.query.groupId
          },
          this.searchParams
        );
        await this.postMyStudents(obj);
        this.students_loading=false;
      },
      //我的学员列表清除查询条件
      async clearInfo() {
        this.students_loading=true;
        this.typeList=0;
        this.pageParams.pageNumber = 1
        this.searchParams = {
          // groupId: '',           //阶段群
          censusStatus: '',      //学籍状态
          contactState: '',      //是否失联
          riskEffectStatus: '',  //学习效果风险
          riskStudyStatus: '',   //学习状态风险
          userSearch: '',        //姓名/UID/登录账号
          tutorTeacherNextContactTime: '', //导师下册沟通记录
          headTeacherNextContactTime: '',  //班主任下册沟通记录
          menuId:"",                       //学科id
        }
        await this.postMyStudents({
          pageNumber: 1,
          pageSize: this.pageParams.pageSize,
          typeList: this.typeList,
          dataTab:"DATA",
          groupId: this.$route.query.groupId
        })
        this.students_loading=false;
      },
      //翻页
      async changeCurrent(num) {
        this.students_loading=true;
        this.pageParams.pageNumber = num
        let pageObj={
          pageN:this.pageParams.pageNumber,
          pageS:this.pageParams.pageSize
        }
        sessionStorage.setItem(`page_obj${this.type}`, JSON.stringify(pageObj));
        let obj = Object.assign({
          pageNumber: this.pageParams.pageNumber,
          pageSize: this.pageParams.pageSize,
          /*type: this.type,*/
          dataTab:"DATA",
          typeList: this.typeList,
          groupId: this.$route.query.groupId
        },this.searchParams)
        await this.postMyStudents(obj)
        this.students_loading=false;
      },
      //改变每页条数
      async changePageSize(size) {
        this.students_loading=true;
        this.pageParams.pageSize = size
        let pageObj={
          pageN:this.pageParams.pageNumber,
          pageS:this.pageParams.pageSize
        }
        sessionStorage.setItem(`page_obj${this.type}`, JSON.stringify(pageObj));
        let obj = Object.assign({
          pageNumber: this.pageParams.pageNumber,
          pageSize: this.pageParams.pageSize,
          /*type: this.type,*/
          dataTab:"DATA",
          typeList: this.typeList,
          groupId: this.$route.query.groupId
        },this.searchParams)
        await this.postMyStudents(obj)
        this.students_loading=false;
      },
      /**
       * 弹窗====================================================
       */
      async initStateShow(row) {
        this.isShowPopupTable = true
        this.userId = row.userId
        this.courseId = row.courseId
        this.moduleId = row.moduleId
        this.realName = row.realName
        this.pageNumber1 = 1
        this.pageSize1 = 10
        this.currentVideoPosition = row.currentVideoPosition.split('>')[0]
        this.module_title = '整体进度' + '-' + row.realName
        await this.getProcesses({
          userId: row.userId,
          courseId: row.courseId,
          pageNumber: 1,
          pageSize: 10
        })
        let expandResult = this.$store.state.myStudents.processesAll
        this.total1 = expandResult.total
        try {
          this._dPlanState(expandResult.list, true)
        } catch (error) {
          console.log(error)
        }
      },
      _dPlanState(expandResult, isFirst) {
        let arr = []
        let arr2 = []
        expandResult.forEach(e => {
          let newData = {}
          let opData = {}
          if (e.moduleStatus == -1) {
            e.moduleStatus = '未开始'
          } else if (e.moduleStatus == 0) {
            e.moduleStatus = '进行中'
          } else if (e.moduleStatus == 1) {
            e.moduleStatus = '已完成'
          }
          Object.assign(opData, {
            value: e.moduleId,
            label: e.moduleName
          })
          Object.assign(newData, {
            id: e.moduleId,
            Module_name: e.moduleName,
            Module_plan: e.moduleProgress,
            Module_status: e.moduleStatus
          })
          arr.push(newData)
          arr2.push(opData)
        })
        this.moduleDaData = arr
        this.model_list_one = arr2
      },
      // 清除更新列表1
      async moduleClearClick() {
        this.pageNumber1 = 1,
          await this.getProcesses({
            userId: this.userId,
            courseId: this.courseId,
            pageNumber: 1,
            pageSize: this.pageSize1
          })
        let expandResult = this.$store.state.myStudents.processesAll
        this.total1 = expandResult.total
        try {
          this._dPlanState(expandResult.list, true)
        } catch (error) {
          console.log(error)
        }
      },
      //模块弹窗（2）
      async modulePlanClick(row) {
        this.isShowPopupTable2 = true
        let moduleName2 = row.currentModuleName ? row.currentModuleName : row.Module_name
        this.realName = row.realName ? row.realName : this.realName
        this.module_title2 = '模块进度' + '-' + moduleName2 + '-' + this.realName
        this.userId = row.userId || this.userId
        this.courseId = row.courseId || this.courseId
        this.moduleId = row.moduleId || row.id || this.moduleId
        this.pageNumber2 = 1
        this.pageSize2 = 10
        await this.fetchModuleSchedule({
          userId: this.userId,
          courseId: this.courseId,
          moduleId: this.moduleId,
          pageNumber: 1,
          pageSize: 10
        })
        let moduleResult = this.$store.state.stuCondition.moduleSchedule
        this.total2 = moduleResult.total
        try {
          this._moduleStateD(moduleResult.list, true)
        } catch (error) {
          console.log(error)
        }
      },
      _moduleStateD(moduleResult, isFirst) {
        let arr = []
        let arr1 = []
        moduleResult.forEach(e => {
          let newData = {}
          let moduleData = {}
          if (e.sectionStatus === -1) {
            e.sectionStatus = '未开始'
          } else if (e.sectionStatus === 0) {
            e.sectionStatus = '进行中'
          } else if (e.sectionStatus === 1) {
            e.sectionStatus = '已完成'
          }
          Object.assign(moduleData, {
            value: e.id,
            label: e.sectionName
          })
          Object.assign(newData, {
            id: e.id,
            Knob_name: e.sectionName,
            Video_plan: e.videoProcess,
            Knob_test: e.accuracy,
            Knob_status: e.sectionStatus
          })
          arr.push(newData)
          arr1.push(moduleData)
        })
        this.moduleDaData2 = arr
        this.model_list_one2 = arr1
      },
      //清除2
      async moduleClearClick2() {
        this.pageNumber2 = 1
        await this.fetchModuleSchedule({
          userId: this.userId,
          courseId: this.courseId,
          moduleId: this.moduleId,
          pageNumber: 1,
          pageSize: this.pageSize2
        })
        let moduleResult = this.$store.state.stuCondition.moduleSchedule
        this.total2 = moduleResult.total
        try {
          this._moduleStateD(moduleResult.list, true)
        } catch (error) {
          console.log(error)
        }
      },
      //视频弹窗（3）
      async videoPlanClick(row) {
        this.isShowPopupTable3 = true
        this.module_title3 = '视频进度' + '-' + row.Knob_name + '-' + this.realName
        this.sectionId = row.id
        this.pageNumber3 = 1
        this.pageSize3 = 10
        await this.fetchVideoSchedule({
          userId: this.userId,
          courseId: this.courseId,
          sectionId: row.id,
          pageNumber: 1,
          pageSize: 10
        })
        let videoResult = this.$store.state.stuCondition.videoSchedule
        this.total3 = videoResult.total
        try {
          this._videoPlanDis(videoResult.list, true)
        } catch (error) {
          console.log(error)
        }
      },
      //清除3
      async moduleClearClick3() {
        this.pageNumber3 = 1
        await this.fetchVideoSchedule({
          userId: this.userId,
          courseId: this.courseId,
          sectionId: this.sectionId,
          pageNumber: 1,
          pageSize: this.pageSize3
        })
        let videoResult = this.$store.state.stuCondition.videoSchedule
        this.total3 = videoResult.total
        try {
          this._videoPlanDis(videoResult.list, true)
        } catch (error) {
          console.log(error)
        }
      },
      //封装视频进度
      _videoPlanDis(videoPlanList, isFirst) {
        let arr = []
        let arr1 = []
        videoPlanList.forEach(e => {
          let newDate = {}
          let videoData = {}
          if (e.videoStatus === -1) {
            e.videoStatus = '未开始'
          } else if (e.videoStatus === 1) {
            e.videoStatus = '进行中'
          } else if (e.videoStatus === 2) {
            e.videoStatus = '已完成'
          }
          Object.assign(videoData, {
            value: e.id,
            label: e.pointName
          })
          Object.assign(newDate, {
            id: e.id,
            knowledge_name: e.pointName,
            video_status: e.videoStatus,
            video_total_time: e.totalSize,
            new_watch_date: e.watchTime,
            watch_total_time: e.watchSize,
            play_facility: e.watchDevice,
            play_num: e.watchCount
          })
          arr.push(newDate)
          arr1.push(videoData)
        })
        this.moduleDaData3 = arr
        this.model_list_one3 = arr1
      },
      //弹窗内方法======================================================
      async modulePageChangeClick(page) {
        //弹窗pageNum更改
        this.pageNumber1 = page
        await this.getProcesses({
          userId: this.userId,
          courseId: this.courseId,
          moduleId: this.model_op_one,
          moduleStatus: this.model_op_two,
          pageNumber: page,
          pageSize: this.pageSize1
        })
        let expandResult = this.$store.state.myStudents.processesAll
        this.total1 = expandResult.total
        try {
          this._dPlanState(expandResult.list, true)
        } catch (error) {
          console.log(error)
        }
      },
      async modulePageSizeChangeClick(page) {
        //弹窗pageSize更改
        this.pageSize1 = page
        await this.getProcesses({
          userId: this.userId,
          courseId: this.courseId,
          moduleId: this.model_op_one,
          moduleStatus: this.model_op_two,
          pageNumber: this.pageNumber1,
          pageSize: page,
        })
        let expandResult = this.$store.state.myStudents.processesAll
        this.total1 = expandResult.total
        try {
          this._dPlanState(expandResult.list, true)
        } catch (error) {
          console.log(error)
        }
      },
      closeModuleClick() {
        this.isShowPopupTable = false
      },
      moduleSelectChange(data) {
        this.model_op_one = data
      },
      moduleSelectChangeTwo(data) {
        this.model_op_two = data
      },
      async searchModuleClick() {
        this.pageNumber1 = 1
        await this.getProcesses({
          userId: this.userId,
          courseId: this.courseId,
          moduleId: this.model_op_one,
          moduleStatus: this.model_op_two,
          pageNumber: 1,
          pageSize: this.pageSize1
        })
        let expandResult = this.$store.state.myStudents.processesAll
        this.total1 = expandResult.total
        try {
          this._dPlanState(expandResult.list, true)
        } catch (error) {
          console.log(error)
        }
      },
      //弹窗2
      async modulePageChangeClick2(page) {
        //弹窗pageNum更改
        this.pageNumber2 = page
        await this.fetchModuleSchedule({
          courseId: this.courseId,
          moduleId: this.moduleId,
          userId: this.userId,
          pageNumber: page,
          pageSize: this.pageSize2,
          sectionIds: this.model_op_one2,
          sectionStatus: this.model_op_two2
        })
        let moduleResult = this.$store.state.stuCondition.moduleSchedule
        this.total2 = moduleResult.total
        try {
          this._moduleStateD(moduleResult.list, true)
        } catch (error) {
          console.log(error)
        }
      },
      async modulePageSizeChangeClick2(page) {
        //弹窗pageSize更改
        this.pageSize2 = page
        await this.fetchModuleSchedule({
          courseId: this.courseId,
          moduleId: this.moduleId,
          userId: this.userId,
          pageNumber: 1,
          pageSize: page,
          sectionIds: this.model_op_one2,
          sectionStatus: this.model_op_two2
        })
        let moduleResult = this.$store.state.stuCondition.moduleSchedule
        this.total2 = moduleResult.total
        try {
          this._moduleStateD(moduleResult.list, true)
        } catch (error) {
          console.log(error)
        }
      },
      closeModuleClick2() {
        this.isShowPopupTable2 = false
      },
      moduleSelectChange2(data) {
        this.model_op_one2 = data
      },
      moduleSelectChangeTwo2(data) {
        this.model_op_two2 = data
      },
      async searchModuleClick2() {
        this.pageNumber2 = 1
        await this.fetchModuleSchedule({
          courseId: this.courseId,
          moduleId: this.moduleId,
          userId: this.userId,
          pageNumber: 0,
          pageSize: this.pageSize2,
          sectionIds: this.model_op_one2,
          sectionStatus: this.model_op_two2
        })
        let moduleResult = this.$store.state.stuCondition.moduleSchedule
        this.total2 = moduleResult.total
        try {
          this._moduleStateD(moduleResult.list, true)
        } catch (error) {
          console.log(error)
        }
      },
      //弹窗3
      async modulePageChangeClick3(page) {
        //弹窗pageNum更改
        this.pageNumber3 = page
        await this.fetchVideoSchedule({
          courseId: this.courseId,
          sectionId: this.sectionId,
          pointIds: this.model_op_one3,
          userId: this.userId,
          pageNumber: page,
          pageSize: this.pageSize3,
          videoStatus: this.model_op_two3
        })
        let videoResult = this.$store.state.stuCondition.videoSchedule
        this.total3 = videoResult.total
        try {
          this._videoPlanDis(videoResult.list, true)
        } catch (error) {
          console.log(error)
        }
      },
      async modulePageSizeChangeClick3(page) {
        //弹窗pageSize更改
        this.pageSize3 = page
        await this.fetchVideoSchedule({
          courseId: this.courseId,
          sectionId: this.sectionId,
          pointIds: this.model_op_one3,
          userId: this.userId,
          pageNumber: 1,
          pageSize: page,
          videoStatus: this.model_op_two3
        })
        let videoResult = this.$store.state.stuCondition.videoSchedule
        this.total3 = videoResult.total
        try {
          this._videoPlanDis(videoResult.list, true)
        } catch (error) {
          console.log(error)
        }
      },
      closeModuleClick3() {
        this.isShowPopupTable3 = false
      },
      moduleSelectChange3(data) {
        this.model_op_one3 = data
      },
      moduleSelectChangeTwo3(data) {
        this.model_op_two3 = data
      },
      async searchModuleClick3() {
        this.pageNumber3 = 1
        await this.fetchVideoSchedule({
          courseId: this.courseId,
          sectionId: this.sectionId,
          pointIds: this.model_op_one3,
          videoStatus: this.model_op_two3,
          userId: this.userId,
          pageNumber: 1,
          pageSize: this.pageSize3
        })
        let videoResult = this.$store.state.stuCondition.videoSchedule
        this.total3 = videoResult.total
        try {
          this._videoPlanDis(videoResult.list, true)
        } catch (error) {
          console.log(error)
        }
      },
      /**
       * 跳转页面============================================
       */
      //跳转沟通记录
      communicationMentor(courseId, userId, menuId) {
        if (this.type === 1) {
          this.$router.push({
            name: 'communication_record_mentor',
            query: {
              courseId: courseId,
              userId: userId,
              menuId: menuId
            }
          })
        } else {
          this.$router.push({
            name: 'teacher_record',
            query: {
              courseId: courseId,
              studentId: userId
            }
          })
        }
      },
      //学习任务管理
      learningTasks(roleType,courseId, userId, stuCourseId, menuId) {
        let obj={studentId: userId, courseId: courseId, subjectId: menuId};
        if(roleType===1){
          this.$router.push({
            name: 'learning_task_mentor',
            query: {
              ...obj,
              from: this.from + '_student-list'
            }
          })
        }else{
          this.$router.push({
            name: 'learning_task_headteacher',
            query: {
              ...obj,
              from: this.from + '_student-list'
            }
          })
        }
      },
      //跳转学习详情
      stuinfoDetail(courseId, userId, stuCourseId) {
        this.$router.push({
          name: 'stuinfo_detail',
          query: {
            courseId: courseId,
            userId: userId,
            stuCourseId: stuCourseId,
            from: this.from + '_student-list'
          }
        })
      },
      //跳转学籍卡详情
      studentInfo(id,userId) {
        this.$router.push({
          name: 'student_info',
          query: {
            uuid: id,
            userId: userId,
            from: this.from + '_student-list'
          }
        })
      }
    },
    mounted(){
      //获取table-height
      this.$nextTick(()=> {
        let dom = document.getElementById("table-student-list");
        this.baseHeight = util.baseHeight(dom, 82);
      })
    }
  }
</script>

<style lang="less" scoped>
  .students-wrap /deep/ .ivu-table-wrapper {
    width: 100%;
    .see-details.ivu-btn {
      width: 50px;
      height: 30px;
      text-align: center;
      margin: 0;
      padding: 0;
      background: rgba(0, 0, 0, 0);
      border: none;
    }
    .see-details {
      color: #2d8cf0;
      &:hover {
        color: #57a3f3;
      }
    }
  }
  .students-wrap /deep/ .bg-b {
    margin-left: 10px;
    background: #2d8cf0;
    color: #fff;
    &:hover {
      background: #57a3f3;
      color:#fff;
    }
  }
  .m-t20 {
    margin-top: 20px;
  }
  .ivu-page-options-elevator input {
    height: 30px;
  }
</style>
