<template>
  <div class="expand">
    <div
      style="width:100%;"
    >
      <div class="module_search">
      </div>
      <div id="table-stage-list">
        <Table class="module_table" :height="baseHeight" border :loading="loading" :columns="columns1" :data="data1"></Table>
        <div class="module_page_box">
          <Page placement="top" 
            class="module_page" 
            show-elevator 
            show-sizer 
            :total="total"
            :current="current"
            @on-page-size-change="modulePageSizeChange"
            @on-change="modulePageChange" 
          />
        </div>
      </div>
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
        @modulePageChangeClick="modulePageChangeClick"
        @modulePageSizeChangeClick="modulePageSizeChangeClick"
        @moduleClearClick="moduleClearClick"
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
        @modulePageChangeClick="modulePageChangeClick2"
        @modulePageSizeChangeClick="modulePageSizeChangeClick2"
        @moduleClearClick="moduleClearClick2"
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
        @modulePageChangeClick="modulePageChangeClick3"
        @modulePageSizeChangeClick="modulePageSizeChangeClick3"
        @moduleClearClick="moduleClearClick3"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import util from '@/util/util'
import PopupTable from '@/components/popup-table/popup-table'
export default {
  name: 'stuClassExpand',
  props: {
    from: String
  },
  components: {
    PopupTable
  },
  data() {
    const from = this.from
    let haschakanzhuangtai

    if (from == 'learning-manage-mentor_my-students') {
      haschakanzhuangtai = this.hasSomeApiAccess('teaching_students_process_mentors_students_details_extension_modules_status')
    } else if (from == 'learning-manage-headteacher_my-students') {
      haschakanzhuangtai = this.hasSomeApiAccess('teaching_students_process_teachers_students_details_extensions_modules_status')
    } else if (from == 'learning-manage-mentor_stage-of_mentor-students-list') {
      haschakanzhuangtai = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_details_extensions_modules_status')
    } else if (from == 'learning-manage-headteacher_stage-of_teacher-students-list') {
      haschakanzhuangtai = this.hasSomeApiAccess('teaching_students_process_teachers_groups_students_details_extensions_modules_status')
    } else if (from == 'learning-manage-stat_student-list') {
      haschakanzhuangtai = this.hasSomeApiAccess('teaching_students_process_data_students_details_extensions_modules_status')
    } else if (from == 'learning-manage-stat_stage-of_student-list') {
      haschakanzhuangtai = this.hasSomeApiAccess('teaching_students_process_data_groups_students_details_extensions_modules_status')
    } else if (from == 'class-stu-manage_employment_see-students') {
      haschakanzhuangtai = this.hasSomeApiAccess('teaching_courses_students_employment_courses_students_details_extensions_modules_status')
    } else if (from == 'class-stu-manage_small-class_see-students') {
      haschakanzhuangtai = this.hasSomeApiAccess('teaching_courses_students_micro_courses_students_details_extensions_modules_status')
    }

    return {
      baseHeight: 0,
      loading:true,
      //弹窗1
      current:1,
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
              params.index + 1 + this.pageSize1 * (this.pageNumber1 - 1)
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
      module_title: '拓展资料进度-志刚',
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
      pageSize2: 10,
      pageNumber2: 1,
      total2: 0,
      isShowPopupTable2: false,
      moduleCoData2: [
        {
          title: '序号',
          key: 'Num',
          render: (h, params) => {
            return h(
              'span',
              params.index + 1 + this.pageSize2 * (this.pageNumber2 - 1)
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
          key: 'Knob_test',
          render: (h, params) => {
            return h('div', [
              h('div', params.row.Knob_test),
            ]);
          }
        },
        {
          title: '节状态',
          key: 'Knob_status'
        }
      ],
      moduleDaData2: [],
      module_title2: '拓展资料·模块进度-1-JavaScript基础语法-志刚',
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
      total: 100,
      columns1: [
        {
          title: '序号',
          key: 'Num',
          width:80,
          align:"center",
          render: (h, params) => {
            return h(
              'span',
              params.index + 1 + this.pageSize3 * (this.pageNumber3 - 1)
            )
          }
        },
        {
          title: '拓展资料名称',
          key: 'Expand_info_name'
        },
        {
          title: '拓展资料说明',
          key: 'Expand_info_explain'
        },
        {
          title: '创建日期',
          key: 'Found_time',
          align:"right",
        },
        {
          title: '创建者',
          key: 'Founder'
        },
        {
          title: '课程模块',
          key: 'Class_module'
        },
        {
          title: '操作',
          key: 'Operation',
          align:"center",
          render: (h, params) => {
            let viewStatusBtn = null
            
            if (haschakanzhuangtai) {
              viewStatusBtn = h(
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
                      this.expandClick(params.row)
                    }
                  }
                },
                '查看模块状态'
              )
            }

            return h('div', [
              viewStatusBtn
            ])
          }
        }
      ],
      classPhaseoOp: [],
      resultPhaseoOp: [
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
      model1: '',
      model2: '',
      data1: [],
      sectionIds: '',
      moduleId: '',
      pageSize: 10,
      pageNumber: 1,
      phaseExtendId: 0
    }
  },
  methods: {
    ...mapActions([
      'fetchExpandInfo',
      'fetchExpandPlan',
      'fetchVideoSchedule',
      'fetchModuleSchedule'
    ]),
    async _initState() {
      let uInfo = this.$route.query
      this.pageSize1 = 10
      await this.fetchExpandInfo({
        courseId: uInfo.courseId,
        userId: uInfo.userId,
        pageNumber: 1,
        pageSize: 10
      })
      let expandResult = this.$store.state.stuCondition.expandInfo
      this.loading = expandResult ? false : true
      this.total = expandResult.total
      try {
        this._dState(expandResult.list)
      } catch (error) {
        console.log(error)
      }
    },
    _dState(expandResult) {
      let arr = []
      expandResult.forEach(e => {
        let newData = {}
        Object.assign(newData, {
          id: e.id,
          Expand_info_name: e.name,
          Expand_info_explain: e.remark,
          Found_time: e.stuPhaseExtendCreateTime,
          Founder: e.stuPhaseExtendCreatorName,
          Class_module: e.moduleCount
        })
        arr.push(newData)
      })
      this.data1 = arr
    },
    searchClick() {},
    async expandClick(row) {
      let uInfo = this.$route.query
      let studyDetails = this.$store.state.stuCondition.studyDetails
      this.module_title = '拓展资料资料' + '-' + studyDetails.userName
      this.isShowPopupTable = true
      this.phaseExtendId = row.id
      await this.fetchExpandPlan({
        phaseExtendId: row.id,
        userId: uInfo.userId,
        pageNumber: 1,
        pageSize: 10
      })
      let expandResult = this.$store.state.stuCondition.expandPlan
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
    async modulePlanClick(row) {
      let uInfo = this.$route.query
      this.pageSize2 = 10
      let studyDetails = this.$store.state.stuCondition.studyDetails
      this.total1 = studyDetails.total
      this.module_title2 =
        '拓展资料·模块进度' +
        '-' +
        row.Module_name +
        '-' +
        studyDetails.userName
      this.isShowPopupTable2 = true
      this.moduleId = row.id
      await this.fetchModuleSchedule({
        courseId: uInfo.courseId,
        moduleId: row.id,
        userId: uInfo.userId,
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
    async videoPlanClick(row) {
      let uInfo = this.$route.query
      this.pageSize3 = 10
      let studyDetails = this.$store.state.stuCondition.studyDetails
      this.module_title3 =
        '视频进度' + '-' + row.Knob_name + '-' + studyDetails.userName
      this.isShowPopupTable3 = true
      this.sectionIds = row.id
      await this.fetchVideoSchedule({
        courseId: uInfo.courseId,
        sectionId: row.id,
        userId: uInfo.userId,
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
    //弹窗内方法
    async modulePageChangeClick(page) {
      //弹窗pageNum更改
      this.pageNumber1 = page
      let uInfo = this.$route.query
      await this.fetchExpandPlan({
        phaseExtendId: this.phaseExtendId,
        moduleStatus: this.model_op_two,
        userId: uInfo.userId,
        pageNumber: page,
        pageSize: this.pageSize1,
        moduleIds: this.model_op_one
      })
      let expandResult = this.$store.state.stuCondition.expandPlan
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
      let uInfo = this.$route.query
      await this.fetchExpandPlan({
        phaseExtendId: this.phaseExtendId,
        moduleStatus: this.model_op_two,
        userId: uInfo.userId,
        pageNumber: 1,
        pageSize: page,
        moduleIds: this.model_op_one
      })
      let expandResult = this.$store.state.stuCondition.expandPlan
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
      let uInfo = this.$route.query
      this.pageNumber1 = 1
      await this.fetchExpandPlan({
        phaseExtendId: this.phaseExtendId,
        moduleStatus: this.model_op_two,
        userId: uInfo.userId,
        pageNumber: this.pageNumber1,
        pageSize: this.pageSize1,
        moduleIds: this.model_op_one
      })
      let expandResult = this.$store.state.stuCondition.expandPlan
      this.total1 = expandResult.total
      try {
        this._dPlanState(expandResult.list, true)
      } catch (error) {
        console.log(error)
      }
    },
    //清除搜索
    async moduleClearClick() {
      let uInfo = this.$route.query
      this.pageNumber1 = 1
      await this.fetchExpandPlan({
        phaseExtendId: this.phaseExtendId,
        userId: uInfo.userId,
        pageNumber: this.pageNumber1,
        pageSize: this.pageSize1,
      })
      let expandResult = this.$store.state.stuCondition.expandPlan
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
      let uInfo = this.$route.query
      this.pageNumber2 = page
      await this.fetchModuleSchedule({
        courseId: uInfo.courseId,
        moduleId: this.moduleId,
        sectionIds: this.model_op_one2,
        userId: uInfo.userId,
        pageNumber: page,
        pageSize: this.pageSize2,
        sectionStatus: this.model_op_two2
      })
      let moduleSchedule = this.$store.state.stuCondition.moduleSchedule
      this.total2 = moduleSchedule.total
      try {
        this._moduleStateD(moduleSchedule.list, true)
      } catch (error) {
        console.log(error)
      }
    },
    async modulePageSizeChangeClick2(page) {
      //弹窗pageSize更改
      let uInfo = this.$route.query
      this.pageSize2 = page
      await this.fetchModuleSchedule({
        courseId: uInfo.courseId,
        moduleId: this.moduleId,
        sectionIds: this.model_op_one2,
        userId: uInfo.userId,
        pageNumber: 1,
        pageSize: page,
        sectionStatus: this.model_op_two2
      })
      let moduleSchedule = this.$store.state.stuCondition.moduleSchedule
      this.total2 = moduleSchedule.total
      try {
        this._moduleStateD(moduleSchedule.list, true)
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
      let uInfo = this.$route.query
      this.pageNumber2 = 1
      await this.fetchModuleSchedule({
        courseId: uInfo.courseId,
        moduleId: this.moduleId,
        sectionIds: this.model_op_one2,
        userId: uInfo.userId,
        pageNumber: this.pageNumber2,
        pageSize: this.pageSize2,
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
    //清除搜索2
    async moduleClearClick2() {
      let uInfo = this.$route.query
      this.pageNumber2 = 1
      await this.fetchModuleSchedule({
        courseId: uInfo.courseId,
        moduleId: this.moduleId,
        userId: uInfo.userId,
        pageNumber: this.pageNumber2,
        pageSize: this.pageSize2,
      })
      let moduleSchedule = this.$store.state.stuCondition.moduleSchedule
      this.total2 = moduleSchedule.total
      try {
        this._moduleStateD(moduleSchedule.list, false)
      } catch (error) {
        console.log(error)
      }
    },
    //弹窗3
    async modulePageChangeClick3(page) {
      //弹窗pageNum更改
      this.pageNumber3 = page
      let uInfo = this.$route.query
      await this.fetchVideoSchedule({
        courseId: uInfo.courseId,
        sectionId: this.sectionIds,
        pointIds: this.model_op_one3,
        userId: uInfo.userId,
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
      let uInfo = this.$route.query
      await this.fetchVideoSchedule({
        courseId: uInfo.courseId,
        sectionId: this.sectionIds,
        pointIds: this.model_op_one3,
        userId: uInfo.userId,
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
      let uInfo = this.$route.query
      this.pageNumber3 = 1
      await this.fetchVideoSchedule({
        courseId: uInfo.courseId,
        sectionId: this.sectionIds,
        pointIds: this.model_op_one3,
        userId: uInfo.userId,
        pageNumber:this.pageNumber3,
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
    //清除搜索3
    async moduleClearClick3() {
      let uInfo = this.$route.query
      this.pageNumber3 = 1
      await this.fetchVideoSchedule({
        courseId: uInfo.courseId,
        sectionId: this.sectionIds,
        userId: uInfo.userId,
        pageNumber: this.pageNumber3,
        pageSize: this.pageSize3,
      })
      let videoResult = this.$store.state.stuCondition.videoSchedule
      this.total3 = videoResult.total
      try {
        this._videoPlanDis(videoResult.list, true)
      } catch (error) {
        console.log(error)
      }
    },
    //页码改变
    async modulePageChange(page) {
      this.pageNumber = page
      let uInfo = this.$route.query
      this.current=page
      await this.fetchExpandInfo({
        courseId: uInfo.courseId,
        userId: uInfo.userId,
        pageNumber: page,
        pageSize: this.pageSize
      })
      let expandResult = this.$store.state.stuCondition.expandInfo
      try {
        this._dState(expandResult.list)
      } catch (error) {
        console.log(error)
      }
    },
    //显示条数改变
    async modulePageSizeChange(pageSize) {
      this.pageSize = pageSize
      let uInfo = this.$route.query
      await this.fetchExpandInfo({
        courseId: uInfo.courseId,
        userId: uInfo.userId,
        pageNumber: 1,
        pageSize: pageSize
      })
      let expandResult = this.$store.state.stuCondition.expandInfo
      try {
        this._dState(expandResult.list)
      } catch (error) {
        console.log(error)
      }
    },
  },
  created() {
    this._initState()
  },
  mounted() {
    //获取table-height
    this.$nextTick(()=> {
      let dom = document.getElementById("table-stage-list");
      this.baseHeight = util.baseHeight(dom, 82);
    })
  },
  computed: {
    ...mapState({
      expandInfo: state => state.stuCondition.expandInfo,
      expandPlan: state => state.stuCondition.expandPlan,
      videoSchedule: state => state.stuCondition.videoSchedule,
      moduleSchedule: state => state.stuCondition.moduleSchedule
    })
  }
}
</script>

<style lang="less" scoped>
.expand {
  .module_search {
    display: flex;
    justify-content: flex-end;
    .module_col {
      width: 200px;
      display: flex;
      margin-top: 2px;
      span {
        display: block;
        width: 100px;
        line-height: 32px;
      }
    }
    .module_col + .module_col {
      margin-left: 10px;
      .selectSm {
        width: 100px;
      }
    }
    .module_colSm {
      width: 140px;
      margin-right: 10px;
      span {
        width: 40px;
        line-height: 32px;
      }
    }
  }
  .module_table {
    margin-top: 20px;
  }
  .module_page_box {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
//iview
.expand /deep/ .ivu-btn-icon-only {
  font-size: 18px;
  margin-top: 2px;
  height: 30px;
  padding: 0 8px 0;
}
</style>


