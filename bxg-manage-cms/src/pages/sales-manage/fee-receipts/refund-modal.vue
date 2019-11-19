<template>
    <Modal
        title="退费"
        v-model="modal"
        class-name="vertical-center-modal"
        :mask-closable="false" 
        @on-ok="asyncOK"  
        :loading="loading"
         @on-cancel="cancel">
         <div v-if="refundState=='refund'">
            <div class="body-top">
                <Row>
                    <Col span="12">
                        用户UID:{{refundObj.uid}}
                    </Col>
                    <Col span="12">
                    退费金额：{{refundObj.amount}}
                    </Col>
                </Row>
            </div>
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="退费原因:" prop="reason">
                    <Input v-model="formValidate.reason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入退费原因"></Input>
                </FormItem>
                <FormItem label="退费日期:" prop="bizDate">
                    <DatePicker 
                    type="datetime" 
                    format="yyyy-MM-dd HH:mm:ss"   
                    placeholder="选择退费日期"
                    v-model="formValidate.bizDate">
                    </DatePicker>
                </FormItem>
            </Form>
         </div>
         <div v-else-if="refundState=='refundDetails' && refundDetail">
                <Row class="body-top">
                    <Col span="12">
                        用户UID:{{refundDetail.uid}}
                    </Col>
                    <Col span="12">
                        退费金额：{{refundDetail.amount}}
                    </Col>
                </Row>
                 <Row class="body-top">
                    <Col span="12" style="word-break: break-all;word-wrap: break-word;">
                        退费原因:{{refundDetail.reason}}
                    </Col>
                    <Col span="12">
                        退费日期:{{refundDetail.bizDate}}
                    </Col>
                </Row>
         </div>
    </Modal>
</template>

<script>
import api from "@/api/index";
import dateUtil from "iview/src/utils/date";
export default {
  data() {
    return {
      modal: this.isRefundModal,
      loading: true,
      formValidate: {
        reason: "",
        bizDate: ""
      },
      ruleValidate: {
        reason: [
          {
            required: true,
            message: "退费原因不能为空",
            trigger: "blur"
          },
          {
            type: "string",
            max: 200,
            message: "不能大于200字",
            trigger: "blur"
          }
        ],
        bizDate: [
          {
            required: true,
            type: "date",
            message: "退费日期不能为空",
            trigger: "change"
          }
        ]
      }
    };
  },
  props: {
    refundState: String,
    isRefundModal: Boolean,
    refundObj: Object
  },
  mounted() {
    console.log(this.refundObj);
  },
  methods: {
    asyncOK() {
      if (this.refundState == "refund") {
        setTimeout(() => {
          this.loading = false;
          this.$refs.formValidate.validate(async valid => {
            if (valid) {
              this.loading = true;
              this.formValidate.bizDate = dateUtil.format(
                this.formValidate.bizDate,
                "yyyy-MM-dd HH:mm:ss"
              );
              let params = Object.assign(this.formValidate, this.refundObj);
              console.log(params);
              let result = await api.postSaveDepositRefund(params);
              if (result.status == 200) {
                this.$emit("handleRefresh");
                this.$Message.success("退费操作成功");
                this.$refs.formValidate.resetFields();
              } else {
                this.$Message.error("退费操作失败");
              }
              this.modal = false;
            }
          });
          this.$nextTick(() => {
            this.loading = true;
          });
        }, 500);
      } else {
        this.loading = false;
        this.modal = false;
      }
    },
    refundDetailFn(params) {
      this.$store.dispatch("getDepositRefundDetail", params);
    },

    cancel() {
      if (this.refundState == "refund") {
        this.$refs.formValidate.resetFields();
      }
    }
  },
  computed: {
    refundDetail() {
      return this.$store.state.feeReceipts.refundDetail;
    }
  },
  watch: {
    isRefundModal(val) {
      this.modal = val;
    },
    modal(val) {
      this.$emit("update:isRefundModal", val);
    }
  }
};
</script>

<style>
.body-top {
  padding: 20px 10px;
}
</style>
