<template>
      <Modal
        title="权限管理"
        v-model="modal"
        class-name="vertical-center-modal"
        :mask-closable="false" 
        @on-ok="asyncOK"  
        :loading="loading"
        width="900px"
         @on-cancel="cancel">
         <Form v-if="modal" ref="formValidate" :label-width="80">
            <FormItem label="观看权限:">
                <RadioGroup v-model="ptag" @on-change="handerGetTag">
                    <Radio label="NONE">需登录</Radio>
                    <Radio label="ALL">不需登录</Radio>
                </RadioGroup>
            </FormItem>
             <FormItem label="查看范围:" v-if="isTagShow">
                <RadioGroup v-model="tag" @on-change="handerGetcTag">
                    <Radio label="ALL_USER">全员</Radio>
                    <Radio label="SUBJECT">按学科</Radio>
                    <Radio label="COURSE">按课程</Radio>
                    <Radio label="USER">自定义</Radio>
                </RadioGroup>
            </FormItem>
                <Row v-if="isXueke">
                     <Col span="12">
                     <FormItem label="选择学科:">
                        <Select 
                        v-model="xuekes"
                        :label-in-value="true" 
                        multiple 
                        @on-change="v=>{ getMenuIds(v)}" 
                        placeholder="请选择">
                            <Option v-for="(item,index) in menus" :key="index" :value="item.menuId">
                                {{item.menuName}}
                            </Option>
                        </Select>
                    </FormItem>
                     </Col>
                    <Col span="12">
                     <FormItem label="课程类型:">
                          <Select
                           v-model="xuekeType"
                           @on-change="v=>{ getkcType(v)}">
                            <Option value="-1">全部</Option>
                            <Option value="0">就业课</Option>
                            <Option value="1">微课</Option>
                        </Select>
                    </FormItem>
                     </Col>
                </Row>  
                <Row v-if="isKecheng">
                    <Col span="24">
                         <FormItem label="课程名称:">
                           <Select v-model="kechengs" multiple filterable>
                             <Option v-for="item in course" :value="item.id" :key="item.id">{{ item.gradeName }}</Option>
                           </Select>
                        </FormItem>
                    </Col>
                </Row> 
                <Row v-if="isXueyuan">
                    <Col span="24">
                      <Shuttle-box
                        ref="ShuttleBox"
                        :liveId="liveId"
                        :itcastUUIDs="itcastUUIDs"></Shuttle-box>
                    </Col>
                </Row> 
        </Form>
    </Modal>
</template>

