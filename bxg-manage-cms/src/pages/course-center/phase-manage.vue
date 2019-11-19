<template>
  <div class="phase-manage" key="okok">
    <Row>
      <Col span="24">
        <Card>
          <Row :gutter="10" type="flex">
            <Col>
              <Button type="primary" v-if="hasSomeApiAccess('courses_stages_post')" @click="createPhaseHandler">
                <Icon type="md-add" />新建学习阶段
              </Button>
            </Col>
            <Col span="6">
              <Input placeholder="请输入阶段名称" v-model="searchInfo.phaseName" />
            </Col>
            <Col span="5">
              <Select placeholder="请选择学科" v-model="searchInfo.subjectId" clearable>
                <Option :title="item.menuName" v-for="item in subjectList" :value="item.menuId" :key="item.menuId">{{ item.menuName }}</Option>
              </Select>
            </Col>
            <Col span="5">
              <Select placeholder="请选择状态" v-model="searchInfo.status" clearable>
                <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
            <Col span="4">
              <Button type="primary" icon="md-search" style="margin-right: 5px;" @click="searchHandler">搜索</Button>
              <Button @click="clearSearchHandler">清除</Button>
            </Col>
          </Row>
          <Row class="row" style="margin-top:20px;" id="table-stage-list">
            <Col span="24">
              <Table border :height="baseHeight" :loading="phaseInfo.loading" :columns="phaseInfo.columns" :data="phaseInfo.phaseList"></Table>
            </Col>
          </Row>
          <Row>
            <Col span="24">
               <Page placement="top" show-total show-elevator show-sizer :page-size-opts="[10, 20, 30, 40, 100, 200]" style="text-align: right;" :current="pageInfo.current" :total="pageInfo.total" @on-change="changeCurrentPage" @on-page-size-change="changePageSize"></Page>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>

    <CreationModal :isShowModal.sync="isShowCreationModal" :subjectList="subjectList" @createSuccess="createSuccess" />
    <UpdationModal :isShowModal.sync="isShowUpdationModal" :phaseItem="phaseItemData" />

  </div>
</template>

<script>
import api from '@/api'
import util from '@/util/util'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import CreationModal from './phase-creation-modal'
import UpdationModal from './phase-updation-modal'
import confirmModal from './confirm-modal'

