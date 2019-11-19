<template>
  <Card class="mentor-students">
    <Row :gutter="10" class="mentor-select">
      <Col span="3">
        <Select clearable placeholder="学籍状态" v-model="searchParams.censusStatus">
          <Option v-for="item in selectCensus" :value="item.value" :key="item.id">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col span="3">
        <Select clearable placeholder="是否失联" v-model="searchParams.contactState">
          <Option v-for="item in selectContac" :value="item.value" :key="item.id">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col span="3">
        <Select clearable  placeholder="学习效果风险评估" v-model="searchParams.riskEffectStatus">
          <Option v-for="item in SelectRiskEffect" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col span="3">
        <Select clearable placeholder="学习状态风险评估" v-model="searchParams.riskStudyStatus">
          <Option v-for="item in SelectRiskStudy" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </Col>
      <Col span="4" >
        <Input placeholder="请输入姓名/UID/登录账号" v-model="searchParams.userSearch"/>
      </Col>
      <Col span="4" class="next-time">
        <DatePicker type="daterange" :value="nextContactTime" placeholder="下次沟通起止日期" style="width:100%;" @on-change="changeNextContactTime"></DatePicker>
      </Col>
      <Col span="4" >
        <span @click="serchInfo"><Button type="primary" icon="ios-search">搜索</Button></span>
        <span @click="clearInfo" style="margin-left:6px"><Button >清除</Button></span>
      </Col>
    </Row>
    <Row style="margin-top:20px;" id="table-stage-list">
      <Col span="24">
        <Table border :height="baseHeight" :loading="mentor_loading" :columns="myStudentsTit" :data="myStudentsList"></Table>
      </Col>
      <Col class="m-t20" span="24">
           <Page placement="top" style="text-align: right; padding-bottom: 1px"
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
  name: 'MentorStudentsList',
  props: {
    type: Number
  },
  components: {
    PopupTable
  },

  beforeRouteLeave(to, from, next) {
    let keepAlivePaths = {
      'mentor_record': 1,
      'learning_task_mentor': 1,
      'stuinfo_detail': 1,
      'student_info': 1
    }

    if (keepAlivePaths[to.name]) {
      from.meta.keepAlive = true
    } else {
      from.meta.keepAlive = false
    }
    next()
  },

  data() {
    let self = this

    const haschakanweizhi = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_modules_processes')
    const hasjindu = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_processes')
    const hasgoutong = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_communications')
    const hasrenwuguanli = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_tasks')
    const hasxiangqing = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_details')
    const hasxuejika = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_cards')
    
    return {
      baseHeight: 0,
      arrPage:[10,20,30,40,100,200],
      mentor_loading: true,
      //弹窗1
      pageSize1: 10,
      pageNumber1: 1,
      total1: 0,
      isShowPopupTable: false,
      moduleCoData: [
        {
          title: '序号',
          key: 'Num',
          width: 80,
          align: 'center',
          render: (h, params) => {
            return h(
              'span',
              params.index + 1 + this.pageSize1 * (this.pageNumber1 - 1)
            )
          }
        },
        {
          title: '模块名称',
          key: 'Module_name',
          ellipsis: true,
          render(h, params) {
            let span = 'span'
            return <span title={params.row.Module_name}>{params.row.Module_name}</span>
          }
        },
        {
          title: '模块进度（已完成/节总量）',
          key: 'Module_plan',
          align: 'right',
          width: 200,
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
                      this.modulePlanClick(params.row, null, null, null)
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
          key: 'Module_status',
           width: 120
        }
      ],
      moduleDaData: [],
      module_title: '整体进度-志刚',
      model_op_one: '',
      model_op_two: '',
      model_name_one: '请选择课程模块',
      model_name_two: '请选择模块状态',
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
      pageSize2: 10,
      pageNumber2: 1,
      total2: 0,
      isShowPopupTable2: false,
      moduleCoData2: [
        {
          title: '序号',
          key: 'Num',
          width: 80,
          align: 'center',
          render: (h, params) => {
            return h(
              'span',
              params.index + 1 + this.pageSize2 * (this.pageNumber2 - 1)
            )
          }
        },
        {
          title: '节名称',
          key: 'Knob_name',
          ellipsis: true,
          render(h, params) {
            let span = 'span'
            return <span title={params.row.Knob_name}>{params.row.Knob_name}</span>
          }
        },
        {
          title: '视频进度（已完成/视频总量）',
          key: 'Video_plan',
          width: 200,
          align: 'right',
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
          key: 'Knob_test',
          width: 146,
          align: 'right',
        },
        {
          title: '节状态',
          key: 'Knob_status',
          width: 120
        }
      ],
      moduleDaData2: [],
      module_title2: '模块进度-1-JavaScript基础语法-志刚',
      model_op_one2: '',
      model_op_two2: '',
      model_name_one2: '请选择节名称',
      model_name_two2: '请选择节状态',
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
          key: 'knowledge_name',
          ellipsis: true,
          render(h, params) {
            let span = 'span'
            return <span title={params.row.knowledge_name}>{params.row.knowledge_name}</span>
          }
        },
        {
          title: '视频状态',
          key: 'video_status',
          width: 100
        },
        {
          title: '视频总时长',
          key: 'video_total_time',
          width: 130,
          align: 'right',
        },
        {
          title: '最新观看日期',
          key: 'new_watch_date',
          width: 150,
          align: 'right',
        },
        {
          title: '观看总时长',
          key: 'watch_total_time',
          align: 'right',
        },
        {
          title: '播放设备',
          key: 'play_facility',
          ellipsis: true,
          render(h, params) {
            let span = 'span'
            return <span title={params.row.play_facility}>{params.row.play_facility}</span>
          }
        },
        {
          title: '播放次数',
          key: 'play_num',
          align: 'right',
          width: 130,
        }
      ],
      moduleDaData3: [],
      module_title3: '拓展资料·模块进度-1-JavaScript基础语法-志刚',
      model_op_one3: '',
      model_op_two3: '',
      model_name_one3: '请选择知识点名称',
      model_name_two3: '请选择知视频状态',
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
      //===============================================================
      nextContactTime: [],
      searchParams: {
        censusStatus: '', //学籍状态
        contactState: '', //是否失联
        riskEffectStatus: '', //学习效果风险
        riskStudyStatus: '', //学习状态风险
        userSearch: '',//姓名/UID/登录账号
        tutorTeacherNextContactTime: '' //导师下次沟通时时间
      },
      pageParams: {
        pageNumber: 1,
        pageSize: 10
      },
      mentorStudent: false,
      userId: '',
      courseId: '',
      moduleId: '',
      sectionId: '',
      realName: '',
      currentVideoPosition: '',
      querys: this.$route.query,
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
          value: 0,
          label: '是'
        },
        {
          value: 1,
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
      // //日期
      // formItem: {},
      //表格title
      myStudentsTit: [
        {
          title: '序号',
          key: 'Num',
          align: 'center',
          width: 80,
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
          width: 80
        },
        {
          title: '姓名',
          key: 'realName',
          width: 120
        },
        {
          title: '目前任务',
          key: 'currentTask',
          minWidth: 200,
          ellipsis: true,
          render(h, params) {
            let span = 'span'
            return <span title={params.row.currentTask}>{params.row.currentTask || '-'}</span>
          }
        },
        {
          title: '最后一次导师沟通',
          key: 'tutorLastContactTime',
          width: 150,
          align: 'right',
          render(h, params) {
            let span = 'span'
            return <span>{params.row.tutorLastContactTime || '-'}</span>
          }
        },
        {
          title: '最后一次班主任沟通',
          headTeacherLastContactTime: 'headTeacherLastContactTime',
          width: 150,
          align: 'right',
          render(h, params) {
            return <span>{params.row.headTeacherLastContactTime || '-'}</span>
          }
        },
        {
          title: `下一次${this.type==1?'导师':'班主任'}沟通`,
          tutorTeacherNextContactTime: 'tutorTeacherNextContactTime',
          headTeacherNextContactTime:'headTeacherNextContactTime',
          width: 150,
          align: 'right',
          render(h, params) {
            let span = 'span'
            let content = this.column.title=="下一次导师沟通" ? params.row.tutorTeacherNextContactTime : params.row.headTeacherNextContactTime
            content = content || '-'
            return <span>{content}</span>
          }
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
          title: '当前视频学习位置',
          key: 'currentVideoPosition',
          userId: 'userId',
          courseId: 'courseId',
          moduleId: 'moduleId',
          width: 340,
          render(h, params) {
            let div = 'div'
            let span = 'span'
            const modulePlanClick = _.partial(
              self.modulePlanClick,
              params.row,
              params.row.userId,
              params.row.courseId,
              params.row.moduleId
            )
            return (
              <div>
                {params.row.currentVideoPosition}
                {haschakanweizhi && params.row.moduleId && (
                  <span
                    class="see-details"
                    {...{ on: { click: modulePlanClick } }}
                  >
                    {params.row.currentHomeworkName ? '' : '查看'}
                  </span>
                )}
              </div>
            )
          }
        },
        {
          title: '整体进度',
          key: 'wholeProcess',
          userId: 'userId',
          courseId: 'courseId',
          moduleId: 'moduleId',
          width: 150,
          align:'right',
          render(h, params) {
            let div = 'div'
            let span = 'span'
            const initStateShow = _.partial(
              self.initStateShow,
              params.row,
              params.row.userId,
              params.row.courseId,
              params.row.moduleId
            )
            return (
              <div>
                {params.row.wholeProcess}
                {hasjindu &&
                <span
                  class="see-details"
                  {...{ on: { click: initStateShow } }}
                >
                  查看
                </span>
                }
              </div>
            )
          }
        },
           {
          title: '剩余服务天数',
          key: 'remainServiceDays',
          align: 'right',
          width: 120
        },
        {
          title: '在本群天数',
          key: 'stayGroupDays',
          align: 'right',
          width: 100
        },
        {
          title: '学员所在课程',
          key: 'courseName',
          width: 200,
          ellipsis: true,
          render(h, params) {
            let span = 'span'
            return <span title={params.row.courseName}>{params.row.courseName}</span>
          }
        },
        {
          title: '学员类型',
          key: 'realName',
          width: 100,
          render: (h, params) => {
            let type = '';
            if (params.row.userType === 1) {
              type = '内部开通';
            } else if (params.row.userType === 2) {
              type = '线下转线上';
            } else if (params.row.userType === 3) {
              type = '缴费用户';
            }
            return h(
              'span',
              type
            )
          }
        },
        {
          title: '操作',
          key: 'action',
          UUID: 'itcastUUID',
          userId: 'userId',
          courseId: 'courseId',
          groupId: 'groupId',
          stuCourseId: 'stuCourseId',
          menuId: 'menuId',
          fixed: 'right',
          width: 440,
          render(h, params) {
            let div = 'div'
            let Button = 'Button'
            const studentInfo = _.partial(
              self.studentInfo,
              params.row.itcastUUID,
              params.row.userId
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
              params.row.groupId,
              params.row.menuId
            )
            const learningTasks = _.partial(
              self.learningTasks,
              params.row.courseId,
              params.row.userId,
              params.row.stuCourseId,
              params.row.menuId
            )

            return (
              <div>
                {hasgoutong && <Button
                  class="bg-b"
                  type="text"
                  {...{ on: { click: communicationMentor } }}
                >
                  沟通记录
                </Button>}
                {hasrenwuguanli && <Button
                  class="bg-b"
                  type="text"
                  {...{ on: { click: learningTasks } }}
                >
                  学习任务管理
                </Button>}
                {hasxiangqing && <Button
                  class="bg-b"
                  type="text"
                  {...{ on: { click: stuinfoDetail } }}
                >
                  学习详情
                </Button>}
                {hasxuejika && <Button
                  class="bg-b"
                  type="text"
                  {...{ on: { click: studentInfo } }}
                >
                  学籍卡信息
                </Button>}
              </div>
            )
          }
        }
      ]
    }
  },
  created() {
    this.querys.groupId = this.$route.query.groupId;
    if (this.$route.meta.keepAlive === false) {
      this.fecthMyStudents();
    }
  },
  mounted() {
    //获取table-height
    this.$nextTick(()=> {
      let dom = document.getElementById("table-stage-list");
      this.baseHeight = util.baseHeight(dom, 82);
    })
  },
  async activated() {
    let obj = Object.assign(
        {
          pageNumber: this.pageParams.pageNumber,
          pageSize: this.pageParams.pageSize,
          groupId: this.querys.groupId,
          type: 1,
          typeList: 1
        },
        this.searchParams
      )
    await this.postMyStudents(obj)
    this.mentor_loading = false;
  },
  computed: {
    ...mapState({
      pageList: state => state.myStudents.pageData,
      myStudentsList: state => state.myStudents.myStudentsData,
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
      'fetchModuleSchedule'
    ]),
    //获取我的学员列表
    async fecthMyStudents() {
      this.pageParams.pageNumber = 1;
      this.pageParams.pageSize = 10;
      await this.postMyStudents({
        pageNumber: this.pageParams.pageNumber,
        pageSize: this.pageParams.pageSize,
        groupId: this.querys.groupId,
        type: 1,
        typeList: 1
      })
      this.mentor_loading = false;
    },
    changeNextContactTime(date){
      this.nextContactTime = [...date];
      this.searchParams.tutorTeacherNextContactTime = date[0]+','+date[1]
    },
    //根据条件查询列表
    serchInfo() {
      this.pageParams.pageNumber = 1
      let obj = Object.assign(
        {
          pageNumber: 1,
          pageSize: this.pageParams.pageSize,
          groupId: this.querys.groupId,
          type: 1,
          typeList: 1
        },
        this.searchParams
      )
      this.postMyStudents(obj)
    },
    //我的学员列表清除查询条件
    clearInfo() {
      this.pageParams.pageNumber = 1
      this.nextContactTime = '';
      this.searchParams = {
        censusStatus: '', //学籍状态
        contactState: '', //是否失联
        riskEffectStatus: '', //学习效果风险
        riskStudyStatus: '', //学习状态风险
        userSearch: '',//姓名/UID/登录账号
        tutorTeacherNextContactTime: ''
      }
      this.postMyStudents({
        pageNumber: 1,
        pageSize: this.pageParams.pageSize,
        groupId: this.querys.groupId,
        type: 1,
        typeList: 1
      })
    },
    //翻页
    changeCurrent(num) {
      this.pageParams.pageNumber = num
      let obj = Object.assign(
        {
          pageNumber: this.pageParams.pageNumber,
          pageSize: this.pageParams.pageSize,
          groupId: this.querys.groupId,
          type: 1,
          typeList: 1
        },
        this.searchParams
      )
      this.postMyStudents(obj)
    },
    //改变每页条数
    changePageSize(size) {
      this.pageParams.pageSize = size
      let obj = Object.assign(
        {
          pageNumber: this.pageParams.pageNumber,
          pageSize: this.pageParams.pageSize,
          groupId: this.querys.groupId,
          type: 1,
          typeList: 1
        },
        this.searchParams
      )
      this.postMyStudents(obj)
    },
    /**
     * 弹窗=============================================================
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
      this.pageNumber1 = 1
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
      let moduleName2 = row.currentModuleName
        ? row.currentModuleName
        : row.Module_name
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
      this.module_title3 =
        '视频进度' + '-' + row.Knob_name + '-' + this.realName
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
        pageSize: page
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
        pageNumber: 1,
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
     * 跳转页面========================================================
     */
    //跳转沟通记录
    communicationMentor(courseId, userId, groupId, menuId) {
      this.$router.push({
        name: 'mentor_record',
        query: {
          courseId: courseId,
          userId: userId,
          groupId: groupId,
          menuId: menuId
        }
      })
    },
    //学习任务管理
    learningTasks(courseId, userId, stuCourseId, menuId) {
      this.$router.push({
        name: 'learning_task_mentor',
        query: {
          studentId: userId,
          courseId: courseId,
          subjectId: menuId,
          from: 'learning-manage-mentor_stage-of_mentor-students-list'
        }
      })
    },
    //跳转学习详情
    stuinfoDetail(courseId, userId, stuCourseId) {
      this.$router.push({
        name: 'stuinfo_detail',
        query: {
          courseId: courseId,
          userId: userId,
          stuCourseId: stuCourseId,
          from: 'learning-manage-mentor_stage-of_mentor-students-list'
        }
      })
    },
    //跳转学籍卡详情
    studentInfo(id, userId) {
      this.$router.push({
        name: 'student_info',
        query: {
          uuid: id,
          userId: userId,
          from: 'learning-manage-mentor_stage-of_mentor-students-list'
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>
.mentor-students /deep/ .ivu-table-wrapper {
  .see-details {
    color: #2d8cf0;
    margin-left: 15px;
    &:hover {
      cursor: pointer;
      color: #57a3f3;
    }
  }
}
.mentor-students /deep/ .bg-b {
  margin-left: 10px;
  background: #2d8cf0;
  color: #fff;
  &:hover {
    background: #57a3f3;
    color: #fff;
  }
}
.m-t20 {
  margin-top: 20px;
}
.ivu-page-options-elevator input {
  height: 30px;
}
</style>