<script>
import api from "@/api/index";
import { mapActions, mapState, mapMutations } from "vuex";
import ShuttleBox from "./Shuttle-box";
export default {
  name: "qx-modal",
  components: {
    ShuttleBox
  },
  data() {
    return {
      modal: this.isQxShowFlag,
      loading: true,
      isTagShow: true,
      isXueke: false, //学科
      isKecheng: false, //课程
      isXueyuan: false, //学员
      ptag: "NONE",
      tag: "ALL_USER",
      xuekes: [],
      xuekeType: "-1",
      kechengs: "",
      xueyuans: [],
      itcastUUIDs: []
    };
  },
  mounted() {
    this.getLiveCourseData();
  },
  props: {
    isQxShowFlag: Boolean,
    liveId: Number
  },
  methods: {
    ...mapActions(["getLiveCourse"]),
    getLiveCourseData() {
      this.getLiveCourse();
    },
    getMenuIds(val) {
      for (let i = 0; i < val.length; i++) {
        const element = val[i];
        this.xuekes[i] = element.value;
      }
    },
    getkcType(val) {
      this.xuekeType = val;
    },
    asyncOK() {
      setTimeout(async () => {
        this.loading = false;
        let requireData = {};
        requireData.tag = this.tag;
        requireData.liveId = this.liveId;
        if (this.tag === "SUBJECT") {
          if (!this.xuekes.length) {
            this.$Message.error("请选择学科");
            this.modal = false;
            return false;
          }
          requireData.subjects = [];

          for (let i = 0; i < this.xuekes.length; i++) {
            const subjectId = this.xuekes[i];
            requireData.subjects[i] = {
              subjectId: subjectId,
              courseType: this.xuekeType > -1 ? parseInt(this.xuekeType) : null
            };
          }
        } else if (this.tag === "COURSE") {
          if (!this.kechengs) {
            this.$Message.error("课程名称不能为空");
            this.modal = false;
            return false;
          }
          requireData.courseIds = this.kechengs;
        } else if (this.tag === "USER") {
          this.xueyuans = [];
          let useData = this.$refs.ShuttleBox.rightData;
          for (let i = 0; useData.length > i; i++) {
            this.xueyuans.push(useData[i].itcastUUID);
          }
          if (!this.xueyuans) {
            this.$Message.error("自定义学员不能为空");
            this.modal = false;
            return false;
          }
          requireData.userIds = this.xueyuans;
        }
        (async () => {
          this.loading = true;
          let result = await api.postPermissions(requireData);
          if (result === "OK") {
            this.$Message.success("设置权限成功");
            this.$emit("refreshList");
          } else {
            this.$Message.error(result);
          }
          this.modal = false;
        })();
        this.$nextTick(() => {
          this.loading = true;
        });
      }, 500);
    },
    cancel() {
      this.isXueke = false;
      this.isKecheng = false;
      this.isXueyuan = false;
      this.xuekes = [];
      this.xuekeType = "";
      this.kechengs = "";
      this.xueyuans = [];
    },
    handerGetTag(value) {
      this.isXueke = false;
      this.isKecheng = false;
      this.isXueyuan = false;
      if (value === "ALL") {
        this.isTagShow = false;
        this.xuekes = [];
        this.xuekeType = "";
        this.kechengs = "";
        this.xueyuans = [];
        this.ptag = "ALL";
        this.tag = value;
      } else {
        this.isTagShow = true;
        this.ptag = "NONE";
        this.tag = "ALL_USER";
      }
    },
    handerGetcTag(value) {
      this.ptag = "NONE";
      switch (value) {
        case "SUBJECT":
          this.isXueke = true;
          this.isKecheng = false;
          this.isXueyuan = false;
          break;
        case "COURSE":
          this.isXueke = false;
          this.isKecheng = true;
          this.isXueyuan = false;
          break;
        case "USER":
          this.isXueke = false;
          this.isKecheng = false;
          this.isXueyuan = true;
          break;
        default:
          this.isXueke = false;
          this.isKecheng = false;
          this.isXueyuan = false;
          this.tag = value;
          break;
      }
    },
    async getPermissions(id) {
      this.isXueke = false;
      this.isKecheng = false;
      this.isXueyuan = false;
      this.xuekes = [];
      this.xuekeType = "-1";
      this.kechengs = "";
      this.xueyuans = [];
      this.itcastUUIDs = [];
      let result = await api.getPermissions({
        liveId: id
      });
      if (result.tag === "NONE") {
        this.isTagShow = true;
        this.ptag = "";
        this.tag = "";
      } else if (result.tag === "ALL") {
        this.isTagShow = false;
        this.ptag = "ALL";
        this.tag = "ALL";
      } else {
        this.ptag = "NONE";
        this.isTagShow = true;
        this.tag = result.tag;
        if (result.tag === "SUBJECT") {
          this.isXueke = true;
          this.xuekes = result.subjects.map((item, index) => {
            return item.subjectId;
          });
          console.log(result.subjects[0].courseType);
          this.xuekeType =
            result.subjects[0].courseType != null
              ? result.subjects[0].courseType + ""
              : "-1";
        } else if (result.tag === "COURSE") {
          this.isKecheng = true;
          this.kechengs = result.courseIds;
        } else if (result.tag === "USER") {
          this.isXueyuan = true;
          this.xueyuans = result.userIds;
          this.itcastUUIDs = result.userIds;
        }
      }
    }
  },
  computed: {
    ...mapState({
      menus: state => state.liveku.menus,
      teachers: state => state.liveku.teachers,
      course: state => state.liveku.course
    })
  },
  watch: {
    isQxShowFlag(val) {
      this.modal = val;
    },
    modal(val) {
      this.$emit("update:isQxShowFlag", val);
    }
  }
};
</script>

<style>
</style>
