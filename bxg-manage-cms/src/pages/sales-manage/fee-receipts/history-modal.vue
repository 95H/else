<template>
     <Modal
        title="更换课程历史"
        v-model="modal"
        class-name="vertical-center-modal"
        :mask-closable="false" 
        @on-ok="syncOK"  
        @on-cancel="cancel">
        <Table border :columns="columns" :data="historyData"></Table>
    </Modal>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      modal: false,
      historyData: [],
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 60
        },
        {
          title: "更换前",
          key: "beforeCourseName"
        },
        {
          title: "更换后",
          key: "afterCourseName"
        }
      ]
    };
  },
  methods: {
    syncOK() {},
    cancel() {},
    async getCourselogs(depositId) {
      let result = await api.getCourselogs({
        depositId: depositId
      });
      if (result.status == 200) {
        this.historyData = result.result;
      }
    }
  }
};
</script>

<style>
</style>
