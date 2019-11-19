<template>
  <div class="class-module">
    <div class="search_box">
      <Row :gutter="10" type="flex" justify="end">
        <Col span="16">
          <Form ref="form" class="form_box" :model="formSearch" :label-width="80">
            <Col span="8">
              <FormItem prop="phaseId">
                <Select
                  v-model="formSearch.phaseId"
                  placeholder="阶段名称"
                  @on-change="getModule"
                  clearable
                >
                  <Option
                    v-for="item in phaseList"
                    :value="item.phaseId"
                    :key="item.phaseId"
                  >{{ item.phaseName }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem prop="moduleId">
                <Select
                  v-model="formSearch.moduleId"
                  placeholder="模块名称"
                  clearable
                  @on-open-change="getModule(1)"
                >
                  <Option
                    v-for="item in moduleNameList"
                    :value="item.moduleId"
                    :key="item.moduleId"
                  >{{ item.moduleName }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem prop="moduleStatus">
                <Select v-model="formSearch.moduleStatus" placeholder="模块状态">
                  <Option :value="1">未开始</Option>
                  <Option :value="2">进行中</Option>
                  <Option :value="3">已结束</Option>
                </Select>
              </FormItem>
            </Col>
          </Form>
        </Col>
        <div class="btn_box">
          <Col span="13">
            <Button type="primary" icon="ios-search" class="search" @click="searchClick">搜索</Button>
          </Col>
          <Col span="2">
            <Button class="clear" @click="clearClick">清除</Button>
          </Col>
        </div>
      </Row>
    </div>
    <Table ref="table" :columns="cm_columns" :data="cm_data" border :loading="tableLoading" height="520"></Table>
  </div>
</template>

<script>
import api from '@/api'
import dayjs from 'dayjs'
import _ from 'lodash'
import expandRow from './table-expand'
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  components: { expandRow },
  data() {
    let courseId = String(this.$route.query.courseId)
    let stuCourseId = String(this.$route.query.stuCourseId)
    return {
      tableLoading: false,
      phaseList: null,
      moduleNameList: null,
      formSearch: {
        phaseId: '',
        moduleId: '',
        moduleStatus: ''
      },
      // 分页信息
      pageInfo: {
        // 当前页码
        pageNumber: 1,
        // 数据总条数
        total: 0,
        // 每页条数
        pageSize: 10
      },
      list: null,
      obj: { courseId: courseId },
      stuCourseId: { stuCourseId: stuCourseId },
      cm_columns: [
        {
          title: '模块名称',
          key: 'moduleName',
          ellipsis: true,
          render: (h, params) => {
            return h(
              'span',
              {
                domProps: {
                  title: params.row.moduleName
                }
              },
              params.row.moduleName ? params.row.moduleName : '--'
            )
          }
        },
        {
          title: '模块状态',
          key: 'moduleStatus'
        },
        {
          title: '所属阶段',
          key: 'phaseName',
          ellipsis: true,
          render: (h, params) => {
            return h(
              'span',
              {
                domProps: {
                  title: params.row.phaseName
                }
              },
              params.row.phaseName ? params.row.phaseName : '--'
            )
          }
        },
        {
          title: '直播上课情况',
          key: 'learnsProgress',
          render: (h, params) => {
            return h(
              'span',
              params.row.learnsProgress ? params.row.learnsProgress : '--'
            )
          }
        },
        {
          title: '回放观看时长（分钟）',
          key: 'allPlaybackViewTime',
          align: 'right'
        },
        {
          title: '实际学习进度',
          key: 'learnsProgress',
          align: 'right',
          render: (h, params) => {
            return h('span', '--')
          }
        },
        {
          title: '操作',
          type: 'expand',
          width: 100,
          align: 'center',
          render: (h, params) => {
            let liveBroadcastPlanVo = params.row.liveBroadcastPlanVo

            return h(expandRow, {
              props: {
                expandList: params.row.liveBroadcastPlanVo
              }
            })
          }
        }
      ],
      cm_data: [
        {
          moduleName: 'go语言类型',
          moduleStatus: '已完成',
          moduleStage: '阶段一（1/2）',
          liveClass: '3/3',
          liveName: '服务器的搭建及日常操作命令（120分钟）',
          liveOnlineTimeStr: '直播学习(直播在线时长96分钟)',
          playbackViewTimeStr: '回放观看进度40%'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      //阶段名称
      phaseId: state => state.stuCondition.phaseId,
      //模块名称
      modulesList: state => state.stuCondition.modulesList
    })
  },
  created() {
    this.getPhaseWork(this.obj)
    //this.getModule(this.obj)
    this.getModuleLiveList()
  },
  methods: {
    async getModuleLiveList() {
      this.tableLoading = true
      let uInfo = this.$route.query
      this.stuCourseId = { stuCourseId: uInfo.stuCourseId }
      
      let formSearch = _.pickBy(this.formSearch, function(value, key) {
        return value !== ''
      })

      let data = await api.getModuleLiveList({
        ...formSearch,
        ...this.pageInfo,
        ...this.stuCourseId
      })
      this.tableLoading = false
      
      if (data.status === 200) {
        let self = this
        let tableData = data.result
        this.cm_data = tableData

        if (!tableData.length) {
          return
        }

        let smallest = { startTime: Infinity, status: 1 } 
        let expandIndexList = []

        tableData.forEach((liveModule, index) => {
          let livePlanList = liveModule.liveBroadcastPlanVo
          
          livePlanList.forEach((livePlan) => {
            // 直播计划未开始 liveCourseStatus = 1
            // 直播计划进行中 liveCourseStatus = 2
            if (livePlan.startTime && (livePlan.liveCourseStatus == 2) || (livePlan.liveCourseStatus == 1 && smallest.status == 1)) {
              let t = dayjs(livePlan.startTime).unix()

              if (t < smallest.startTime) {
                smallest.startTime = t
                smallest.status = livePlan.liveCourseStatus
                expandIndexList = [ index ]
              } else if (t == smallest) {
                expandIndexList.push(index)
              }
            }
          })
        })
        
        if (expandIndexList.length) {
          setTimeout(function() {
            let table = self.$refs.table
            expandIndexList.forEach(expandIndex => {
              table.toggleExpand(expandIndex)
            })
          }, 300)
        }
      }
    },
    ...mapActions([
      // 查询课程下的阶段列表
      'fetchClassPhaseWork',
      // 查询课程及阶段下课程模块列表
      'fetchModulesList'
    ]),
    async getPhaseWork(obj) {
      await this.fetchClassPhaseWork(obj)
      this.phaseList = this.phaseId
    },
    async getModule(data) {
      if (data == 1) {
        this.obj.phaseIds = null
        if (this.formSearch.phaseId) {
          return
        }
      } else {
        this.obj.phaseIds = this.formSearch.phaseId
        this.formSearch.moduleId = ''
        if (!this.formSearch.phaseId) {
          this.moduleNameList = []
          return
        }
      }
      await this.fetchModulesList(this.obj)
      this.moduleNameList = this.modulesList
    },
    searchClick() {
      this.getModuleLiveList()
    },
    clearClick() {
      this.formSearch = {
        phaseId: '',
        moduleId: '',
        moduleStatus: ''
      }
      this.pageInfo.pageNumber = 1
      this.getModuleLiveList()
    }
  }
}
</script>

<style scoped lang="less">
.class-module /deep/ .ivu-form-item-content {
  margin-left: 10px !important;
}
.page_box {
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-end;
}
.ivu-form-item {
  margin-bottom: 20px;
}
</style>
