<template>
      <div>
        <Row :gutter="10">
            <Col span="6">
                <Input v-model="query.courseName" placeholder="输入课程名称" />
            </Col>
            <Col span="6">
                <Select placeholder="请选择课程类型" v-model="query.courseType" clearable>
                    <Option value="0">就业课</Option>
                    <Option value="1">微课</Option>
                    <Option value="2">直播课</Option>
                </Select>
            </Col>
            <Col span="6">
                <Select placeholder="请选择学籍状态" v-model="query.status" clearable>
                  <Option value="-1">休学</Option>
                  <Option value="1">在读</Option>
                  <Option value="8">退费</Option>
                </Select>
            </Col>
            <Col span="6">
                <Button type="primary" @click="handleSearch" icon="md-search" style="margin-right:6px;">搜索</Button>
                <Button @click="handleClear">清除</Button>
            </Col>
        </Row>
        <Row style="margin-top:20px;" id="table-stage-list">
            <Col span="24">
                <Table border :height="baseHeight" :columns="columns" :data="courses.list"></Table>
            </Col>
            <Col style="margin-top:20px; margin-bottom:4px; text-align: right;" span="24">
                  <Page placement="top" :total="courses.total" :page-size="query.pageSize" @on-change="handleCurrentChange" :current="courses.pageNum" show-total show-elevator show-sizer @on-page-size-change="handlePageSize"></Page>
            </Col>
       </Row>
       <update-time ref="updatetime" @refreshList="handleRefresh"></update-time>
       <rest-study ref="reststudy" @refreshList="handleRefresh"></rest-study>
       <refund-mod ref="refund" @refreshList="handleRefresh"></refund-mod>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import updateTime from './modal/xgsj-modal'
