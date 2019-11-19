<template>
  <Row class="communication-plan" id="table-stage-list">
    <Col span="24">
      <Button type="primary" v-if="hasxinjian" @click="creatModal"><Icon type="md-add" />新建计划</Button>
      <Table :height="baseHeight" border style="margin-top:20px;" :loading="plans_loading" :columns="plan" :data="plan_list"></Table>
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
    <!-- 弹窗 -->
    <modal-plan :isPlanModal.sync="isPlanModal" :type="type"/>
    <modal-finish :isFinishModal.sync="isFinishModal" :finishModalData="finish_list" :planId="plan_id" :type="type"/>
    <modal-abandon :isAbandonModal.sync="isAbandonModal" :planId="plan_id"/>
    <modal-detail :isDetailModal="isDetailModal" :detailModalData="detail_list" @moduleDetailClose="closeModuleDetail" :type="type"/>
    <modal-modifie :isModifieModal.sync="isModifieModal" :modifieParams="modifieParams"/>
  </Row>
</template>

<script>
import api from '@/api/index'
import util from '@/util/util'
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import ModalPlan from './modal-plan'
import ModalFinish from './modal-finish'
import ModalAbandon from './modal-abandon'
import ModalDetail from './modal-detail'
import ModalModifie from './modal-modifie'
export default {
  props: {
    from: String,
    type: Number
  },
  components: {
    ModalPlan,
    ModalFinish,
    ModalAbandon,
    ModalDetail,
    ModalModifie
  },
  data() {
    const _this = this
    const from = this.from

    let hasxinjian
    let hasxiangqing
    let haswancheng
    let hasfangqi
    let hasxiugai


    if (from == 'learning-manage-mentor') {
      hasxinjian = this.hasSomeApiAccess('teaching_students_process_mentors_plans_post')
      hasxiangqing = this.hasSomeApiAccess('teaching_students_process_mentors_plans_infos')
      haswancheng = this.hasSomeApiAccess('teaching_students_process_mentors_plans_finish_patch')
      hasfangqi = this.hasSomeApiAccess('teaching_students_process_mentors_plans_abandon_patch')
      hasxiugai = this.hasSomeApiAccess('teaching_students_process_mentors_plans_modification_patch')
    } else if (from == 'learning-manage-headteacher') {
      hasxinjian = this.hasSomeApiAccess('teaching_students_process_teachers_plans_post')
      hasxiangqing = this.hasSomeApiAccess('teaching_students_process_teachers_plans_infos')
      haswancheng = this.hasSomeApiAccess('teaching_students_process_teachers_plans_finish_patch')
      hasfangqi = this.hasSomeApiAccess('teaching_students_process_teachers_plans_abandon_patch')
      hasxiugai = this.hasSomeApiAccess('teaching_students_process_teachers_plans_modification_patch')
    }
    
    return {
      hasxinjian: hasxinjian,
      baseHeight: 0,
      arrPage:[10,20,30,40,100,200],
      plans_loading: true,
      isPlanModal: false,
      isFinishModal: false,
      isAbandonModal: false,
      isDetailModal: false,
      isModifieModal: false,
      isActionsFlag: false,
      plan_id: null,
      modifieParams: {},
      fetch_params:{
        pageNumber: 1,
        pageSize: 10,
      },
      plan: [
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
          title: '姓名',
          key: 'studentName',
          width: 120,
          ellipsis: true
        },
        {
          title: '内容',
          key: 'content',
          minWidth: 200,
          ellipsis: true,
          render(h, params) {
            let span = 'span'
            return <span title={params.row.content}>{params.row.content}</span>
          }
        },
        {
          title: '完成时间',
          key: 'finishTime',
          width: 150,
          align: 'right',
          ellipsis: true
        },
        {
          title: '状态',
          key: 'status',
          width: 150,
          ellipsis: true,
          render(h, params){
            let span = 'span'
            if(params.row.status == -1){
              return <span>已放弃</span>
            } else if(params.row.status == 0){
              return <span>未完成</span>
            }else if(params.row.status == 1){
              return <span>已完成</span>
            }
          }
        },
        {
          title: '创建人',
          key: 'creatorName',
          width: 150,
          ellipsis: true
        },
        {
          title: '创建时间',
          key: 'createTime',
          width: 150,
          align: 'right',
          ellipsis: true
        },
        {
          title: '沟通人',
          key: 'communicationPersonName',
          width: 150,
          ellipsis: true
        },
        {
          title: '操作',
          key: 'action',
          key2: 'ownFlag',
          key3: 'stageGroupId',//群 ID
          key4: 'stuCourseId',//学员课程 ID
          key5: 'id',
          key6: 'stageGroupName',//阶段群名称
          fixed: 'right',
          width: 350,
          align: 'center',
          render(h, params){
            let div = 'div'
            let Button = 'Button'
            let btnxiangqing = null

            const finisnPlan = _.partial(
              _this.finisnPlan,
              params.row
            )
            const abandonPlan = _.partial(
              _this.abandonPlan,
              params.row
            )
            const modifiePlan = _.partial(
              _this.modifiePlan,
              params.row
            )
            const detailPlan = _.partial(
              _this.detailPlan,
              params.row
            )
            return (
              <div>
                {haswancheng && (params.row.ownFlag && (params.row.status == 0) && <Button class="bg-b" type="text" {...{ on: { click: finisnPlan } }} >标记完成</Button>)}
                {hasfangqi && (params.row.ownFlag && (params.row.status == 0) && <Button class="bg-b" type="text" {...{ on: { click: abandonPlan } }} >放弃</Button>)}
                {hasxiugai && (params.row.ownFlag && (params.row.status == 0) && <Button class="bg-b" type="text" {...{ on: { click: modifiePlan } }} >修改</Button>)}
                {hasxiangqing && <Button class="bg-b" type="text" {...{ on: { click: detailPlan } }} >查看详情</Button>}
              </div>
            )
          }
        }
      ]
    }
  },
  created(){
    this.fecthPlans()
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
      page_list: state => state.communicationPlans.page_data,
      plan_list: state => state.communicationPlans.plan_data,
      finish_list: state => state.communicationPlans.finish_plan,
      detail_list: state => state.communicationPlans.detail_data
    })
  },
  methods: {
    ...mapActions([
      'getPlans',
      'getJurisdiction',
      'getFinishPlan',
      'getDetailPlan'
    ]),
    async fecthPlans() {
      await this.getPlans({
        type: this.type,
        pageNumber:this.fetch_params.pageNumber,
        pageSize:this.fetch_params.pageSize
      })
      this.plans_loading = false;
    },
    //翻页
    changeCurrent(num) {
      this.fetch_params.pageNumber = num;
      let obj = {
        type: this.type,
        pageNumber: this.fetch_params.pageNumber,
        pageSize: this.fetch_params.pageSize
      }
      this.getPlans(obj)
    },
    //改变每页条数
    changePageSize(size) {
      this.fetch_params.pageSize = size;
      let obj = {
        type: this.type,
        pageNumber: 1,
        pageSize: this.fetch_params.pageSize
      }
      this.getPlans(obj)
    },
    //弹窗
    creatModal(){
      this.fetchJurisdiction({
        type: this.type
      }).then(res=>{
        if(res.status === 200) {
          this.isPlanModal = true;
        } else if (res.status === 400) {
          this.$Message.error('你的角色已变更，已没有操作权限！');
        } else {
          this.$Message.warning('新建失败，请稍后重试~');
        }
      })
    },
    //判断权限接口
    async fetchJurisdiction(params) {
      let res = await api.getJurisdiction(params)
      return res;
    },
    //标记完成
    finisnPlan(row){
      this.plan_id = row.id;
      this.fetchJurisdiction({
        type: this.type
      }).then(res=>{
        if(res.status == 200 ){
          this.getFinishPlan({
            groupId: row.stageGroupId,
            studentCourseId: row.stuCourseId,
          })
          this.isFinishModal = true;
        } else if (res.status === 400) {
          this.$Message.error('你的角色已变更，已没有操作权限！');
        } else {
          this.$Message.warning('操作失败，请稍后重试~');
        }
      })
    },
    //放弃
    abandonPlan(row){
      this.plan_id = row.id;
      this.fetchJurisdiction({
        type: this.type
      }).then(res=>{
        if(res.status == 200 ){
          this.isAbandonModal = true;
        } else if (res.status === 400) {
          this.$Message.error('你的角色已变更，已没有操作权限！');
        } else {
          this.$Message.warning('操作失败，请稍后重试~');
        }
      })
    },
    //修改
    modifiePlan(row){
      this.modifieParams = Object.assign({} ,row);
      this.fetchJurisdiction({
        type: this.type
      }).then(res=>{
        if(res.status == 200 ){
          this.isModifieModal = true;
        } else if (res.status === 400) {
          this.$Message.error('你的角色已变更，已没有操作权限！');
        } else {
          this.$Message.warning('操作失败，请稍后重试~');
        }
      })
    },
    //查看详情
    detailPlan(row){
      this.plan_id = row.id;
      this.fetchJurisdiction({
        type: this.type
      }).then(res=>{
        if(res.status == 200 ){
          this.getDetailPlan({
            planId: this.plan_id
          })
          this.isDetailModal = true;
        } else if (res.status === 400) {
          this.$Message.error('你的角色已变更，已没有操作权限！');
        } else {
          this.$Message.warning('操作失败，请稍后重试~');
        }
      })
    },
    closeModuleDetail(){
      this.isDetailModal = false;
    }
  }
}
</script>

<style lang="less" scoped>
.communication-plan /deep/ .bg-b {
  margin: 0 5px;
  background: #2d8cf0;
  color: #fff;
  &:hover {
    background: #57a3f3;
    color: #fff;
  }
}
</style>