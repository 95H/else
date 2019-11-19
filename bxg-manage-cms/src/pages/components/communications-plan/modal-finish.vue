<template >
   <Modal
    title="标记完成"
    v-model= "isFinishModalshow"
    class-name="vertical-center-modal"
    width="900"
    :mask-closable="false"
    :loading="loading"
    @on-ok="asyncOK"
    @on-cancel="cancel">
    <Form v-if="finishModalData.length>0" ref="formValidate" :model="formValidate">
      <FormItem prop="gender">
        <RadioGroup style="width:100%;" v-model="formValidate.gender" @on-change="changeRadio">
          <div class="bottom-line" v-for="(item, index) in finishModalData" :key="index">
            <div v-if="item.studentTaskId">
              <Radio :label="item.id">
                <Icon :type="'social-'+item.id"></Icon>
              </Radio>
              <span><strong>阶段名称：</strong>{{item.stageName}}</span>&emsp;&emsp;&emsp;<span><strong>任务目标：</strong>{{item.taskName}}</span>
              <p style="margin-left:35px;" class="m-t10"><strong>任务要求：</strong>{{item.taskRemark}}</p>
            </div>
            <div v-else>
              <Radio :label="item.id">
                <Icon :type="'social-'+item.id"></Icon>
              </Radio>
              <span><strong v-if="type==1">导师：</strong><strong v-else>班主任：</strong>{{item.creator}}</span>&emsp;&emsp;&emsp;<span><strong>时间：</strong>{{item.createTime}}</span>
            </div>
            <div v-if="item.type==0">
              <div style="margin-left:35px;" v-if="item.studentTaskId" class="task-finish">
                  <p v-if="!!item.scored" class="m-t10"><strong>任务评分：</strong><Rate class="star" allow-half disabled :value="item.taskScore"/></p>
                  <p v-if="!!item.scored" class="m-t10"><strong>任务说明：</strong>{{item.taskComment}}</p>
              </div>
              <div style="margin-left:35px;">
                <p v-if="!!item.studentTaskId" class="m-t10"><span><strong v-if="type==1">导师：</strong><strong v-else>班主任：</strong>{{item.creator}}</span>&emsp;&emsp;&emsp;<span><strong>时间：</strong>{{item.createTime}}</span></p>
                <p class="m-t10"><strong>沟通要点：</strong>{{item.essential}}</p>
                <p class="m-t10"><strong>评价：</strong>{{item.comment}}</p>
                <h5 class="m-t10">学习效果风险评估：</h5>
                <div style="margin-left:20px;">
                  <p class="m-t10" v-if="item.riskEffectStatus==0"><strong>目前状态：</strong>正常</p>
                  <p class="m-t10" v-else-if="item.riskEffectStatus==1"><strong>目前状态：</strong>预警</p>
                  <p class="m-t10" v-else-if="item.riskEffectStatus==2"><strong>目前状态：</strong>问题</p>
                  <p class="m-t10"><strong>原因：</strong>{{item.riskReason}}</p>
                </div>
              </div>
            </div>
            <div v-if="item.type==1">
              <div v-if="item.contactState != null" style="margin-left:35px;">
                <p class="m-t10" v-if="item.contactState==0"><strong>是否失联：</strong>失联</p>
                <p class="m-t10" v-if="item.contactState==1"><strong>是否失联：</strong>未失联</p>
                <p class="m-t10"><strong>备注：</strong>{{item.contactRemark}}</p>
              </div>
              <div v-else style="margin-left:35px;">
                <p class="m-t10"><strong>沟通要点：</strong>{{item.essential}}</p>
                <p class="m-t10"><strong>评价：</strong>{{item.comment}}</p>
                <p class="m-t10" v-if="item.riskStudyStatus==0"><strong>学习状态评估：</strong>正常</p>
                <p class="m-t10" v-else-if="item.riskStudyStatus==1"><strong>学习状态评估：</strong>预警</p>
                <p class="m-t10" v-else-if="item.riskStudyStatus==2"><strong>学习状态评估：</strong>问题</p>
                <p class="m-t10"><strong>原因：</strong>{{item.riskReason}}</p>
              </div>
            </div>
          </div>
        </RadioGroup>
      </FormItem>
    </Form>
    <div v-else class="no-record">
      目前还没有沟通记录！
    </div>
  </Modal>
</template>

<script>
import api from '@/api/index'
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
export default {
  props: ['isFinishModal', 'finishModalData', 'planId', 'type'],
  data() {
    return {
      loading: true,
      communication_id: null,
      formValidate: {
        gender: ''
      }
    }
  },
  computed:{
    isFinishModalshow: {
      get() {
        return this.isFinishModal
      },
      set(val) {
        this.$emit('update:isFinishModal', val)
      }
    }
  },
  methods:{
    //关闭弹窗
    cancel() {
      this.$refs.formValidate && this.$refs.formValidate.resetFields();
    },
    changeRadio(val){
      this.communication_id = val
    },
    asyncOK(){
      if(this.communication_id){
        api.patchFinishPlan({
          planId: this.planId,
          communicationId: this.communication_id
        }).then(res=>{
          if(res.status == 201){
            this.$Message.success('标记成功！');
            this.$refs.formValidate.resetFields();
            this.$parent.$parent.fecthPlans()
            this.loading = false;
            this.communication_id = null;
            this.isFinishModalshow = false
          }
        })
      }else{
        this.loading = false;
        this.$Message.warning('请选择标记项！');
      }
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
.task-finish{
  /deep/ .star{
    font-size: 20px;
  }
}
.bottom-line{
  width: 100%;
  border-bottom: 2px solid #949494;
  margin-bottom: 20px;
  padding-bottom: 20px;
  .m-t10{
    word-break: break-all;
    word-wrap: break-word;
    margin-top: 10px;
  }
}
.no-record{
  text-align: center;
  line-height: 60px;
  font-weight: 800;
  font-size: 16px;
}
</style>

