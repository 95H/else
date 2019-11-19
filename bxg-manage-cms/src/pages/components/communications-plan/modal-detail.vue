<template>
  <Modal
    v-model= "isDetailModal"
    :mask="true"
    :closable="false"
    :footer-hide="true"
    :transfer="true"
    :mask-closable="false"
    width='900'>
    <div class="modal_header">
      <h6 style="color:#000;">查看详情</h6>
      <span class="close" @click="moduleClose"><Icon class="closeIcon" type="md-close" /></span>
    </div>
    <div class="bottom-line">
      <p class="m-t10"><strong>姓名：</strong>{{detailModalData.studentName}}</p>
      <p class="m-t10"><strong>阶段群：</strong>{{detailModalData.stageGroupName}}</p>
      <p class="m-t10"><strong>内容：</strong>{{detailModalData.content}}</p>
      <div class="m-t10 d-flex">
        <p><strong>计划完成时间：</strong>{{detailModalData.finishTime}}</p>
        <p><strong>创建人：</strong>{{detailModalData.creatorName}}</p>
        <p><strong>沟通人：</strong>{{detailModalData.communicationPersonName}}</p>
      </div>
      <div class="m-t10 d-flex">
        <p v-if="detailModalData.status == -1"><strong>状态：</strong>已放弃</p>
        <p v-else-if="detailModalData.status == 0"><strong>状态：</strong>未完成</p>
        <p v-else-if="detailModalData.status == 1"><strong>状态：</strong>已完成</p>
        <p><strong>创建时间：</strong>{{detailModalData.createTime}}</p>
        <p></p>
      </div>
    </div>
    <div v-if="type==1">
      <div class="bottom-line2" v-if="detailModalData.status == 1">
        <p class="m-t10">
          <span><strong>阶段名称：</strong>{{detailModalData.communicationVo.stageName}}</span>&emsp;&emsp;&emsp;
          <span><strong>任务目标：</strong>{{detailModalData.communicationVo.taskName}}</span>
        </p>
        <p class="m-t10"><strong>任务要求：</strong>{{detailModalData.communicationVo.taskRemark}}</p>
        <p class="m-t10" v-if="detailModalData.communicationVo.scored"><strong>任务评分：</strong><Rate class="star" allow-half disabled :value="detailModalData.communicationVo.taskScore || 0" /></p>
        <p class="m-t10" v-if="detailModalData.communicationVo.scored"><strong>任务说明：</strong>{{detailModalData.communicationVo.taskComment}}</p>
        <p class="m-t10">
          <span><strong>导师：</strong>{{detailModalData.communicationVo.creator}}</span>&emsp;&emsp;&emsp;
          <span><strong>时间：</strong>{{detailModalData.communicationVo.createTime}}</span>
        </p>
        <p class="m-t10"><strong>沟通要点：</strong>{{detailModalData.communicationVo.essential}}</p>
        <p class="m-t10"><strong>评价：</strong>{{detailModalData.communicationVo.comment}}</p>
        <p class="m-t10"><strong>指导：</strong>{{detailModalData.communicationVo.guide}}</p>
        <h5 class="m-t10">学习效果风险评估：</h5>
        <div style="margin-left:20px;">
          <p class="m-t10" v-if="detailModalData.communicationVo.riskEffectStatus==0"><strong>目前状态：</strong>正常</p>
          <p class="m-t10" v-else-if="detailModalData.communicationVo.riskEffectStatus==1"><strong>目前状态：</strong>预警</p>
          <p class="m-t10" v-else-if="detailModalData.communicationVo.riskEffectStatus==2"><strong>目前状态：</strong>问题</p>
          <p class="m-t10"><strong>原因：</strong>{{detailModalData.communicationVo.riskReason}}</p>
        </div>
      </div>
    </div>
    <div v-if="type==2">
      <div class="bottom-line2" v-if="detailModalData.status == 1">
        <p>
          <span><strong>班主任：</strong>{{detailModalData.communicationVo.creator}}</span>&emsp;&emsp;&emsp;
          <span><strong>时间：</strong>{{detailModalData.communicationVo.createTime}}</span>
        </p>
        <div v-if="detailModalData.communicationVo.contactState != null">
          <p class="m-t10" v-if="detailModalData.communicationVo.contactState==0"><strong>是否失联：</strong>失联</p>
          <p class="m-t10" v-if="detailModalData.communicationVo.contactState==1"><strong>是否失联：</strong>未失联</p>
          <p class="m-t10"><strong>备注：</strong>{{detailModalData.communicationVo.contactRemark}}</p>
        </div>
        <div v-else>
          <p class="m-t10"><strong>沟通记录：</strong>{{detailModalData.communicationVo.essential}}</p>
          <p class="m-t10"><strong>评价：</strong>{{detailModalData.communicationVo.comment}}</p>
          <p class="m-t10" v-if="detailModalData.communicationVo.riskStudyStatus==0"><strong>学习状态评估：</strong>正常</p>
          <p class="m-t10" v-else-if="detailModalData.communicationVo.riskStudyStatus==1"><strong>学习状态评估：</strong>预警</p>
          <p class="m-t10" v-else-if="detailModalData.communicationVo.riskStudyStatus==2"><strong>学习状态评估：</strong>问题</p>
          <p class="m-t10"><strong>原因：</strong>{{detailModalData.communicationVo.riskReason}}</p>
        </div>
      </div>
    </div>
    <div class="m-t10" style="padding:0 20px;" v-if="detailModalData.status == -1">
      <p v-if="detailModalData.giveUpType == 1"><strong>选择类型：</strong>已放弃</p>
      <p style="word-break:break-all;word-wrap:break-word;"><strong>放弃原因：</strong>{{detailModalData.giveUpReason}}</p>
      <p></p>
    </div>
    <div class="module_close" @click="moduleClicksSure">
      <Button type="primary" style="color:#FFF;">关闭</Button>
    </div>
  </Modal>
</template>

<script>
import api from '@/api/index'
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
export default {
  props: ['isDetailModal', 'detailModalData', 'type'],
  methods:{
    //关闭弹窗
    moduleClose(){
      this.$emit('moduleDetailClose');
    },
    moduleClicksSure(){
      this.$emit('moduleDetailClose');
    }
  }
}
</script>

<style lang="less" scoped>
*{
  font-size: 14px;
  color: #a1a1a1;
  strong,h5{
    font-weight: normal;
    color:#656565;
  }
}
.modal_header{
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  h6{
    font-size: 14px;
    line-height: 30px;
  }
  .closeIcon{
    font-size: 30px;
    font-weight: 600;
    line-height: 30px;
    cursor: pointer;
  }
}
.bottom-line2{
  /deep/ .star{
    font-size: 20px;
  }
}
.bottom-line{
  width: 100%;
  border-bottom: 2px solid #949494;
  margin-bottom: 20px;
  padding: 0 20px;
  padding-bottom: 20px;
  .m-t10{
    word-break: break-all;
    word-wrap: break-word;
    margin-top: 10px;
  }
}
.bottom-line2{
  width: 100%;
  border-bottom: 2px solid #949494;
  margin-bottom: 20px;
  padding: 0 20px;
  padding-bottom: 20px;
  .m-t10{
    word-break: break-all;
    word-wrap: break-word;
    margin-top: 10px;
  }
}
.d-flex{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.module_close{
  display: flex;
  justify-content: flex-end;
}
</style>

