<template>
  <div class="modal-wrap">
    <Modal
      v-model= "isShowPopupTables"
      :mask="true"
      :closable="false"
      :footer-hide="true"
      :transfer="true"
      :mask-closable="false"
      width='1000'>
      <div class="modal_header">
        <h6>{{params && params.column.title}}</h6>
        <span class="close" @click="moduleClicks"><Icon class="closeIcon" type="md-close" /></span>
      </div>
      <Table height="560" border :columns="my_students_tit" :data="students_list || myStudentsList"></Table>
      <Page style="margin-top:20px;text-align:right;padding-bottom:1px"
            :total="page_list.total || pageList.total"
            :current="pageNumber0"
            :page-size="pageSize0"
            :page-size-opts="arrPage"
            @on-change="changeCurrent"
            @on-page-size-change="changePageSize"
            :transfer="true"
            show-total show-elevator show-sizer>
      </Page>
      <div class="module_close" @click="moduleClicks">
        <Button type="primary">关闭</Button>
      </div>
    </Modal>
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
  </div>
</template>

<script>
import api from '@/api/index'
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import PopupTable from '@/components/popup-table/popup-table'
export default {
  props: ['isShowPopupTables', 'myStudentsList', 'pageList', 'params', 'stuCourseIds'],
  components:{
    PopupTable
  },
  data() {
    let self = this
    return {
      //弹窗0
      arrPage:[10,20,30,40,100,200],
      students_loading: false,
      pageSize0: 10,
      pageNumber0: 1,
      my_students_tit: [
        {
          title: '序号',
          key: 'Num',
          width: 80,
          align: 'center',
          render: (h, params) => {
            return h(
              'span',
              params.index + 1 + this.pageSize0 * (this.pageNumber0 - 1)
            )
          }
        },
        {
          title: 'UID',
          key: 'itcastUUID',
          width: 80,
          align: 'right'
        },
        {
          title: '姓名',
          key: 'realName',
          width: 100
        },
        {
          title: '剩余服务天数',
          key: 'remainServiceDays',
          width: 110,
          align: 'right'
        },
        {
          title: '在本班天数',
          key: 'stayGroupDays',
          width: 100,
          align: 'right'
        },
        {
          title: '整体进度',
          key: 'wholeProcess',
          width: 150,
          align: 'right',
          render(h, params) {
            let div = 'div'
            let span = 'span'
            const initStateShow = _.partial(
              self.initStateShow,
              params.row
            )
            return (
              <div class="check">
                {params.row.wholeProcess}
                <span class="to-view" {...{ on: { click: initStateShow } }}>查看</span>
              </div>
            )
          }
        },
        {
          title: '当前视频学习位置',
          key: 'currentVideoPosition',
          width: 340,
          render(h, params) {
            let div = 'div'
            let span = 'span'
            const modulePlanClick = _.partial(
              self.modulePlanClick,
              params.row
            )
            return (
              <div class="check">
                {params.row.currentVideoPosition}
                {params.row.moduleId && <span class="to-view" {...{ on: { click: modulePlanClick } }}>{params.row.currentHomeworkName?'':'查看'}</span>}
              </div>
            )
          }
        },
        {
          title: `最后一次${this.type==1?'导师':'班主任'}沟通`,
          tutorLastContactTime: 'tutorLastContactTime',
          headTeacherLastContactTime: 'headTeacherLastContactTime',
          width: 150,
          align: 'right',
          render(h, params) {
            let span = 'span'
            let content = this.column.title=="最后一次导师沟通" ? params.row.tutorLastContactTime : params.row.headTeacherLastContactTime
            content = content||'-'
            return <span>{content}</span>
          }
        },
        {
          title: `最后一次${this.type!=1?'导师':'班主任'}沟通`,
          tutorLastContactTime: 'tutorLastContactTime',
          headTeacherLastContactTime: 'headTeacherLastContactTime',
          width: 150,
          align: 'right',
          render(h, params) {
            let span = 'span'
            let content = this.column.title=="最后一次导师沟通" ? params.row.tutorLastContactTime : params.row.headTeacherLastContactTime
            content = content||'-'
            return <span>{content}</span>
          }
        }
      ],
      //弹窗1
      pageSize1: 10,
      pageNumber1: 1,
      total1: 0,
      isShowPopupTable: false,
      moduleCoData: [
        {
          title: '序号',
          key: 'Num',
          width: 70,
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
          width:200,
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
      pageNumber2: 1,
      pageSize2: 10,
      total2: 0,
      isShowPopupTable2: false,
      moduleCoData2: [
        {
          title: '序号',
          key: 'Num',
          width: 70,
          align: 'center',
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
          align: 'right'
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
          align: 'right'
        },
        {
          title: '最新观看日期',
          key: 'new_watch_date',
          width: 150,
          align: 'right'
        },
        {
          title: '观看总时长',
          key: 'watch_total_time',
          align: 'right'
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
          width: 120
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
    }
  },
  computed: {
    ...mapState({
      //弹窗数据0
      students_list: state => state.myStudents.myStudentsData,
      page_list: state => state.myStudents.pageData,
      //弹窗数据1\2\3
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
    ]),
    //翻页
    changeCurrent(num) {
      this.pageNumber0 = num
      this.postMyStudents({
        stuCourseIds: this.stuCourseIds,
        menuId: this.params.row.subjectId,
        pageNumber: this.pageNumber0,
        pageSize: this.pageSize0,
        dataTab: 'DATA',
        typeList: 0
      })
    },
    //改变每页条数
    changePageSize(size) {
      this.pageSize0 = size
      this.postMyStudents({
        stuCourseIds: this.stuCourseIds,
        menuId: this.params.row.subjectId,
        pageNumber: this.pageNumber0,
        pageSize: this.pageSize0,
        dataTab: 'DATA',
        typeList: 0
      })
    },
    moduleClicks(){
      this.pageNumber0 = 1;
      this.pageSize0 = 10;
      this.$emit('moduleCloseClicks');
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
    }
  }
}
</script>

<style lang="less" scoped>
div /deep/ .to-view{
  margin-left: 20px;
  color: #008bf8;
  &:hover{
    cursor: pointer;
  }
}
/deep/ .ivu-modal-header{
  border-bottom: none;
}
.modal_header{
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  h6{
    font-size: 14px;
    line-height: 30px;
  }
  .closeIcon{
    font-size: 30px;
    font-weight: 600;
    line-height: 30px;
    cursor: pointer;
  }
}
.module_close{
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