import restStudy from './modal/reststudy-modal'
import refundMod from './modal/refund-modal'
import api from '@/api/index'
import util from '@/util/util'
export default {
  name: 'classroom',
  props: {
    from: String
  },
  components: {
    updateTime,
    restStudy,
    refundMod
  },
  data() {
    const from = this.from
    let hasxiangqing
    let hasxiugai
    let hasxiuxue
    let hasguanbi

    if (from == 'learning-manage-mentor_my-students') {
      hasxiangqing = this.hasSomeApiAccess('teaching_students_process_mentors_students_cards_courses_details_learning_details')
      hasxiugai = this.hasSomeApiAccess('teaching_students_process_mentors_students_cards_courses_details_postpones_patch')
      hasxiuxue = this.hasSomeApiAccess('teaching_students_process_mentors_students_cards_courses_details_suspension_patch')
      hasguanbi = this.hasSomeApiAccess('teaching_students_process_mentors_students_cards_courses_details_close_patch')
    } else if (from == 'learning-manage-headteacher_my-students') {
      hasxiangqing = this.hasSomeApiAccess('teaching_students_process_teachers_students_cards_courses_details_learning_details')
      hasxiugai = this.hasSomeApiAccess('teaching_students_process_teachers_students_cards_courses_details_postpones_patch')
      hasxiuxue = this.hasSomeApiAccess('teaching_students_process_teachers_students_cards_courses_details_suspension_patch')
      hasguanbi = this.hasSomeApiAccess('teaching_students_process_teachers_students_cards_courses_details_close_patch')
    } else if (from == 'learning-manage-mentor_stage-of_mentor-students-list') {
      hasxiangqing = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_cards_courses_details_learning_details')
      hasxiugai = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_cards_courses_details_service_time_patch')
      hasxiuxue = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_cards_courses_details_suspension_patch')
      hasguanbi = this.hasSomeApiAccess('teaching_students_process_mentors_groups_students_cards_courses_details_close_patch')
    } else if (from == 'learning-manage-headteacher_stage-of_teacher-students-list') {
      hasxiangqing = this.hasSomeApiAccess('teaching_students_process_teachers_groups_students_cards_courses_details_learning_details')
      hasxiugai = this.hasSomeApiAccess('teaching_students_process_teachers_groups_students_cards_courses_details_service_time_patch')
      hasxiuxue = this.hasSomeApiAccess('teaching_students_process_teachers_groups_students_cards_courses_details_suspension_patch')
      hasguanbi = this.hasSomeApiAccess('teaching_students_process_teachers_groups_students_cards_courses_details_close_patch')
    } else if (from == 'learning-manage-stat_student-list') {
      hasxiangqing = this.hasSomeApiAccess('teaching_students_process_data_cards_courses_details')
      hasxiugai = this.hasSomeApiAccess('teaching_students_process_data_cards_courses_service_time_patch')
      hasxiuxue = this.hasSomeApiAccess('teaching_students_process_data_cards_courses_suspension_patch')
      hasguanbi = this.hasSomeApiAccess('teaching_students_process_data_cards_courses_refund_patch')
    } else if (from == 'learning-manage-stat_stage-of_student-list') {
      hasxiangqing = this.hasSomeApiAccess('teaching_students_process_data_groups_students_cards_courses_details_learning_details')
      hasxiugai = this.hasSomeApiAccess('teaching_students_process_data_groups_students_cards_courses_details_service_time_patch')
      hasxiuxue = this.hasSomeApiAccess('teaching_students_process_data_groups_students_cards_courses_details_suspension_patch')
      hasguanbi = this.hasSomeApiAccess('teaching_students_process_data_groups_students_cards_courses_details_close_patch')
    } else if (from == 'student-management'
      || from == 'sales-manage_order-manage'
      || from == 'sales-manage_dredge-class'
      || from == 'sales-manage_back-tracking-order'
      || from == 'finance-manage_back-tracking-pay'
      || from == 'finance-manage_back-tracking-check'
      ) {
      hasxiangqing = this.hasSomeApiAccess('users_students_cards_courses_details')
      hasxiugai = this.hasSomeApiAccess('users_students_cards_courses_service_time_patch')
      hasxiuxue = this.hasSomeApiAccess('users_students_cards_courses_suspension_patch')
      hasguanbi = this.hasSomeApiAccess('users_students_cards_courses_refund_patch')
    }

    return {
      baseHeight: 0,
      query: {
        userId: this.$route.query.userId || '',
        courseName: '',
        courseType: '',
        status: '',
        pageNumber: 1,
        pageSize: 10
      },

      columns: [
        {
          title: '序号',
          type: '',
          align: 'center',
          width: 60,
          render: (h, params) => {
            return h(
              'span',
              params.index +
                (this.query.pageNumber - 1) * this.query.pageSize +
                1
            )
          }
        },
        {
          title: '课程名称',
          key: 'courseName',
          width: 200
        },
        {
          title: '课程类型',
          key: 'courseType',
          width: 100,
          render: (h, params) => {
            let str;
            if(params.row.courseType === 0){
              str='就业课'
            }else if(params.row.courseType === 1){
              str='微课'
            }else{
              str='直播课'
            }
            return h(
              'span',
              {
                props: {}
              },
              str
            )
          }
        },
        {
          title: '学费',
          key: 'realCost',
          align: 'right',
          width: 100
        },
        {
          title: '服务开始时间',
          key: 'effectiveDate',
          width: 120
        },
        {
          title: '服务截止时间',
          key: 'serviceExpires',
          align: 'right',
          width: 120
        },
        {
          title: '剩余服务天数',
          key: 'remainingDays',
          align: 'right',
          width: 120
        },
        {
          title: '服务期总天数',
          key: 'serviceDays',
          align: 'right',
          width: 120
        },
        {
          title: '学习天数',
          key: 'learnedDays',
          key2:"courseType",
          align: 'right',
          width: 100,
          render: (h, params) => {
            let learnedDays = params.row.learnedDays;
            // let type=params.row.courseType;
            // if(type==2){
            //   str='--'
            // }
            return h(
              'span',
              learnedDays
            )
          }
        },
        {
          title: '整体进度',
          key: 'totalProgress',
          key2:"courseType",
          align: 'right',
          width: 100,
          render: (h, params) => {
            let str=params.row.totalProgress;
            let type=params.row.courseType;
            if(type==2){
              str='--'
            }
            return h(
              'span',
              str
            )
          }
        },
        {
          title: '当前学习位置(模块：已完成/总节)',
          key: 'currentLearnPosition',
          key2:"courseType",
          width: 250,
          render: (h, params) => {
            let str=params.row.currentLearnPosition;
            let type=params.row.courseType;
            if(type==2){
              str='--'
            }
            return h(
              'span',
              str
            )
          }
        },
        {
          title: '学籍状态',
          key: 'status',
          align: 'center',
          width: 100,
          render: (h, params) => {
            if (params.row.status == 1) {
              return h('span', '在读')
            } else if (params.row.status == -1) {
              //text = '休学' + '<span style="red">11</span>'
              if (params.row.alreadySuspendDays > params.row.suspendDays) {
                return (
                  <p>
                    <span>休学</span>
                    <span style="color:red">
                      ({params.row.alreadySuspendDays})
                    </span>
                  </p>
                )
              } else {
                return (
                  <p>
                    <span>休学</span>
                    <span>({params.row.alreadySuspendDays})</span>
                  </p>
                )
              }
            } else if (params.row.status == 2) {
              return h('span', '--');
            } else {
              return h('span', '退费')
            }
          }
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 340,
          render: (h, params) => {
            let xiangqingBtn = null
            let xiugaiBtn = null
            let jieshuxiuxueBtn = null
            let xiuxueBtn = null
            let guanbiBtn = null

            if (hasxiangqing) {
              xiangqingBtn =  h(
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
                        name: 'stuinfo_detail',
                        query: {
                          courseId: params.row.courseId,
                          userId: this.userId,
                          stuCourseId: params.row.id,
                          courseType: params.row.courseType,
                          from: 'learning-manage-stat_student-info'
                        }
                      })
                    }
                  }
                },
                '学习详情'
              )
            }

            if (hasxiugai) {
              xiugaiBtn = h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled:
                      params.row.status == 8 ||
                      (params.row.courseType == 1 && params.row.isFree == 1) ||
                      params.row.status == -1 ||
                      (params.row.serviceExpires == null || params.row.remainingDays == '')
                        ? true
                        : false
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.$refs.updatetime.modal = true
                      this.$refs.updatetime.effectiveDate =
                        params.row.effectiveDate
                      this.$refs.updatetime.remainingDays =
                        params.row.remainingDays
                      this.$refs.updatetime.totalProgress =
                        params.row.totalProgress
                      this.$refs.updatetime.courseName = params.row.courseName
                      this.$refs.updatetime.formValidate.stuCourseId =
                        params.row.id
                      this.$refs.updatetime.formValidate.applyExpires =
                        params.row.serviceExpires
                      this.$refs.updatetime.formValidate.originalExpires =
                        params.row.serviceExpires
                    }
                  }
                },
                '修改服务时间'
              )
            }

            if (hasxiuxue) {
              jieshuxiuxueBtn = h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '10px',
                    display: params.row.status == -1 ? '' : 'none'
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: '结束休学',
                        content: '<p>您确定要结束休学吗？</p>',
                        loading: true,
                        onOk: () => {
                          setTimeout(async () => {
                            let result = await api.suspensionsOver({
                              stuCourseId: params.row.id,
                              desc: `结束休学（${params.row.courseName}）`
                            })
                            if (result.status === 200) {
                              this.$Message.success('结束休学操作成功')
                              this.handleRefresh()
                            } else {
                              this.$Message.error(result.message)
                            }
                            this.$Modal.remove()
                          }, 2000)
                        }
                      })
                    }
                  }
                },
                '结束休学'
              )
            }

            if (hasxiuxue) {
              xiuxueBtn = h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled:
                      params.row.status == 8 ||
                      // 0就业课，1微课, 2直播课
                      params.row.courseType == 2 ||
                      params.row.courseType == 1 ||
                      (params.row.effectiveDate == null || params.row.serviceExpires == null || params.row.remainingDays == '')
                        ? true
                        : false
                  },
                  style: {
                    marginRight: '10px',
                    display: params.row.status > -1 ? '' : 'none'
                  },
                  on: {
                    click: () => {
                      this.$refs.reststudy.modal = true
                      this.$refs.reststudy.courseName = params.row.courseName
                      this.$refs.reststudy.formValidate.stuCourseId =
                        params.row.id
                      this.$refs.reststudy.formValidate.originalExpires =
                        params.row.serviceExpires
                    }
                  }
                },
                '休学'
              )
            }

            if (hasguanbi) {
              guanbiBtn =  h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                    // disabled:
                    //   params.row.realCost == 0 || params.row.isFree == 1
                    //     ? true
                    //     : false
                  },
                  style: {
                    display: params.row.status != 8 ? '' : 'none'
                  },
                  on: {
                    click: () => {
                      this.$refs.refund.modal = true
                      this.$refs.refund.courseName = params.row.courseName
                      this.$refs.refund.originalExpires =
                        params.row.serviceExpires
                      this.$refs.refund.formValidate.stuCourseId = params.row.id
                      this.$refs.refund.formValidate.orderId =
                        params.row.orderId
                    }
                  }
                },
                '关闭'
              )
            }
            return h('div', [
              xiangqingBtn,
              xiugaiBtn,
              jieshuxiuxueBtn,
              xiuxueBtn,
              guanbiBtn,
              hasguanbi && h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled: true
                  },
                  style: {
                    display: params.row.status == 8 ? '' : 'none'
                  }
                },
                '已关闭'
              )
            ])
          }
        }
      ]
    }
  },
  mounted() {
    this.handleRefresh()
    //获取table-height
    this.$nextTick(()=> {
      let dom = document.getElementById("table-stage-list");
      this.baseHeight = util.baseHeight(dom, 82);
    })
  },
  methods: {
    ...mapActions(['fetchCoursesPage']),
    filterObj() {
      let query = Object.assign({}, this.query)
      for (const key in query) {
        if (!query[key]) {
          delete query[key]
        }
      }
      return query
    },
    handleRefresh() {
      this.fetchCoursesPage(this.filterObj())
      this.userId = this.query.userId
    },
    handleSearch() {
      this.query.pageNumber = 1
      this.fetchCoursesPage(this.filterObj())
    },
    handleClear() {
      this.query = {
        userId: this.userId,
        courseName: '',
        courseType: '',
        status: '',
        pageNumber: 1,
        pageSize: 10
      }
      this.fetchCoursesPage(this.filterObj())
    },
    handlePageSize(num) {
      this.query.pageNumber = 1
      this.query.pageSize = num
      this.fetchCoursesPage(this.filterObj())
    },
    handleCurrentChange(num) {
      this.query.pageNumber = num
      this.fetchCoursesPage(this.filterObj())
    }
  },
  computed: {
    ...mapState({
      courses: state => state.learningCenter.courses
    })
  }
}
</script>

<style>
</style>