export default {
  name: 'phase-manage',

  components: {
    CreationModal,
    UpdationModal
  },

  data() {
    const self = this

    const hasqijinyong = this.hasSomeApiAccess('courses_stages_status_patch')
    const hasxiugai = this.hasSomeApiAccess('courses_stages_patch')
    const hasshangxiayi = this.hasSomeApiAccess('courses_stages_sort_post')
    const hasshanchu = this.hasSomeApiAccess('courses_stages_delete')
    const hasrenwuguanli = this.hasSomeApiAccess('courses_stages_tasks')

    return {
      baseHeight: 0,
      isShowCreationModal: false,
      isShowUpdationModal: false,
      phaseItemData: {},

      statusList: [
        { value: 0, label: '禁用' },
        { value: 1, label: '启用' }
      ],

      // 学习阶段信息
      phaseInfo: {
        loading: false,
        // 学习阶段列表
        phaseList: [],

        // 表格的配置数据
        columns: [
          {
            title: "序号",
            key: "id",
            align: "center",
            width: 60,
            render(h, params) {
              let pageInfo = self.pageInfo
              let current = pageInfo.current
              let pageSize = pageInfo.pageSize
              let index = params.index

              return <span>{(current - 1)* pageSize + index + 1}</span>
            }
          },
          {
            title: "学科",
            key: "subjectName",
            align: "left",
            width: 230
          },
          {
            title: "阶段名称",
            key: "phaseName",
            align: "left",
            width: 350,
            render(h, params) {
              let phaseName = params.row.phaseName
              return <span class="phasename-column" domPropsTitle={phaseName}>{ phaseName }</span>
            }
          },
          {
            title: "创建时间",
            key: "createTime",
            align: "right",
            width: 180
          },
          {
            title: "任务目标数量",
            key: "taskNumber",
            align: "right",
            width: 120
          },
          {
            title: "创建人",
            key: "createPerson",
            align: "left",
            width: 180
          },
          {
            title: "状态",
            key: "status",
            align: "left",
            width: 100,
            render(h, params) {
              let Badge = 'Badge'
              let status = params.row.status
              let badgeText = ''
              let badgeStatus = ''
              if (status == 1) {
                badgeText = '启用'
                badgeStatus = 'success'
              } else {
                badgeText = '禁用'
                badgeStatus = 'error'
              }

              return <Badge status={badgeStatus} text={badgeText} />
            }
          },
          {
            title: "操作",
            key: "action",
            align: "center",
            fixed: 'right',
            width: 444,
            render(h, params) {
              let row = params.row
              let Button = "Button"

              const toTaskManageHandler = _.partial(self.toTaskManageHandler, row.id)
              const updateHandler = _.partial(self.updateHandler, row.id)
              const deleteHandler = _.partial(self.deleteHandler, row.id)

              // 启用禁用按钮
              let isDisable = row.status == 0
              let $statusButton = null
              
              if (hasqijinyong) {
                if (isDisable) {
                  $statusButton = <Button type="primary" size="small" class="btn-margin" {...{ on: { click: _.partial(self.changePhaseStatus, row, 1)  }}}>启用</Button>
                } else {
                  $statusButton = <Button type="primary" size="small" class="btn-margin" {...{ on: { click: _.partial(self.changePhaseStatus, row, 0) }}}>禁用</Button>
                }
              }

              // 上移下移按钮
              let pageInfo = self.pageInfo
              let currentIndex = pageInfo.pageSize * (pageInfo.current - 1) + params.index
              let isFirstRow = pageInfo.current === 1 && params.index === 0
              let isLastRow = currentIndex === pageInfo.total - 1

              return (
                <div>
                  {
                    hasrenwuguanli &&
                    <Button type="primary" size="small" class="btn-margin" {...{ on: { click: toTaskManageHandler }}}>
                      任务管理
                    </Button>
                  }
                  {$statusButton}
                  {hasxiugai && <Button type="primary" size="small" class="btn-margin" {...{ on: { click: updateHandler }}}>修改</Button>}
                  {hasshangxiayi && <Button type="primary" size="small" class="btn-margin" disabled={isFirstRow ? true : false} {...{ on: { click: _.partial(self.moveUpOrDown, row.id, 'up') }}}>上移</Button>}
                  {hasshangxiayi && <Button type="primary" size="small" class="btn-margin" disabled={isLastRow ? true : false} {...{ on: { click: _.partial(self.moveUpOrDown, row.id, 'down') }}}>下移</Button>}
                  {hasshanchu && <Button type="primary" size="small" class="btn-margin" disabled={isDisable ? false : true} {...{ on: { click: deleteHandler }}}>删除</Button>}
                </div>
              )
            }
          }
        ]
      },

      // 搜索信息
      searchInfo: {
        // 输入的阶段
        phaseName: '',
        // 选择的学科
        subjectId: '',
        // 选择的状态
        status: ''
      },

      // 分页信息
      pageInfo: {
        // 当前页码
        current: 1,
        // 数据总条数
        total: 0,
        // 每页条数
        pageSize: 10
      }
    }
  },

  computed: {
    ...mapGetters({
      // [ { menuId: 199, menuName: 'Web前端' } ]
      subjectList: 'student/subjectList',
      phaseItem: 'courseCenter/phaseItem'
    })
  },

  created() {
    // 获取学科
    this.fetchSubjects()
  },

  mounted() {
    //获取table-height
    this.$nextTick(()=> {
      let dom = document.getElementById("table-stage-list");
      this.baseHeight = util.baseHeight(dom, 82);
    })
  },

  beforeDestroy() {
    this.resetPhase()
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm._loaded) {
        api
          .getPhases({
            pageNumber: 1,
            paseSize: 10
          })
          .then(data => {
            if (data.status == 200) {
              vm._loaded = true
              vm.setPhaseInfo(data.result)
            }
          })
      }
    })
  },

  beforeRouteLeave(to, from, next) {
    let keepAlivePaths = {
      'task_manage': 1,
      // 临时解决关闭所有标签后回到首页，keepAlive设为false的情况
      'home_index': 1
    }

    if (keepAlivePaths[to.name]) {
      from.meta.keepAlive = true
    } else {
      from.meta.keepAlive = false
    }

    next()
  },

  mixins: [ confirmModal ],

  methods: {
    ...mapMutations({
      addToAllPhases: 'courseCenter/addToAllPhases',
      resetPhase: 'courseCenter/resetPhase'
    }),

    ...mapActions({
      fetchSubjects: 'student/fetchSubjects',
      deletePhaseItem: 'courseCenter/deletePhaseItem'
    }),

    // 设置学习阶段数据
    setPhaseInfo(result) {
      let _ = this._

      // 阶段列表展示数据
      this.phaseInfo.phaseList = result.list
      this.addToAllPhases(result.list)

      // 设置分页信息
      this.pageInfo.total = result.total
    },

    resolveFetchPhasesParams() {
      let params = {}
      let _ = this._
      let $_ = this.$_

      _.reduce(this.searchInfo, function(result, value, key) {
        if (value !== '') {
          result[key] = value
        }
        return result
      }, params)

      let pageInfo = $_.pipe([
        $_.pick(['current', 'pageSize']),
        (obj) => {
          return {
            pageNumber: obj.current,
            pageSize: obj.pageSize
          }
        }
      ])(this.pageInfo)


      _.assign(params, pageInfo)

      return params
    },

    fetchPhases() {
      let params = this.resolveFetchPhasesParams()

      this.phaseInfo.loading = true
      return api.getPhases(params)
        .then(data => {
          if (data.status === 200) {
            this.setPhaseInfo(data.result)
          }
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          this.phaseInfo.loading = false
        })
    },

    // 点击新建学习阶段
    createPhaseHandler() {
      this.isShowCreationModal = true
    },

    // 新建成功后刷新接口
    createSuccess() {
      this.searchInfo = {
        phaseName: '',
        subjectId: '',
        status: ''
      }

      this.pageInfo.current = 1
      this.fetchPhases()
    },

    // 点击搜索
    searchHandler() {
      this.search()
    },

    search() {
      this.pageInfo.current = 1
      this.fetchPhases()
    },

    // 点击清除
    clearSearchHandler() {
      this.searchInfo = {
        phaseName: '',
        subjectId: '',
        status: ''
      }

      this.search()
    },

    // 改变当前页
    changeCurrentPage(pageNumber) {
      this.pageInfo.current = pageNumber
      this.fetchPhases()
    },

    // 改变页大小
    changePageSize(pageSize) {
      let pageInfo = this.pageInfo
      pageInfo.pageSize = pageSize
      if (pageInfo.current == 1) {
        this.fetchPhases()
      }
    },

    // 跳转任务管理
    toTaskManageHandler(phaseId) {
      this.$router.push({
        name: 'task_manage',
        query: { phaseId }
      })
    },

    // 点击启用或禁用 阶段
    changePhaseStatus(phaseItem, toStatus) {
      let phaseId = phaseItem.id
      let statusStr
      if (toStatus == 0) {
        statusStr = '禁用'
      } else if (toStatus == 1) {
        statusStr = '启用'
      }
      this.confirmModal({
        content: `你确定要${statusStr}该学习阶段!`,
        successMsg: `${statusStr}成功`,
        promise() {
          return api.patchPhaseStatus({ stageId: phaseId })
            .then(data => {
              if (data.status == 200) {
                phaseItem.status = toStatus
              }
              return data
            })
        }
      })
    },

    // 点击上移或下移
    moveUpOrDown(phaseId, moveType) {
      let status
      let message

      this.phaseInfo.loading = true

      api.postPhaseSort({ stageId: phaseId, moveType })
        .then(data => {
          status = data.status
          message = data.message
        })
        .catch(err => {
        })
        .finally(() => {
          if (status == 200) {
            this.fetchPhases()
            this.$Message.success(message)
          } else {
            this.phaseInfo.loading = false
            this.$Message.error(message)
          }
        })
    },

    // 点击修改
    updateHandler(phaseId) {
      this.isShowUpdationModal = true

      this.phaseItemData = this._.clone(this.phaseItem(phaseId))
    },

    // 点击删除
    deleteHandler(phaseId) {
      this.confirmModal({
        content: '你确定要删除该学习阶段!',
        successMsg: '删除成功',
        promise() {
          return this.deletePhaseItem({ phaseId })
            .then(data => {
              if (data.status == 200) {
                this.fetchPhases()
              }
              return data
            })
        }
      })
    }
  }
}
</script>

<style lang="less">
.phase-manage {
  .ivu-btn.btn-margin {
    margin-right: 5px;
  }

  .ivu-table {
    .phasename-column {
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
<style lang="less" scoped>
.phase-manage {
  .row {
    margin-bottom: 20px;
  }
}
</style>
