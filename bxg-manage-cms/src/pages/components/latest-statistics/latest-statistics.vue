<template>
  <div class="latest-statistics-wrap">
    <Row :gutter="10" type="flex">
      <Col span="4">
        <DatePicker @on-change="startDate" style="width:100%" type="date" :options="optionsDate" placeholder="筛选" v-model="fetch_params.dateCondition"></DatePicker>
      </Col>
      <Col>
        <Button @click="serchInfo" type="primary" icon="ios-search">搜索</Button>
      </Col>
      <Col>
        <Button @click="clearInfo">清除</Button>
      </Col>
    </Row>
    <Row style="margin-top:20px;" id="table-stage-list">
      <Col span="24" class="table-box">
        <Table class="addTable" :height="baseHeight" border :loading="statistics_loading" :columns="statistics_tit" :data="statistics_list"></Table>
      </Col>
      <Col style="margin-top:20px;" span="24">
        <Page style="text-align: right; padding-bottom: 1px"
              :total="page_list.total"
              :current="fetch_params.pageNumber"
              :page-size="fetch_params.pageSize"
              :page-size-opts="arrPage"
              @on-change="changeCurrent"
              @on-page-size-change="changePageSize"
              :transfer="true"
              show-total show-elevator show-sizer>
        </Page>
      </Col>
    </Row>
    <!-- 弹窗 -->
    <PopupModule :isShowPopupTables="popup_params.isShowPopupTables" :myStudentsList="myStudentsList" :pageList="pageList" :params="params" :stuCourseIds="stuCourseIds" @moduleCloseClicks="closeModuleClicks"/>
  </div>
</template>

