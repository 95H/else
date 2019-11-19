<template>
  <div class="stu_class_module">
    <div style="width:100%;">
      <div class="module_search">
        <Row type="flex" justify="end">
          <Col span="4" class="module_col module_colSm">
            <Select class="selectSm" v-model="model1" placeholder="请选择课程阶段" filterable @on-change="changePhase">
              <Option
                v-for="item in phaseList"
                :value="item.phaseId"
                :key="item.phaseId"
                :title="item.phaseName"
              >{{ item.phaseName }}</Option>
            </Select>
          </Col>
          <Col span="4" class="module_col module_colSm">
            <Select class="selectSm" v-model="model2" placeholder="请选择课程模块" filterable>
              <Option
                v-for="item in modulesList"
                :value="item.moduleId"
                :key="item.moduleId"
                :title="item.moduleName"
              >{{ item.moduleName }}</Option>
            </Select>
          </Col>
          <Col span="4" class="module_col module_colSm">
            <Select class="selectSm" v-model="model3" placeholder="请选择模块状态" filterable>
              <Option
                v-for="item in cityList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </Col>
          <Button @click="searchClick" class="searchBtn" type="primary" icon="ios-search"></Button>
          <Button @click="clearSearchClick" class="clearBtn" type="primary">清除</Button>
        </Row>
      </div>
      <div id="table-stage-list">
        <Table
          class="module_table"
          :height="baseHeight"
          border
          :loading="loading"
          :columns="columns1"
          :data="data1"
        ></Table>
        <div class="module_page_box">
          <Page
            placement="top"
            class="module_page"
            :total="total"
            :current="pageNumber"
            :page-size="pageSize"
            show-elevator
            show-sizer
            @on-page-size-change="modulePageSizeChange"
            @on-change="modulePageChange"
          />
        </div>
      </div>
      <PopupTable
        :total="total1"
        :current="pageNumber1"
        :pageSize="pageSize1"
        :isShowPopupTable="isShowPopupTable"
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
        :isShowPopupTable="isShowPopupTable2"
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
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import util from '@/util/util'
import PopupTable from '@/components/popup-table/popup-table'
export default {
  name: 'stuClassModule',
  props: {
    from: String
  },
  components: {
    PopupTable
  },
  data() {
    const from = this.from
    let haschakanjindu

    if (from == 'learning-manage-mentor_my-students') {
      haschakanjindu = this.hasSomeApiAccess('teaching_students_process_mentors_students_details_modules_processes')
    } else if (from == 'learning-manage-headteacher_my-students') {
      haschakanjindu = this.hasSomeApiAccess('teaching_students_process_teachers_students_details_modules_processes')
    } else if (from == 'learning-manage-mentor_stage-of_mentor-students-list') {
      haschakanjindu = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_details_modules_processes')
    } else if (from == 'learning-manage-headteacher_stage-of_teacher-students-list') {
      haschakanjindu = this.hasSomeApiAccess('teaching_students_process_teachers_groups_students_details_modules_processes')
    } else if (from == 'learning-manage-stat_student-list') {
      haschakanjindu = this.hasSomeApiAccess('teaching_students_process_data_students_details_modules_processes')
    } else if (from == 'learning-manage-stat_stage-of_student-list') {
      haschakanjindu = this.hasSomeApiAccess('teaching_students_process_data_groups_students_details_modules_processes')
    } else if (from == 'class-stu-manage_employment_see-students') {
      haschakanjindu = this.hasSomeApiAccess('teaching_courses_students_employment_courses_students_details_modules_processes')
    } else if (from == 'class-stu-manage_small-class_see-students') {
      haschakanjindu = this.hasSomeApiAccess('teaching_courses_students_micro_courses_students_details_modules_processes')
    }

    return {
      baseHeight: 0,
      loading: true,
      current: 1,
      moduleId: '', // 模块id
      sectionIds: '', // 节id
      //弹框2
      total2: 0,
      pageNumber2: 1,
      pageSize2: 10,
      isShowPopupTable2: false,
      moduleCoData2: [
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
      moduleDaData2: [],
      module_title2: '视频进度-玩家飞机-志刚',
      model_op_one2: '',
      model_op_two2: '',
      model_name_one2: '知识点名称：',
      model_name_two2: '视频状态：',
      model_list_one2: [],
      model_list_two2: [
        {
          value: '-1',
          label: '未开始'
        },
        {
          value: '1',
          label: '进行中'
        },
        {
          value: '2',
          label: '已完成'
        }
      ],
      //弹框1
      total1: 0,
      pageNumber1: 1,
      pageSize1: 10,
      model_op_one: '',
      model_op_two: '',
      model_name_one: '节名称：',
      model_name_two: '节状态：',
      model_list_one: [],
      model_list_two: [
        {
          value: '-1',
          label: '未开始'
        },
        {
          value: '0',
          label: '进行中'
        },
        {
          value: '1',
          label: '已完成'
        }
      ],
      isShowPopupTable: false,
      module_title: '模块进度-1-1 Python基础强化-志刚',
      cityList: [
        {
          value: '-1',
          label: '未开始'
        },
        {
          value: '0',
          label: '进行中'
        },
        {
          value: '1',
          label: '已完成'
        }
      ],
      model1: '',
      model2: '',
      model3: '',
      columns1: [
        {
          title: '序号',
          key: 'num',
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
          key: 'module_name',
          align: 'left'
        },
        {
          title: '模块进度(已完成/节总量)',
          key: 'module_plan',
          align: 'right',
          render: (h, params) => {
            let module_plan

            if (haschakanjindu) {
              module_plan = h(
                'div',
                {
                  class: 'module_plan_blue',
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
                params.row.module_plan
              )
            } else {
              module_plan = h(
                'div',
                {
                  props: {
                    type: 'text',
                    size: 'small'
                  }
                },
                params.row.module_plan
              )
            }

            return h('div', [
              module_plan
            ])
          }
        },
        {
          title: '模块状态',
          key: 'module_status',
          align: 'left'
        },
        {
          title: '参考学习天数',
          key: 'study_fate',
          align: 'right'
        },
        {
          title: '实际学习日期',
          key: 'study_date',
          align: 'left'
        }
      ],
      data1: [],
      moduleCoData: [
        //弹窗数据
        {
          title: '序号',
          key: 'section_id',
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
          key: 'knob_name',
          align: 'left'
        },
        {
          title: '视频进度',
          key: 'video_plan',
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
                params.row.video_plan
              )
            ])
          }
        },
        {
          title: '小节测试(正确率)',
          key: 'knob_test',
          align: 'right',
          render: (h, params) => {
            return h('div', [h('div', params.row.knob_test)])
          }
        },
        {
          title: '节状态',
          key: 'knob_fate',
          align: 'center'
        }
      ],
      moduleDaData: [],
      module_list: [],
      total: 100,
      pageNumber: 1,
      pageSize: 10
    }
  },
  methods: {
    ...mapActions([
      'fetchClassModule',
      // 查询课程下的阶段列表
      'fetchClassPhaseWork',
      // 查询课程及阶段下课程模块列表
      'fetchModulesList',
      'fetchVideoSchedule',
      'fetchModuleSchedule'
    ]),
    
    async _initState() {
      let uInfo = this.$route.query

      await this.fetchClassPhaseWork({
        courseId: uInfo.courseId
      })

      await this.fetchModulesList({
        courseId: uInfo.courseId
      })

      this.pageNumber = 1
      this.pageSize = 10
      await this.fetchClassModule({
        courseId: uInfo.courseId,
        userId: uInfo.userId,
        pageNumber: 1,
        pageSize: 10
      })
      let result = this.$store.state.stuCondition.classModule_list
      this.loading = result ? false : true
      this.module_list = result.list
      
      this.total = result.total
      try {
        this._disposeState(this.module_list)
      } catch (error) {
        console.log(error)
      }
    },

    // 
    changePhase(phaseId) {
      let uInfo = this.$route.query
      this.model2 = ''
      this.fetchModulesList({
        courseId: uInfo.courseId,
        phaseIds: String(phaseId)
      })
    },

    async searchClick() {
      let uInfo = this.$route.query
      this.pageNumber = 1
      await this.fetchClassModule({
        courseId: uInfo.courseId,
        phaseId: this.model1,
        moduleId: this.model2,
        moduleStatus: this.model3,
        userId: uInfo.userId,
        pageNumber: 1,
        pageSize: this.pageSize
      })
      let result = this.$store.state.stuCondition.classModule_list
      this.total = result.total
      try {
        this._disposeState(result.list)
      } catch (error) {
        console.log(error)
      }
    },

    async clearSearchClick() {
      this.pageNumber = 1
      this.model1 = ''
      this.model2 = ''
      this.model3 = ''
      let uInfo = this.$route.query
      await this.fetchClassModule({
        courseId: uInfo.courseId,
        userId: uInfo.userId,
        pageNumber: 1,
        pageSize: this.pageSize
      })
      let result = this.$store.state.stuCondition.classModule_list
      this.total = result.total
      try {
        this._disposeState(result.list)
      } catch (error) {
        console.log(error)
      }
    },
    //课程模块页码改变
    async modulePageChange(page) {
      this.pageNumber = page
      let uInfo = this.$route.query
      await this.fetchClassModule({
        courseId: uInfo.courseId,
        userId: uInfo.userId,
        pageNumber: page,
        pageSize: this.pageSize
      })
      let result = this.$store.state.stuCondition.classModule_list
      this.module_list = result.list
      try {
        this._disposeState(this.module_list)
      } catch (error) {
        console.log(error)
      }
    },
    //课程模块显示条数改变
    async modulePageSizeChange(pageSize) {
      this.pageSize = pageSize
      let uInfo = this.$route.query
      await this.fetchClassModule({
        courseId: uInfo.courseId,
        userId: uInfo.userId,
        pageNumber: 1,
        pageSize: this.pageSize
      })
      let result = this.$store.state.stuCondition.classModule_list
      this.module_list = result.list
      try {
        this._disposeState(this.module_list)
      } catch (error) {
        console.log(error)
      }
    },
    //封装课程模块
    _disposeState(moduleList) {
      let arr = []
      moduleList.forEach(e => {
        let newDate = {}
        if (e.moduleStatus == -1) {
          e.moduleStatus = '未开始'
        } else if (e.moduleStatus == 0) {
          e.moduleStatus = '进行中'
        } else if (e.moduleStatus == 1) {
          e.moduleStatus = '已完成'
        }
        Object.assign(newDate, {
          id: e.id,
          module_name: e.moduleName,
          module_plan: e.moduleProcess,
          module_status: e.moduleStatus,
          phaseId: e.phaseId,
          study_fate: e.referenceDays,
          study_date: e.learnDays
        })
        arr.push(newDate)
      })
      this.data1 = arr
    },
    async modulePlanClick(row) {
      this.isShowPopupTable = true
      let studyDetails = this.$store.state.stuCondition.studyDetails
      let uInfo = this.$route.query
      this.module_title =
        '模块进度' +
        '-' +
        row.module_name +
        '-' +
        studyDetails.courseName +
        '-' +
        studyDetails.userName
      this.moduleId = row.id
      this.pageNumber1 = 1
      this.pageSize1 = 10
      await this.fetchModuleSchedule({
        courseId: uInfo.courseId,
        moduleId: row.id,
        userId: uInfo.userId,
        pageNumber: 1,
        pageSize: 10
      })
      let resultVideo = this.$store.state.stuCondition.moduleSchedule
      this.total1 = resultVideo.total
      try {
        this._modulePlanDis(resultVideo.list, true)
      } catch (error) {
        console.log(error)
      }
    },
    //封装模块进度
    _modulePlanDis(videoList, isFirst) {
      let arr = []
      let arr1 = []
      videoList.forEach(e => {
        let newDate = {}
        let moduleDate = {}
        if (e.sectionStatus === -1) {
          e.sectionStatus = '未开始'
        } else if (e.sectionStatus === 0) {
          e.sectionStatus = '进行中'
        } else if (e.sectionStatus === 1) {
          e.sectionStatus = '已完成'
        }
        Object.assign(moduleDate, {
          value: e.id,
          label: e.sectionName
        })
        Object.assign(newDate, {
          section_id: e.id,
          knob_name: e.sectionName,
          video_plan: e.videoProcess,
          knob_test: e.accuracy,
          knob_fate: e.sectionStatus
        })
        arr.push(newDate)
        arr1.push(moduleDate)
      })
      this.moduleDaData = arr
      this.model_list_one = arr1
    },
    //搜索1
    async searchModuleClick() {
      let uInfo = this.$route.query
      this.pageNumber1 = 1
      await this.fetchModuleSchedule({
        courseId: uInfo.courseId,
        moduleId: this.moduleId,
        sectionIds: this.model_op_one,
        userId: uInfo.userId,
        pageNumber: 1,
        pageSize: this.pageSize1,
        sectionStatus: this.model_op_two
      })
      let resultVideo = this.$store.state.stuCondition.moduleSchedule
      this.total1 = resultVideo.total
      try {
        this._modulePlanDis(resultVideo.list, false)
      } catch (error) {
        console.log(error)
      }
    },
    //搜索2
    async searchModuleClick2() {
      let uInfo = this.$route.query
      this.pageNumber2 = 1
      await this.fetchVideoSchedule({
        courseId: uInfo.courseId,
        sectionId: this.sectionIds,
        pointIds: this.model_op_one,
        userId: uInfo.userId,
        pageNumber: 1,
        pageSize: this.pageSize2,
        videoStatus: this.model_op_two
      })
      let resultVideo = this.$store.state.stuCondition.videoSchedule
      this.total2 = resultVideo.total
      try {
        this._videoPlanDis(resultVideo.list, false)
      } catch (error) {
        console.log(error)
      }
    },
    //点击视频进度
    async videoPlanClick(row) {
      this.isShowPopupTable2 = true
      let uInfo = this.$route.query
      let studyDetails = this.$store.state.stuCondition.studyDetails
      this.module_title2 =
        '视频进度' +
        '-' +
        row.knob_name +
        '-' +
        studyDetails.courseName +
        '-' +
        studyDetails.userName
      this.sectionIds = row.section_id
      this.pageNumber2 = 1
      this.pageSize2 = 10
      await this.fetchVideoSchedule({
        courseId: uInfo.courseId,
        sectionId: row.section_id,
        userId: uInfo.userId,
        pageNumber: 1,
        pageSize: 10
      })
      let videoResult = this.$store.state.stuCondition.videoSchedule
      this.total2 = videoResult.total
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
        if (isFirst) {
          Object.assign(videoData, {
            value: e.id,
            label: e.pointName
          })
        }
        Object.assign(newDate, {
          knowledge_name: e.pointName,
          video_status: e.videoStatus,
          video_total_time: e.totalSize,
          new_watch_date: e.watchTime,
          watch_total_time: e.watchSize,
          play_facility: e.watchDevice,
          play_num: e.watchCount
        })
        arr.push(newDate)
        if (isFirst) {
          arr1.push(videoData)
        }
      })
      this.moduleDaData2 = arr
      if (isFirst) {
        this.model_list_one2 = arr1
      }
    },
    //封装弹窗内方法=======================================================
    async modulePageChangeClick(page) {
      //弹窗pageNum更改
      let uInfo = this.$route.query
      this.pageNumber1 = page
      await this.fetchModuleSchedule({
        courseId: uInfo.courseId,
        moduleId: this.moduleId,
        userId: uInfo.userId,
        pageNumber: page,
        pageSize: this.pageSize1
      })
      let resultVideo = this.$store.state.stuCondition.moduleSchedule
      this.total1 = resultVideo.total
      try {
        this._modulePlanDis(resultVideo.list, false)
      } catch (error) {
        console.log(error)
      }
    },
    async modulePageSizeChangeClick(page) {
      //弹窗pageSize更改
      this.pageSize1 = page
      let uInfo = this.$route.query
      await this.fetchModuleSchedule({
        courseId: uInfo.courseId,
        moduleId: this.moduleId,
        userId: uInfo.userId,
        pageNumber: 1,
        pageSize: page
      })
      let resultVideo = this.$store.state.stuCondition.moduleSchedule
      this.total1 = resultVideo.total
      try {
        this._modulePlanDis(resultVideo.list, false)
      } catch (error) {
        console.log(error)
      }
    },
    // 清除刷新列表1
    async moduleClearClick() {
      let uInfo = this.$route.query
      this.pageNumber1 = 1
      await this.fetchModuleSchedule({
        courseId: uInfo.courseId,
        moduleId: this.moduleId,
        userId: uInfo.userId,
        pageNumber: 1,
        pageSize: this.pageSize1
      })
      let resultVideo = this.$store.state.stuCondition.moduleSchedule
      this.total1 = resultVideo.total
      try {
        this._modulePlanDis(resultVideo.list, false)
      } catch (error) {
        console.log(error)
      }
    },
    // 清除刷新列表2
    async moduleClearClick2() {
      let uInfo = this.$route.query
      this.pageNumber2 = 1
      await this.fetchVideoSchedule({
        courseId: uInfo.courseId,
        sectionId: this.sectionIds,
        userId: uInfo.userId,
        pageNumber: 1,
        pageSize: this.pageSize2
      })
      let videoResult = this.$store.state.stuCondition.videoSchedule
      this.total2 = videoResult.total
      try {
        this._videoPlanDis(videoResult.list, true)
      } catch (error) {
        console.log(error)
      }
    },
    closeModuleClick() {
      this.isShowPopupTable = false
    },
    closeModuleClick2() {
      this.isShowPopupTable2 = false
    },
    moduleSelectChange(data) {
      this.model_op_one = data
    },
    moduleSelectChangeTwo(data) {
      this.model_op_two = data
    },
    moduleSelectChange2(data) {
      this.model_op_one = data
    },
    moduleSelectChangeTwo2(data) {
      this.model_op_two = data
    },
    //弹窗2分页
    async modulePageChangeClick2(page) {
      //弹窗pageNum更改
      this.pageNumber2 = page
      let uInfo = this.$route.query
      await this.fetchVideoSchedule({
        courseId: uInfo.courseId,
        sectionId: this.sectionIds,
        userId: uInfo.userId,
        pageNumber: page,
        pageSize: this.pageSize2
      })
      let videoResult = this.$store.state.stuCondition.videoSchedule
      this.total2 = videoResult.total
      try {
        this._videoPlanDis(videoResult.list, true)
      } catch (error) {
        console.log(error)
      }
    },
    async modulePageSizeChangeClick2(page) {
      //弹窗pageSize更改
      this.pageSize2 = page
      let uInfo = this.$route.query
      await this.fetchVideoSchedule({
        courseId: uInfo.courseId,
        sectionId: this.sectionIds,
        userId: uInfo.userId,
        pageNumber: 1,
        pageSize: page
      })
      let videoResult = this.$store.state.stuCondition.videoSchedule
      this.total2 = videoResult.total
      try {
        this._videoPlanDis(videoResult.list, true)
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {
    this._initState()
  },
  mounted() {
    //获取table-height
    this.$nextTick(() => {
      let dom = document.getElementById('table-stage-list')
      this.baseHeight = util.baseHeight(dom, 82)
    })
  },
  computed: {
    ...mapState({
      classModule_list: state => state.stuCondition.classModule_list,
      videoSchedule: state => state.stuCondition.videoSchedule,
      moduleSchedule: state => state.stuCondition.moduleSchedule,
      phaseList: state => state.stuCondition.phaseId,
      modulesList: state => state.stuCondition.modulesList
    })
  }
}
</script>

<style lang="less" scoped>
.stu_class_module {
  /deep/ .ivu-select-dropdown {
    width: 100%;
  }

  .module_search {
    .module_col {
      margin-right: 10px;
    }
    //   width: 200px;
    //   float: 30%;
    //   display: flex;
    //   margin-top: 2px;
    //   span{
    //     display: block;
    //     width: 100px;
    //     line-height: 32px;
    //   }
    // }
    // .module_col+.module_col{
    //   margin-left: 10px;
    //   .selectSm{
    //     width: 100px;
    //   }
    // }
    // .module_colSm{
    //   width: 170px;
    //   margin-right: 10px;
    //   span{
    //     width: 140px;
    //     line-height: 32px;
    //   }
    // }
  }
  .module_table {
    margin-top: 20px;
  }
  // .module_page_box {
  //   margin-top: 10px;
  //   display: flex;
  //   justify-content: flex-end;
  // }
}
// .stu_class_module /deep/ .ivu-row{
//   display: flex;
//   justify-content: flex-end;
// }
// .stu_class_module /deep/ .ivu-btn-icon-only{
//   font-size: 18px;
//   margin-top: 2px;
//   height: 30px;
//   padding: 0 8px 0;
// }
//蓝色点击
.stu_class_module /deep/ .module_plan_blue {
  color: #2d8cf0;
  cursor: pointer;
}


.clearBtn {
  //   height: 30px;
  //   margin-top: 2px;
  margin-left: 10px;
}
</style>


