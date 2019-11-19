<template>
    <Modal
        title="添加学员"
        v-model="modal"
        class-name="vertical-center-modal"
        :mask-closable="false"
        @on-ok="asyncOK"
        :loading="loading"
        width="1000px"
        @on-cancel="cancel">
           <Row :gutter="16">
            <Col span="6">
                <Select placeholder="课程类型" v-model="query.courseType" :label-in-value="true" @on-change="val=>{getCourseType(val)}">
                    <Option value="0">就业课</Option>
                    <Option value="1">微课</Option>
                </Select>
            </Col>
            <Col span="6">
                <Select placeholder="课程ID" v-model="query.courseId" filterable>
                      <Option v-for="item in course" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select>
            </Col>
            <Col span="6">
                <Input v-model="query.userSearch" placeholder="请输入UID/账号/姓名"></Input>
            </Col>
             <Col span="6">
                 <Select placeholder="学籍" v-model="query.censusStatus">
                    <Option v-for="item in selectCensus" :value="item.value" :key="item.id">{{ item.label }}</Option>
                </Select>
            </Col>
        </Row>
        <Row :gutter="16" style="margin-top:15px;">
             <Col span="6">
                   <DatePicker v-model="dates" type="daterange" placeholder="报名时间" style="width:100%"></DatePicker>
            </Col>
            <Col span="6">
              <Select placeholder="学员类型" v-model="query.userType" filterable>
                <Option v-for="item in userTypeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="12" style="text-align: right;">
                <span @click="handleSearch"><Button type="primary" icon="md-search">搜索</Button></span>
                 <Button @click="handleClear">清除</Button>
            </Col>
        </Row>
        <Row :gutter="16" style="margin-top:20px;">
            <Col span="18">
                 <Table border :columns="columns" :data="notStudentObj.list"></Table>
                   <Page placement="top" style="margin-top:20px;text-align: right;" :total="notStudentObj.total" :page-size="query.pageSize" @on-change="handleCurrentChange" :current="notStudentObj.pageNum" show-total show-elevator @on-page-size-change="handlePageSize"></Page>
            </Col>
             <Col span="6">
                 <Card class="addul">
                      <p slot="title">已添加的学员</p>
                      <ul v-if="addList.length">
                          <li v-for="(item,index)  in addList" :key="index">
                              <p> {{item.realName}}</p>
                              <Button @click="deleteStudent(index)" class="delbtn" type="primary" size="small" shape="circle">删除</Button>
                          </li>
                      </ul>
                      <p style="text-align:center;" v-else>请添加学员</p>
                 </Card>
            </Col>
        </Row>
    </Modal>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import api from '@/api/index'
