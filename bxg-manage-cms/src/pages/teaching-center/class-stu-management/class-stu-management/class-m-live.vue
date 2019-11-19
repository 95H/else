<template>
  <div class="dredge_class">
    <Row :gutter="10" open_module>
      <Form ref="searchParams" :model="searchData" :rules="searchRule" inline>
        <Col span="4">
          <FormItem prop="menuIds" style="width: 100%">
            <Select v-model="searchData.menuIds" placeholder="选择学科" :multiple="true" clearable @on-change="subjectChange">
              <Option
                :title="item.menuName"
                v-for="item in subjectListSe"
                :value="item.menuId"
                :key="item.menuId"
              >{{ item.menuName }}</Option>
            </Select>
          </FormItem>
        </Col>

        <Col span="4" class="row_bottom_10">
          <FormItem prop="courseIds" style="width: 100%">
            <Select v-model="searchData.courseIds" placeholder="选择课程" :multiple="true" :filterable="true">
              <Option
                v-for="item in courseListSe"
                :value="item.courseId"
                :key="item.courseId"
                :title="item.courseName"
              >{{ item.courseName }}</Option>
            </Select>
          </FormItem>
        </Col>

        <Col span="4">
          <FormItem prop="courseProgress" style="width: 100%">
            <Select v-model="searchData.courseProgress" placeholder="授课进度" :filterable="true">
              <Option
                v-for="item in SyllabusList"
                :value="item.value"
                :key="item.value"
                :title="item.label"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>

        <Col span="4">
          <FormItem prop="courseStatus" style="width: 100%">
            <Select v-model="searchData.courseStatus" placeholder="状态" :filterable="true">
              <Option
                v-for="item in typeList"
                :value="item.value"
                :key="item.value"
                :title="item.label"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>

        <Col span="4">
          <Button type="primary" i  ="ios-search" class="search" style="margin-left: 5px" @click="search">搜索</Button>
          <Button class="clear margin-left-10" @click="eliminate">清除</Button>
        </Col>
      </Form>
    </Row>
    <Row class="margin-top-20">
        <Table border :columns="table.tableColumns" :data="fetchList.list" height="580" :loading="tloading"></Table>
    </Row>
    <Row class="margin-top-20">
      <Page placement="top" style="text-align: right;padding-bottom: 1px"
            :total="fetchList.total"
            :page-size="fetchList.pageSize"
            :page-size-opts="arrPage"
            @on-change="handleCurrentChange"
            @on-page-size-change="handlePageSize"
            :current="fetchList.pageNum"
            :transfer="true"
            show-total show-elevator show-sizer>
      </Page>
    </Row>
    <Modal
      v-model="courseSchedule.modal"
      :title="courseSchedule.title"
      :footer-hide="false"
      :mask-closable="false"
    >
      <Table ref="table" border :columns="courseSchedule.tableColumns" :data="courseSchedule.tableData" :loading="tloading"></Table>
    </Modal>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import api from '@/api/index'
  import util from "@/util/util.js";
  import courseScheduleTepl from './modal-expandRow/course-schedule-tepl'
  import dayjs from 'dayjs'

  export default {
    components: {
      courseScheduleTepl
    },
    data() {
      const hasjindu = this.hasSomeApiAccess('teaching_courses_students_lives_courses_modules_processes')
      const haschakan = this.hasSomeApiAccess('teaching_courses_students_lives_courses_students')

      return {
        tloading: false,
        arrPage: [10, 20, 30, 40, 100, 200],

        subjectListSe: [],
        courseListSe: [],
        SyllabusList: [
          {
            value: '1',
            label: '未开始'
          },
          {
            value: '2',
            label: '进行中'
          },
          {
            value: '3',
            label: '已结束'
          }
        ],
        typeList: [
          {
            value: '0',
            label: '已下架'
          },
          {
            value: '1',
            label: '已启用'
          },
          {
            value: '2',
            label: '未启用'
          }
        ],
        searchData: {
          courseStatus: '',
          menuIds: [],
          courseIds: [],
          courseProgress: '',
          courseType: '2',
          pageNum: 1,
          pageSize: 10
        },
        searchRule: {
          menuIds: [],
          courseIds: [],
          courseProgress: [],
          courseStatus: [],
          btn: []
        },
        table: {
          tableColumns: [
            {
              title: '序号',
              width: 60,
              align: 'center',
              render: (h, params) => {
                return h(
                  'span',
                  params.index + (this.searchData.pageNum - 1) * this.searchData.pageSize + 1
                )
              }
            },
            {
              title: '课程ID',
              key: 'courseId',
              width: 80,
              align: 'right'
            },
            {
              title: '学科',
              key: 'menuName',
              width: 120,
              align: 'left'
            },
            {
              title: '课程名称',
              key: 'courseName',
              width: 160,
              align: 'left',
              render: (h, params) => {
                let courseName = params.row.courseName
                return <span class="filed-column" domPropsTitle={courseName}>{courseName}</span>
              }
            },
            {
              title: "授课老师",
              key: 'lecturerName',
              width: 160,
              align: 'left',
              render: (h, params) => {
                let lecturerName = params.row.lecturerName
                return <span class="filed-column" domPropsTitle={lecturerName}>{lecturerName}</span>
              }
            },
            {
              title: '上课时间',
              key: 'attendClassTime',
              width: 186,
              align: 'right'
            },
            {
              title: '原价/现价（元）',
              key: 'currentPrice',
              width: 150,
              align: 'right',
              render: (h, params) => {
                return h('div', [
                  h('span',
                    `${params.row.originalCost}/${params.row.currentPrice}`
                  )
                ])
              }
            },
            {
              title: '创建人',
              key: 'createPerson',
              width: 120,
              align: 'left'
            },
            {
              title: '创建时间',
              width: 140,
              align: 'right',
              render: (h, params) => {
                return h('div', [
                  h('span',
                    util.disposeTime(params.row.createTime, 'yyyy-MM-dd hh:mm')
                  )
                ])
              }
            },
            {
              title: '报名人数',
              key: 'learnsCount',
              width: 90,
              align: 'right'
            },
            {
              title: '授课进度',
              key: 'courseProgress',
              width: 150,
              align: 'left',
              render: (h, params) => {
                let btn
                
                if (hasjindu) {
                  btn = h('span', {
                      on: {
                        click: () => {
                          this.courseScheduleClick(params.row);
                        }
                      },
                      style: {
                        'color': '#2d8cf0',
                        'cursor': 'pointer',
                        'margin-left': '5px'
                      }
                    },
                    params.row.liveCourseStatus === 2 ? params.row.courseProgress : ''
                  )
                } else {
                  btn = h('span', {
                      style: {
                        'color': '#000',
                        'margin-left': '5px'
                      }
                    },
                    params.row.liveCourseStatus === 2 ? params.row.courseProgress : ''
                  )
                }

                return h('div', [
                  h('span',
                    params.row.liveCourseStatus === 1 ? '未开始' :
                      (params.row.liveCourseStatus === 2 ? '进行中' : '已结束')
                  ),
                  btn
                ])
              }
            },
            {
              title: '状态',
              width: 80,
              align: 'left',
              render: (h, params) => {
                return h('div', [
                  h('span',
                    params.row.courseStatus === 0 ? '已下架' :
                      (params.row.courseStatus === 1 ? '已启用' : '未启用')
                  )
                ])
              }
            },
            {
              title: '操作',
              key: 'action',
              fixed: 'right',
              width: 100,
              render: (h, params) => {
                let viewBtn = null
                if (haschakan) {
                  viewBtn = h(
                    'Button',
                    {
                      props: {
                        type: 'primary',
                        size: 'small'
                      },
                      style: {
                        marginRight: '10px'
                      },
                      on: {
                        click: () => {
                          this.$router.push({
                            name: "see-students",
                            query: { courseId: params.row.courseId }
                          });
                        }
                      }
                    },
                    '查看学员'
                  )
                }

                return h('div', [
                  viewBtn
                ])
              }
            }
          ]
        },
        courseSchedule: {
          modal: false,
          title: ``,
          tableColumns: [
            {
              title: '模块名称',
              key: 'moduleName',
              width: 250,
              align: 'left'
            },
            {
              title: '课程进度',
              key: 'moduleStatus',
              width: 140,
              align: 'left'
            },
            {
              title: '操作',
              key: 'action',
              type: 'expand',
              fixed: 'right',
              width: 100,
              render: (h, params) => {
                return h(courseScheduleTepl, {
                  props: {
                    row: params.row.liveBroadcastPlanVo
                  }
                })
              }
            }
          ],
          tableData: []
        }
      }
    },

    mounted() {
      this.fetchListData({
        courseType: this.searchData.courseType,
        pageNum: this.searchData.pageNum,
        pageSize: this.searchData.pageSize
      })

      this.ferchSubjectList({
        mark: 2
      });
      this.ferchCoursesList({
        mark: 2,
        courseType: '2'
      });
    },
    methods: {
      ...mapActions([
        "getLiveList" //table列表
      ]),
      async ferchSubjectList(params) { //获取学科
        await api.getSubjectList(params).then(
          (result) => {
            this.subjectListSe = result.result;
          });
      },
      async ferchCoursesList(params) { //获取课程
        await api.getCourseList(params).then(
          (result) => {
            this.courseListSe = result.result;
          });
      },
      async fetchListData(params) {
        if (this.tloading) {
          return
        }
        this.tlaoding = true
        await this.getLiveList(params);
        this.tloading = false
      },
      subjectChange(val) {
        this.ferchCoursesList({
          menuIds: val.length ? val.join(',') : null,
          courseType: '2',
          mark: 2
        })
      },
      async fetchliveCourseModuleList(params) {
        let self = this

        await api.getliveCourseModuleList({
          courseId: params.courseId
        }).then(data => {
          let result = data.result
          this.courseSchedule.tableData = result
          return result
        }).then((liveModules) => {
          if (!liveModules.length) {
            return
          }
          
          let smallest = { startTime: Infinity, status: 1 } 
          let expandIndexList = []
          
          liveModules.forEach((liveModule, index) => {
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
            }, 0)
          }
        })
      },
      courseScheduleClick(params) {
        this.courseSchedule.title = `授课进度（课程名称：${params.courseName}）`;
        this.courseSchedule.modal = true;
        this.fetchliveCourseModuleList(params);
      },
      search() {
        this.searchData.pageNum = 1;
        let params = { ...this.searchData };
        params.menuIds = params.menuIds.join(',');
        params.courseIds = params.courseIds.join(',');
        this.fetchListData(params);
      },
      eliminate() {
        this.searchData.pageNum = 1;
        this.$refs.searchParams.resetFields();
        let params = { ...this.searchData };
        params.menuIds = params.menuIds.join(',');
        params.courseIds = params.courseIds.join(',');
        this.fetchListData(params);
      },
      handleCurrentChange(num) {
        this.searchData.pageNum = num;
        let params = { ...this.searchData };
        params.menuIds = params.menuIds.join(',');
        params.courseIds = params.courseIds.join(',');
        this.fetchListData(params);
      },
      handlePageSize(size) {
        this.searchData.pageSize = size;
        this.searchData.pageNum = 1
        let params = { ...this.searchData };
        params.menuIds = params.menuIds.join(',');
        params.courseIds = params.courseIds.join(',');
        this.fetchListData(params);
      }
    },
    computed: {
      ...mapState({
        fetchList: state => state.classStuManagement.liveCourse
      })
    }
  }
</script>

<style lang="less">
.dredge_class {
  .ivu-table {
    .filed-column {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
<style lang="less" scoped>
  div /deep/ .lookOverWarp .lookOver {
    color: #2d8cf0;
    cursor: pointer;
    margin-left: 5px;
  }
  div /deep/ .lookOverWarp .lookOver:hover {
    color: #57a3f3;
  }
  .open_module /deep/ ul.ivu-select-dropdown-list, .dredge_class /deep/ ul.ivu-select-dropdown-list{
    max-width: 100px;
    li {
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
  }
</style>