<script>
import api from '@/api/index'
import dayjs from 'dayjs'
import util from "@/util/util";
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import PopupModule from './popup-module'
export default {
  props: {
    type: Number,
    from: String
  },
  components: {
    PopupModule
  },
  data() {
    const self = this
    const from = this.from

    let haschakan

    if (from == 'learning-manage-mentor') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_mentors_statistics_latest_details')
    } else if (from == 'learning-manage-headteacher') {
      haschakan = this.hasSomeApiAccess('teaching_students_process_teachers_statistics_latest_details')
    }
    
    return {
      baseHeight: 0,
      arrPage:[10,20,30,40,100,200],
      statistics_loading: true,
      params: null,
      stuCourseIds:'',
      defaultDays: '',
      strData:'',
      start_date: '',
      end_date:'',
      //日期
      optionsDate: {
        disabledDate (date) {
          return date && new Date(self.start_date)-86400000 > date.valueOf() || date.valueOf() > new Date(self.end_date);
        }
      },
      popup_params:{
        isShowPopupTables: false,
        pageNumber: 1,
        pageSize: 10
      },
      fetch_params: {
        dataType: 3,
        dateCondition: '',//开始时间
        pageNumber: 1,
        pageSize: 10
      },
      //表格title
      statistics_tit: [
        {
          title: '序号',
          key: 'Num',
          align: 'center',
          width: 80,
          render: (h, params) => {
            return h(
              'span',
              params.index + 1 + this.fetch_params.pageSize * (this.fetch_params.pageNumber - 1)
            )
          }
        },
        {
          title: '学科',
          key: 'menuName',
          width: 140,
          ellipsis: true,
          render(h, params) {
            let span = 'span'
            return <span title={params.row.menuName}>{params.row.menuName}</span>
          }
        },
        {
          title: '群名称',
          key: 'groupName',
          width: 120,
          ellipsis: true,
          render(h, params) {
            let span = 'span'
            return <span title={params.row.groupName}>{params.row.groupName}</span>
          }
        },
        {
          title: '总人数',
          key: 'totalAmount',
          align: 'right',
          width: 120,
          ellipsis: true
        },
        {
          title: '休学人数',
          key: 'suspensionAmount',
          key2: 'suspensionIds',
          key3: 'subjectId',
          align: 'right',
          width: 140,
          ellipsis: true,
          render(h, params) {
            let div = 'div'
            let Icon = 'Icon'
            const suspensionClick = _.partial(
              self.suspensionClick,
              params
            )
            return <div>
              {params.row.suspensionAmount}
              {params.row.suspensionAmount !== 0 && <Icon class="find-icon" size="16" color="#008bf8" type="md-search" {...{ on: { click: suspensionClick } }}/>}
            </div>
          }
        },
        {
          title: '失联人数',
          key: 'lossAmount',
          key: 'lossIds',
          align: 'right',
          width: 140,
          ellipsis: true,
          render(h, params) {
            let div = 'div'
            let Icon = 'Icon'
            const lossClick = _.partial(
              self.lossClick,
              params
            )
            return <div>
              {params.row.lossAmount}
              {params.row.lossAmount !== 0 && <Icon class="find-icon" size="16" color="#008bf8" type="md-search" {...{ on: { click: lossClick } }}/>}
            </div>
          }
        },
        {
          title: '学习效果高风险人数',
          key: 'riskEffectAmount',
          key2: 'riskEffectIds',
          key3: 'normalEffectAmount',
          key4: 'warnEffectAmount',
          align: 'right',
          width: 150,
          ellipsis: true,
          render(h, params) {
            let row = params.row
            let normalEffectAmount = row.normalEffectAmount
            let warnEffectAmount = row.warnEffectAmount
            let riskEffectAmount = row.riskEffectAmount

            let Icon = 'Icon'
            let Tooltip = 'Tooltip'

            const riskEffectClick = _.partial(
              self.riskEffectClick,
              params
            )
            return <div>
              {params.row.riskEffectAmount}
              <Tooltip
                content="Right Center text"
                placement="right"
                theme="light"
                >
                <Icon class="find-icon" size="16" color="#008bf8" type="md-alert"/>
                <div slot="content" class="stage">
                  <p class="blue">学习状态高风险评估：</p>
                  <p class="t-d20">正常：{normalEffectAmount}&emsp;人</p>
                  <p class="t-d20">预警：{warnEffectAmount}&emsp;人</p>
                  <p class="t-d20">问题：{riskEffectAmount}&emsp;人
                    {haschakan && !!riskEffectAmount && <span class="blue look" {...{ on: { click: riskEffectClick } }}>查看</span>}
                  </p>

                </div>
              </Tooltip>
            </div>
          }
        },
        {
          title: '学习状态高风险人数',
          key: 'riskStateAmount',
          key2: 'riskStateIds',
          key3: 'normalStateAmount',
          key4: 'warnStateAmount',
          align: 'right',
          width: 150,
          ellipsis: true,
          render(h, params) {
            let row = params.row
            let normalStateAmount = row.normalStateAmount
            let warnStateAmount = row.warnStateAmount
            let riskStateAmount = row.riskStateAmount
            let Icon = 'Icon'
            let Tooltip = 'Tooltip'

            const riskStateClick = _.partial(
              self.riskStateClick,
              params
            )
            return <div class="stage">
              {riskStateAmount}
              <Tooltip
                content="Right Center text"
                placement="right"
                theme="light"
                >
                <Icon class="find-icon" size="16" color="#008bf8" type="md-alert"/>
                <div slot="content">
                  <p class="blue">学习状态高风险评估：</p>
                  <p class="t-d20">正常：{normalStateAmount}&emsp;人</p>
                  <p class="t-d20">预警：{warnStateAmount}&emsp;人</p>
                  <p class="t-d20">问题：{riskStateAmount}&emsp;人
                    {haschakan && !!riskStateAmount&&<span class="blue look" {...{ on: { click: riskStateClick } }}>查看</span>}
                  </p>

                </div>
              </Tooltip>
            </div>
          }
        },
        {
          title: '超过参考时长人数',
          key: 'overReferenceDayAmount',
          key2: 'overReferenceDayIds',
          align: 'right',
          width: 140,
          ellipsis: true,
          render(h, params) {
            let div = 'div'
            let Icon = 'Icon'
            const overReferenceDayClick = _.partial(
              self.overReferenceDayClick,
              params
            )
            return <div>
              {params.row.overReferenceDayAmount}
              {params.row.overReferenceDayAmount!==0 && <Icon class="find-icon" size="16" color="#008bf8" type="md-search" {...{ on: { click: overReferenceDayClick } }}/>}
            </div>
          }
        },
        {
          title: '超过最长时长人数',
          key: 'overMaxDayAmount',
          key2: 'overMaxDayIds',
          align: 'right',
          width: 140,
          ellipsis: true,
          render(h, params) {
            let div = 'div'
            let Icon = 'Icon'
            const overMaxDayClick = _.partial(
              self.overMaxDayClick,
              params
            )
            return <div>
              {params.row.overMaxDayAmount}
              {params.row.overMaxDayAmount!==0 && <Icon class="find-icon" size="16" color="#008bf8" type="md-search" {...{ on: { click: overMaxDayClick } }}/>}
            </div>
          }
        },{
          title: '超过2周导师无沟通记录人数',
          key: 'tutorNoCommunicationAmount',
          key2: 'tutorNoCommunicationIds',
          align: 'right',
          width: 200,
          ellipsis: true,
          render(h, params) {
            let div = 'div'
            let Icon = 'Icon'
            const tutorNoCommunicationClick = _.partial(
              self.tutorNoCommunicationClick,
              params
            )
            return <div>
              {params.row.tutorNoCommunicationAmount}
              {params.row.tutorNoCommunicationAmount!==0 && <Icon class="find-icon" size="16" color="#008bf8" type="md-search" {...{ on: { click: tutorNoCommunicationClick } }}/>}
            </div>
          }
        },{
          title: '超过2周班主任无沟通记录人数',
          key: 'teacherNoCommunicationAmount',
          key2: 'teacherNoCommunicationIds',
          align: 'right',
          width: 200,
          ellipsis: true,
          render(h, params) {
            let div = 'div'
            let Icon = 'Icon'
            const teacherNoCommunicationClick = _.partial(
              self.teacherNoCommunicationClick,
              params
            )
            return <div>
              {params.row.teacherNoCommunicationAmount}
              {params.row.teacherNoCommunicationAmount!==0 && <Icon class="find-icon" size="16" color="#008bf8" type="md-search" {...{ on: { click: teacherNoCommunicationClick } }}/>}
            </div>
          }
        },
      ]
    }
  },
  created() {
    api.getLatestDateList().then(res=>{
      let len = res.result.length-1;
      this.fetch_params.dateCondition = res.result[len];
      this.defaultDays = res.result[len];
      this.start_date = res.result[0];
      this.end_date = res.result[len];
    })
    this.fecthStatistics();
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
      page_list: state => state.latestStatistics.page_data,
      statistics_list: state => state.latestStatistics.statistics_data,
      //弹窗数据
      myStudentsList: state => state.myStudents.myStudentsData,
      pageList: state => state.myStudents.pageData,
    })
  },
  methods: {
    ...mapActions([
      'getLatestStatistics',
      'postMyStudents'
    ]),
    //获取最新统计数据列表
    async fecthStatistics() {
      this.fetch_params.pageNumber = 1
      this.fetch_params.pageSize = 10
      await this.getLatestStatistics({
        dataType: this.fetch_params.dataType,
        type: this.type,
        pageNumber: this.fetch_params.pageNumber,
        pageSize: this.fetch_params.pageSize
      })
      this.$nextTick(()=>{
        this.statisticsData();
      })
      this.statistics_loading = false
    },
    startDate(date) {
      this.fetch_params.dateCondition = date
    },
    //获取汇总数据
    async statisticsData(){
      let curDate = new Date();
          curDate.setDate(curDate.getDate() - 1);
      let yesterday = curDate.getFullYear()+"-" + (curDate.getMonth()+1) + "-" + curDate.getDate();
      let res = await api.getTotalStatistics({
        dataType: this.fetch_params.dataType,
        type: this.type,
        dateCondition: yesterday
      })
      if(res.status === 200){
        if((Object.keys(res.result).length>0)&&(!!document.querySelector('.addTable .ivu-table-tbody'))){
          this.strData =
          `<td colspan="3" style="text-align:center;">汇总</td>
            <td>${res.result.totalAmount}</td>
            <td>${res.result.suspensionAmount}</td>
            <td>${res.result.lossAmount}</td>
            <td>${res.result.riskEffectAmount}</td>
            <td>${res.result.riskStateAmount}</td>
            <td>${res.result.overReferenceDayAmount}</td>
            <td>${res.result.overMaxDayAmount}</td>
            <td>${res.result.tutorNoCommunicationAmount}</td>
            <td>${res.result.teacherNoCommunicationAmount}</td>`;
          function creatfun(){
            let tr = document.createElement('tr')
            tr.className = 'last-data ivu-table-row'
            return tr
          }
          setTimeout(()=>{
            document.querySelector('.addTable .ivu-table-tbody').appendChild(creatfun())
            document.querySelector('.ivu-table-tbody .last-data').innerHTML = this.strData
          },17)
        }
      }
    },
    //根据条件查询列表
    serchInfo() {
      this.fetch_params.pageNumber = 1;
      this.getLatestStatistics({
        dataType: this.fetch_params.dataType,
        type: this.type,
        dateCondition: util.disposeTime(this.fetch_params.dateCondition, 'yyyy-MM-dd'),
        pageSize: this.fetch_params.pageSize,
        pageNumber: 1
      })
    },
    //清除最新列表查询条件
    clearInfo() {
      this.fetch_params.pageNumber = 1;
      this.fetch_params.dateCondition = this.defaultDays;
      this.getLatestStatistics({
        dataType: this.fetch_params.dataType,
        type: this.type,
        pageNumber: 1,
        pageSize: this.fetch_params.pageSize
      })
    },
    //翻页
    changeCurrent(num) {
      this.fetch_params.pageNumber = num;
      let obj = {
        dataType: this.fetch_params.dataType,
        type: this.type,
        dateCondition: util.disposeTime(this.fetch_params.dateCondition, 'yyyy-MM-dd'),
        pageNumber: this.fetch_params.pageNumber,
        pageSize: this.fetch_params.pageSize
      }
      this.getLatestStatistics(obj)
    },
    //改变每页条数
    changePageSize(size) {
      this.fetch_params.pageSize = size;
      let obj = {
        dataType: this.fetch_params.dataType,
        type: this.type,
        dateCondition: util.disposeTime(this.fetch_params.dateCondition, 'yyyy-MM-dd'),
        pageNumber: 1,
        pageSize: this.fetch_params.pageSize
      }
      this.getLatestStatistics(obj)
    },
    //获取弹窗数据------------------------------------------------------------------
    //关闭弹窗
    closeModuleClicks(){
      this.popup_params.isShowPopupTables = false;
    },
    //休学人数
    suspensionClick(params){
      this.popup_params.isShowPopupTables = true;
      this.params = params;
      this.stuCourseIds = params.row.suspensionIds;
      this.postMyStudents({
        stuCourseIds: params.row.suspensionIds,
        menuId: params.row.subjectId,
        pageNumber: this.popup_params.pageNumber,
        pageSize: this.popup_params.pageSize,
        dataTab: 'DATA',
        typeList: 0
      })
    },
    //失联人数
    lossClick(params){
      this.popup_params.isShowPopupTables = true;
      this.params = params;
      this.stuCourseIds = params.row.lossIds;
      this.postMyStudents({
        stuCourseIds: params.row.lossIds,
        menuId: params.row.subjectId,
        pageNumber: this.popup_params.pageNumber,
        pageSize: this.popup_params.pageSize,
        dataTab: 'DATA',
        typeList: 0
      })
    },
    //学习效果风险评估
    riskEffectClick(params){
      this.popup_params.isShowPopupTables = true;
      this.params = params;
      this.stuCourseIds = params.row.riskEffectIds;
      this.postMyStudents({
        stuCourseIds: params.row.riskEffectIds,
        menuId: params.row.subjectId,
        pageNumber: this.popup_params.pageNumber,
        pageSize: this.popup_params.pageSize,
        dataTab: 'DATA',
        typeList: 0
      })
    },
    //学习状态风险评估
    riskStateClick(params){
      this.popup_params.isShowPopupTables = true;
      this.params = params;
      this.stuCourseIds = params.row.riskStateIds;
      this.postMyStudents({
        stuCourseIds: params.row.riskStateIds,
        menuId: params.row.subjectId,
        pageNumber: this.popup_params.pageNumber,
        pageSize: this.popup_params.pageSize,
        dataTab: 'DATA',
        typeList: 0
      })
    },
    //超过参考时长
    overReferenceDayClick(params){
      this.popup_params.isShowPopupTables = true;
      this.params = params;
      this.stuCourseIds = params.row.overReferenceDayIds;
      this.postMyStudents({
        stuCourseIds: params.row.overReferenceDayIds,
        menuId: params.row.subjectId,
        pageNumber: this.popup_params.pageNumber,
        pageSize: this.popup_params.pageSize,
        dataTab: 'DATA',
        typeList: 0
      })
    },
    //超过最长时长
    overMaxDayClick(params){
      this.popup_params.isShowPopupTables = true;
      this.params = params;
      this.stuCourseIds = params.row.overMaxDayIds;
      this.postMyStudents({
        stuCourseIds: params.row.overMaxDayIds,
        menuId: params.row.subjectId,
        pageNumber: this.popup_params.pageNumber,
        pageSize: this.popup_params.pageSize,
        dataTab: 'DATA',
        typeList: 0
      })
    },
    //超过2周（导师）
    tutorNoCommunicationClick(params){
      this.popup_params.isShowPopupTables = true;
      this.params = params;
      this.stuCourseIds = params.row.tutorNoCommunicationIds;
      this.postMyStudents({
        stuCourseIds: params.row.tutorNoCommunicationIds,
        menuId: params.row.subjectId,
        pageNumber: this.popup_params.pageNumber,
        pageSize: this.popup_params.pageSize,
        dataTab: 'DATA',
        typeList: 0
      })
    },
    //超过2周（班主任）
    teacherNoCommunicationClick(params){
      this.popup_params.isShowPopupTables = true;
      this.params = params;
      this.stuCourseIds = params.row.teacherNoCommunicationIds;
      this.postMyStudents({
        stuCourseIds: params.row.teacherNoCommunicationIds,
        menuId: params.row.subjectId,
        pageNumber: this.popup_params.pageNumber,
        pageSize: this.popup_params.pageSize,
        dataTab: 'DATA',
        typeList: 0
      })
    }
  }
}
</script>

<style lang="less" scoped>
.latest-statistics-wrap /deep/ .ivu-icon.ivu-icon-md-alert.find-icon,
.latest-statistics-wrap /deep/ .ivu-icon.ivu-icon-md-search.find-icon{
  margin-left: 10px;
  &:hover{
    cursor: pointer;
  }
}
div /deep/ .ivu-tooltip-inner .blue {
  color: #2d8cf0;
}
div /deep/ .ivu-tooltip-inner .t-d20 {
  text-indent: 26px;
}
div /deep/ .ivu-tooltip-inner .look{
  margin-left: 20px;
  &:hover {
    cursor: pointer;
  }
}
.table-box /deep/ .last-data td{
  padding-right: 20px;
  text-align: right;
}
</style>
