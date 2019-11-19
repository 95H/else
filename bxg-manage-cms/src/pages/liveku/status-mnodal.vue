<template>
     <Modal
        v-model="modal"
        class-name="vertical-center-modal"
        :mask-closable="false" 
        @on-ok="asyncOK"  
        :loading="loading"
         @on-cancel="cancel">
         <p slot="header" style="color:#f60;">
            <Icon type="ios-information-circle"></Icon>
            <span>{{status==1?'禁用直播':'开启直播'}}</span>
        </p>
        <Form v-if="status==1">
         <Row>
            <Col span="24" label-position="top">
                <FormItem label="禁用原因:">
                <Input v-model="disableReason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="禁用原因"></Input>
            </FormItem>
            </Col>
        </Row>
        </Form>
        <p style="font-size:16px; text-align: center;" v-else>
            确定要开启吗
        </p>
     </Modal>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      modal: this.isStatusFlag,
      loading: true,
      disableReason: ""
    };
  },
  props: {
    isStatusFlag: Boolean,
    liveId: Number,
    status: Number
  },
  methods: {
    asyncOK() {
      setTimeout(() => {
        this.loading = false;
        if (this.status == 1 && this.disableReason === "") {
          this.$Message.error("禁用原因不能为空");
          return false;
        }
        this.loading = true;
        this.setStateFn({
          liveId: this.liveId,
          targetStatus: this.status == 1 ? 0 : 1,
          disableReason: this.disableReason
        }).then(res => {
          if (res === "OK") {
            let msg = this.status == 1 ? "禁用成功" : "开启成功";
            this.disableReason = "";
            this.$Message.success(msg);
            this.$emit("refreshList");
          } else {
            this.$Message.error(res);
          }
          this.modal = false;
        });
        this.$nextTick(() => {
          this.loading = true;
        });
      }, 500);
    },
    cancel() {},
    async setStateFn(params) {
      let result = await api.setStatus(params);
      return result;
    }
  },
  watch: {
    isStatusFlag(val) {
      this.modal = val;
    },
    modal(val) {
      this.$emit("update:isStatusFlag", val);
    }
  }
};
</script>

<style>
</style>
