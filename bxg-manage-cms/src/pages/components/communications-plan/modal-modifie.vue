<template>
  <Modal
    title="修改计划"
    v-model= "isModifieModalshow"
    class-name="vertical-center-modal"
    width="600"
    :loading="loading"
    :mask-closable="false"
    @on-ok="asyncOK"
    @on-cancel="cancel">
    <Form ref="formModifie" :model="formModifie" :rules="ruleModifie">
      <Row :gutter="40">
        <Col>
          <FormItem label="*选择阶段群：">
            <Select disabled :placeholder="modifieParams && modifieParams.stageGroupName">
            </Select>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="*选择学员：">
            <Select disabled :placeholder="modifieParams && modifieParams.studentName">
            </Select>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="*沟通人：">
            <Select disabled :placeholder="modifieParams && modifieParams.communicationPersonName">
            </Select>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="完成时间：" prop="modifieTimes">
            <DatePicker type="date" :options="optionsDate" style="width:100%" :placeholder="modifieParams && modifieParams.finishTime" v-model="formModifie.modifieTimes"></DatePicker>
          </FormItem>
        </Col>
        <Col>
          <FormItem label="内容：" prop="modifieContent">
            <Input type="textarea" :autosize="{minRows: 4}" :placeholder="modifieParams && modifieParams.content" v-model="formModifie.modifieContent" />
            <p style="text-align:right;color:#ccc">500字</p>
          </FormItem>
        </Col>
      </Row>
    </Form>
  </Modal>
</template>

<script>
import dateUtil from "iview/src/utils/date";
import api from '@/api/index'
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
export default {
  props: ['isModifieModal', 'modifieParams'],
  data() {
    let self = this
    return {
      loading: true,
      optionsDate: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000;
        }
      },
      formModifie: {
        modifieTimes: '',
        modifieContent: ''
      },
      ruleModifie: {
        modifieTimes:[
          {
            required: true,
            message: '完成时间不能为空！'
          }
        ],
        modifieContent:[
          {
            max: 500,
            message: '最多输入500字',
            trigger: 'blur'
          }
        ]
      },
    }
  },
  computed:{
    isModifieModalshow: {
      get() {
        return this.isModifieModal
      },
      set(val) {
        this.$emit('update:isModifieModal', val)
      }
    }
  },
  methods:{
    // changeValTime(date){
    //   this.formModifie.modifieTimes = date
    // },
    //关闭弹窗
    cancel() {
      this.$refs.formModifie.resetFields();
    },
    //确定
    asyncOK() {
      this.$refs.formModifie.validate(valid => {
        if (!valid) {
          this.loading = false
          this.$nextTick(() => {
            this.loading = true
          })
          return
        }

        this.formModifie.modifieTimes = dateUtil.format(
          this.formModifie.modifieTimes,
          "yyyy-MM-dd"
        );
        api.patchAbandon({
          planId: this.modifieParams.id,
          type: 2,
          finishTimeStr: this.formModifie.modifieTimes,
          content: this.formModifie.modifieContent
        }).then(res=>{
          if(res.status == 201){
            this.$Message.success('计划已修改！');
            this.$parent.$parent.fecthPlans()
            this.isModifieModalshow = false;
            this.$refs.formModifie.resetFields();
          } else if(res.status == 401){
            this.$Message.error('登录人不是班主任或导师!');
             this.isModifieModalshow = false;
            this.$refs.formModifie.resetFields();
          }else if(res.status == 403){
            this.$Message.error('登录人不是学员所在群的班主任或导师!');
             this.isModifieModalshow = false;
            this.$refs.formModifie.resetFields();
          }else if(res.status == 406){
            this.$Message.error('计划不属于登录人!');
             this.isModifieModalshow = false;
            this.$refs.formModifie.resetFields();
          }else if(res.status == 407){
            this.$Message.error('计划不存在或不是未完成状态!');
             this.isModifieModalshow = false;
            this.$refs.formModifie.resetFields();
          }else if(res.status == 409){
            this.$Message.error('沟通计划角色与登录人当前角色不匹配!');
             this.isModifieModalshow = false;
            this.$refs.formModifie.resetFields();
          }else if(res.status == 410){
            this.$Message.error('计划不存在或已删除!');
             this.isModifieModalshow = false;
            this.$refs.formModifie.resetFields();
          }else{
            this.$Message.error('放弃失败，请稍后重试~');
            this.$refs.formModifie.resetFields();
            this.loading = false;
          }
        })
      })
    },
  },
  watch:{
    modifieParams(val) {
      this.formModifie.modifieTimes = val.finishTime;
      this.formModifie.modifieContent = val.content
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ivu-modal-header{
  border-bottom: none;
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
.module_close{
  display: flex;
  justify-content: flex-end;
}
</style>

