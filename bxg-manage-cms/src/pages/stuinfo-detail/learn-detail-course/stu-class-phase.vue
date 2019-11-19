<template>
  <div class="phase">
    <div
      style="width:100%;"
    >
      <div class="module_search">
        <Row>
          <Col span="8" class="module_col">
            <span>课程阶段：</span>
            <Select v-model="model1" filterable clearable>
                <Option v-for="item in classPhaseoOp" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
          <Col span="8" class="module_col module_colSm">
            <span>结果：</span>
            <Select class="selectSm" v-model="model2" filterable clearable>
                <Option v-for="item in resultPhaseoOp" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Col>
          <Button @click="searchClick" class="searchBtn" type="primary" icon="ios-search"></Button>
          <Button @click="clearClick" class="clearBtn" type="primary">清除</Button>
        </Row>
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
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import util from '@/util/util'
export default {
  name: 'stuClassPhase',
  data() {
    return {
      baseHeight: 0,
      loading: true,
      current:1,
      total: 1,
      columns1: [
        {
          title: '序号',
          key: 'Num',
          width:80,
          align:"center",
          render: (h, params) => {
            return h('span', params.index+1 + this.pageSize*(this.pageNumber-1))
          }
        },
        {
          title: '阶段作业名称',
          key: 'Phase_work_name'
        },
        {
          title: '阶段进度（已完成/总模块)',
          key: 'Phase_schedule'
        },
        {
          title: '提交时间',
          key: 'Sub_time'
        },
        {
          title: '批阅时间',
          key: 'Read_time'
        },
        {
          title: '批阅人',
          key: 'Reader_name'
        },
        {
          title: '综合评分',
          key: 'Synthesize'
        },
        {
          title: '结果',
          key: 'Result'
        },
        {
          title: '操作',
          key: 'Operation',
          align:"center",
          render: (h, params) => {
            return h('div', [
                h('div', {
                    style: {
                      color: '#ccc',
                    },
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    // on: {
                    //   click: () => {
                    //     this.videoPlanClick(params.row.section_id);
                    //   }
                    // }
                }, '查看'),
            ]);
          }
        }
      ],
      classPhaseoOp: [],
      resultPhaseoOp: [
        {
          value: -1,
          label: '未通过'
        },
        {
          value: 0,
          label: '待批阅'
        },
        {
          value: 1,
          label: '已通过'
        }
      ],
      model1: '',
      model2: '',
      data1: [],
      pageSize: 10,
      pageNumber:1
    }
  },
  methods: {
    ...mapActions([
      "fetchPhaseWork",
      'fetchClassPhaseWork'
    ]),
    async clearClick() {
      this.model1 = ''
      this.model2 = ''
      let uInfo = this.$route.query
      await this.fetchPhaseWork({
        courseId: uInfo.courseId,
        userId: uInfo.userId,
        pageNumber: 1,
        pageSize: this.pageSize,
      })
      let phData = this.$store.state.stuCondition.phaseWorkData
      try {
        this._disposeState(phData.list)
      } catch (error) {
        console.log(error)
      }
    },
    async _initState () {
      let uInfo = this.$route.query
      await this.fetchPhaseWork({
        courseId: uInfo.courseId,
        userId: uInfo.userId,
        pageNumber: 0,
        pageSize: 10,
      })
      let phData = this.$store.state.stuCondition.phaseWorkData
      this.loading = this.loading ? false : true
      this.total = phData.total
      try {
        this._disposeState(phData.list)
      } catch (error) {
        console.log(error)
      }
      await this.fetchClassPhaseWork({
        courseId: uInfo.courseId
      })
      let phaseResult = this.$store.state.stuCondition.phaseId
      try {
        this._phaseState(phaseResult)
      } catch (error) {
        console.log(error)
      }
    },
    _disposeState(phData) {
      let arr = []
      phData.forEach(e => {
        let newData = {}
        if (e.status === -1) {
          e.status = '未通过'
        } else if (e.status === 0) {
          e.status = '待批阅'
        } else if (e.status === 1) {
          e.status = '已通过'
        }
        Object.assign(newData, {
          Num: e.id,
          Phase_work_name: e.homeworkName,
          Phase_schedule: e.phaseProcess,
          Sub_time: e.commitTime,
          Read_time: e.markTime,
          Reader_name: e.markUser,
          Synthesize: e.score,
          Result: e.status
        })
        arr.push(newData)
      })
      this.data1 = arr
    },
    async searchClick() {
      let uInfo = this.$route.query
      await this.fetchPhaseWork({
        courseId: uInfo.courseId,
        phaseId: this.model1,
        status: this.model2,
        userId: uInfo.userId,
        pageNumber: 0,
        pageSize: 10,
      })
      let phData = this.$store.state.stuCondition.phaseWorkData
      try {
        this._disposeState(phData.list)
      } catch (error) {
        console.log(error)
      }
    },
    _phaseState(phaseResult) {
      let arr = []
      phaseResult.forEach(e => {
        let opData = {}
        Object.assign(opData, {
          value: e.phaseId,
          label: e.phaseName
        })
        arr.push(opData)
      })
      this.classPhaseoOp = arr
    },
    //页码改变
    async modulePageChange(page) {
      let uInfo = this.$route.query
      this.current=page
      this.pageNumber = page
      await this.fetchPhaseWork({
        courseId: uInfo.courseId,
        userId: uInfo.userId,
        pageNumber: page,
        pageSize: this.pageSize,
      })
      let phData = this.$store.state.stuCondition.phaseWorkData
      try {
        this._disposeState(phData.list)
      } catch (error) {
        console.log(error)
      }
    },
    //显示条数改变
    async modulePageSizeChange(pageSize) {
      let uInfo = this.$route.query
      this.pageSize = pageSize
      await this.fetchPhaseWork({
        courseId: uInfo.courseId,
        userId: uInfo.userId,
        pageNumber: 1,
        pageSize: this.pageSize,
      })
      let phData = this.$store.state.stuCondition.phaseWorkData
      try {
        this._disposeState(phData.list)
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
    this.$nextTick(()=> {
      let dom = document.getElementById("table-stage-list");
      this.baseHeight = util.baseHeight(dom, 82);
    })
  },
  computed: {
    ...mapState({
      phaseWorkData: state => state.stuCondition.phaseWorkData,
      phaseId: state => state.stuCondition.phaseId,
    })
  },
}
</script>

<style lang="less" scoped>
.phase{
  .module_search{
    display: flex;
    justify-content: flex-end;
    .module_col{
      width: 200px;
      float: 30%;
      display: flex;
      margin-top: 2px;
      span{
        display: block;
        width: 140px;
        line-height: 32px;
      }
    }
    .module_col+.module_col{
      margin-left: 10px;
      .selectSm{
        width: 100px;
      }
    }
    .module_colSm{
      width: 170px;
      margin-right: 10px;
      span{
        width: 60px;
        line-height: 32px;
      }
    }
  }
  .module_table{
    margin-top: 20px;
  }
  .module_page_box{
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
//iview
.phase /deep/ .ivu-btn-icon-only{
  font-size: 18px;
  margin-top: 2px;
  height: 30px;
  padding: 0 8px 0;
}
.phase /deep/ .clearBtn{
  height: 30px;
  margin-top: 2px;
}
</style>