import dateUtil from 'iview/src/utils/date'
export default {
  props: {
    isFlag: Boolean
  },
  data() {
    return {
      modal: this.isFlag,
      loading: true,
      groupId: this.$route.query.groupId,
      menuId: this.$route.query.menuId,
      course: [],
      dates: [],
      query: {
        groupId: this.$route.query.groupId,
        courseType: '', //课程类型
        courseId: '', //课程ID
        userSearch: '', //请输入UID/账号/姓名
        censusStatus: '', //学籍状态
        startEntryTime: '',
        endEntryTime: '',
        userType: '',
        pageNumber: 1,
        pageSize: 5
      },
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
        }
      ],
      userTypeOption: [
        {
          value: 1,
          label: '内部开通'
        },
        {
          value: 2,
          label: '线下转线上'
        },
        {
          value: 3,
          label: '缴费用户'
        }
      ],
      columns: [
        {
          title: '序号',
          key: '',
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
          title: '课程类型',
          key: 'courseType',
          width: 100,
          render: (h, params) => {
            let text = ''
            if (params.row.courseType) {
              text = '微课'
            } else {
              text = '就业课'
            }
            return h(
              'span',
              {
                props: {}
              },
              text
            )
          }
        },
        {
          title: '课程名称',
          key: 'courseName',
          width: 100
        },
        {
          title: 'UID',
          key: 'itcastUUID',
          width: 100
        },
        {
          title: '姓名/昵称',
          key: '', //nickName
          width: 200,
          render: (h, params) => {
            return h(
              'span',
              {
                props: {}
              },
              `${params.row.realName}/${params.row.nickName}`
            )
          }
        },
        {
          title: '报名时间',
          key: 'enterTime',
          width: 100
        },
        {
          title: '学籍状态',
          key: 'censusStatus', //学籍状态：1在读、-1休学、8退费
          width: 100,
          render: (h, params) => {
            let text = ''
            if (params.row.censusStatus == 1) {
              text = '在读'
            } else if (params.row.censusStatus == -1) {
              text = '休学'
            } else {
              text = '退费'
            }
            return h(
              'span',
              {
                props: {}
              },
              text
            )
          }
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 100,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled: params.row.flag ? true : false
                  },
                  on: {
                    click: () => {
                      this.$set(
                        this.notStudentObj.list[params.index],
                        'flag',
                        true
                      )
                      this.$store.commit('addStudet', params.row)
                    }
                  }
                },
                '添加'
              )
            ])
          }
        }
      ]
    }
  },
  mounted() {
    this.getPageData()
    this.getCourses()
  },
  methods: {
    ...mapActions(['fecthWaitStudents']),
    getPageData(callback) {
      this.fecthWaitStudents(this.query).then(() => {
        callback && callback()
      })
    },
    async getCourseType(val) {
      if (val) {
        let result = await api.getCourses({
          type: Number(val.value),
          menuId: this.menuId
        })
        if (result.status === 200) {
          this.course = result.result
        }
      }
    },
    handleSearch() {
      this.query.pageNumber = 1
      let startEntryTime, endEntryTime
      this.dates.forEach((item, i) => {
        if (item) {
          if (i === 0) {
            this.query.startEntryTime = dateUtil.format(item, 'yyyy-MM-dd')
          } else {
            this.query.endEntryTime = dateUtil.format(item, 'yyyy-MM-dd')
          }
        }
      })
      this.getPageData(() => {
        if (this.addList.length) {
          for (let i = 0; i < this.notStudentObj.list.length; i++) {
            let item = this.notStudentObj.list[i]
            for (let j = 0; j < this.addList.length; j++) {
              let jitem = this.addList[j]
              if (jitem.stuCourseId === item.stuCourseId) {
                this.$set(item, 'flag', true)
                break
              } else {
                this.$set(item, 'flag', false)
              }
            }
          }
        }
      })
    },
    async getCourses() {
      let result = await api.getCourses({
        menuId: this.menuId
      })
      if (result.status === 200) {
        this.course = result.result
      }
    },
    handleCurrentChange(num) {
      this.query.pageNumber = num
      this.getPageData(() => {
        if (this.addList.length) {
          for (let i = 0; i < this.notStudentObj.list.length; i++) {
            let item = this.notStudentObj.list[i]
            for (let j = 0; j < this.addList.length; j++) {
              let jitem = this.addList[j]
              if (jitem.stuCourseId === item.stuCourseId) {
                this.$set(item, 'flag', true)
                break
              } else {
                this.$set(item, 'flag', false)
              }
            }
          }
        }
      })
    },
    handlePageSize(num) {
      this.query.pageNumber = 1
      this.query.pageSize = num
      this.getPageData()
    },
    deleteStudent(i) {
      this.addList.splice(i, 1)
      if (this.addList.length) {
        for (let i = 0; i < this.notStudentObj.list.length; i++) {
          let item = this.notStudentObj.list[i]
          for (let j = 0; j < this.addList.length; j++) {
            let jitem = this.addList[j]
            if (jitem.stuCourseId === item.stuCourseId) {
              this.$set(item, 'flag', true)
              break
            } else {
              this.$set(item, 'flag', false)
            }
          }
        }
      } else {
        for (let j = 0; j < this.notStudentObj.list.length; j++) {
          let jiten = this.notStudentObj.list[j]
          this.$set(this.notStudentObj.list[j], 'flag', false)
        }
      }
    },
    asyncOK() {
      setTimeout(async () => {
        this.loading = false
        if (!this.filterList) {
          this.$Message.warning('没有选择学员')
          this.$nextTick(() => {
            this.loading = true
          })
          return false
        }
        const params = {
          groupId: this.groupId,
          studentVos: this.filterList
        }
        let result = await api.postStudent(params)
        if (result.status === 200) {
          this.$Message.success('添加学员成功')
          this.addList.length = 0
          this.modal = false
          this.$emit('refreshList')
        } else {
          this.$Message.error(result.message)
        }
        this.$nextTick(() => {
          this.loading = true
        })
      }, 500)
    },
    handleClear() {
      this.query = {
        groupId: this.groupId,
        courseType: '', //课程类型
        courseId: '', //课程ID
        userSearch: '', //请输入UID/账号/姓名
        startEntryTime: '',
        endEntryTime: '',
        censusStatus: '', //学籍状态
        pageNumber: 1,
        pageSize: 5
      }
      this.dates = []
      this.$store.state.stuCondition.addList = []
      this.getPageData()
    },
    cancel() {
      this.handleClear()
    }
  },
  computed: {
    ...mapState({
      notStudentObj: state => state.stuCondition.notStudentObj,
      addList: state => state.stuCondition.addList
    }),
    filterList() {
      if (!this.addList.length) {
        return ''
      }
      let arr = []
      for (const key in this.addList) {
        let { courseId, userId, stuCourseId, itcastUUID } = this.addList[key]
        arr.push({
          courseId,
          userId,
          stuCourseId,
          itcastUUID
        })
      }
      return JSON.stringify(arr)
    }
  },
  watch: {
    isFlag(val) {
      this.modal = val
    },
    modal(val) {
      this.$emit('update:isFlag', val)
    }
  }
}
</script>

<style lang="less">
.addul {
  max-height: 280px;
  overflow: auto;
}
.addul li {
  list-style: none;
  overflow: hidden;
  padding: 4px 0;
  p {
    float: left;
  }
}
.delbtn {
  float: right;
}
</style>
