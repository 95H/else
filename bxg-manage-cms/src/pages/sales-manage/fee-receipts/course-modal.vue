<template>
    <Modal
        title="更换课程"
        v-model="modal"
        class-name="vertical-center-modal"
        :mask-closable="false" 
        @on-ok="asyncOK"  
        :loading="loading"
         @on-cancel="cancel">
        <div v-if="modal">
            <Row class="marginb20">
                <Col span="24">
                    原课程：{{courses.beforeCourseId}}-{{courses.courseName}}
                </Col>
            </Row>
            <Row>
                <Col span="3" class="lineh32">
                   <span> 新课程：</span>
                </Col>
                <Col span="12">
                       <Select v-model="afterCourseId" filterable>
                         <Option v-for="item in coursesArr" class="Options" :title="item.gradeName" :value="item.id" :key="item.id">{{item.id}}-{{ item.gradeName }}</Option>
            </Select>
                </Col>
            </Row>
          <p class="red margin-top-20" style="display: block">提示：更换课程后，需在OA系统填写《学员流向及费用内部转移凭单》提交财务审核</p>
        </div>
    </Modal>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      modal: false,
      loading: true,
      afterCourseId: 0,
      coursesArr: []
    };
  },
  props: {
    courses: Object
  },
  methods: {
    asyncOK() {
      setTimeout(async () => {
        this.loading = false;
        let result = await api.postChangeFepositCourse({
          depositId: this.courses.depositId,
          beforeCourseId: this.courses.beforeCourseId,
          afterCourseId: this.afterCourseId
        });
        this.loading = true;
        if (result.status == 200) {
          this.$emit("handleRefresh");
          this.$Message.success("更换课程成功");
        } else {
          this.$Message.error(result.message);
        }
        this.afterCourseId = 0;
        this.modal = false;
        this.$nextTick(() => {
          this.loading = true;
        });
      }, 500);
    },
    cancel() {
      this.afterCourseId = 0;
    },
    async getQueryCondition4ChangeCourse() {
      let result = await api.getQueryCondition4ChangeCourse();
      if (result.status == 200) {
        this.coursesArr = result.result;
      }
    }
  },
  computed: {
    result() {
      console.log(133);
      return 123;
    }
  }
};
</script>

<style>
.lineh32 {
  line-height: 32px;
}
.marginb20 {
  margin-bottom: 20px;
  line-height: 32px;
}
</style>
