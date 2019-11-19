<template>
    <div>
      <Row>
        <Col span="10">
          
             <div style="margin-bottom:23px;">
                <Select filterable v-model="leftInit.menuIds" placeholder="学科" @on-change=" v=> {getLeftCourseIds(v)}" style="width: 138px;margin-right:20px;">
                <Option v-for="(item, index) in menus" :key="item.menuId" :value="item.menuId" class="Option">{{item.menuName}}</Option>
              </Select>
        
              <Select filterable v-model="leftInit.courseIds" placeholder="课程" style="width: 200px">
                <Option v-for="(item, index) in course" :key="item.id" :value="item.id" class="Option">{{item.gradeName}}</Option>
              </Select>
             </div>
         
            <div style="margin-bottom:23px;">
                <Input v-model="leftInit.userSearchCondition" placeholder="UID/用户名/账号" style="width: 200px;margin-right:10px;"></Input>
          
            <Button style="margin-right:8px;" type="primary" icon="md-search" @click="search">搜索</Button>
            <Button @click="searchInit('ALL')" style="margin-left: 5px">清除</Button>
            </div>
        
            <Table border ref="selection" class="ShuttleBoxTabLeft" @on-selection-change="leftChangeData" :columns="columns" :data="leftData.items"></Table>
             <Page placement="top" style="text-align: left;margin-top:20px;padding-bottom: 1px"
                  :total="leftData.totalCount"
                  :page-size="leftInit.pageSize"
                  @on-change="handleCurrentChange"
                  @on-page-size-change="handlePageSize"
                  :current="leftInit.currentPage"
                  :transfer="true"
                  show-elevator show-sizer  >
            </Page>
        </Col>
        <Col span="3" style="text-align: center; vertical-align: middle;display: flex;justify-content: space-around;margin-top: 117px">
          <Button type="primary" icon="ios-arrow-back" @click="rightMoveLeft"></Button>
          <Button type="primary" icon="ios-arrow-forward" @click="leftMoveRight"></Button>
        </Col>
        <Col span="10">
         <div class="active-box">
            <Table border ref="selection" class="ShuttleBoxTabFight" @on-selection-change="rightChangeData" :columns="columns" :data="rightData"></Table>
         </div>
        </Col>
      </Row>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import api from "@/api/index";
export default {
  name: "Shuttle-box",
  data() {
    return {
      leftInit: {
        currentPage: 1,
        pageSize: 10,
        liveId: this.liveId,
        type: "ALL",
        menuIds: [],
        courseIds: [],
        userSearchCondition: ""
      },
      menus: {},
      courseIds: [],
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "UID",
          width: 100,
          key: "itcastUUID",
          align: "right"
        },
        {
          title: "用户账号",
          width: 200,
          key: "loginName",
          align: "right"
        }
      ],
      leftData: {},
      data: [
        {
          loginName: 1,
          itcastUUID: 2,
          _disabled: true
        }
      ],
      rightData: [],
      pitchOn: [],
      pitchOn1: []
    };
  },
  props: {
    liveId: Number,
    itcastUUIDs: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  mounted() {
    this.getLiveCourse();
    this.getMenuIds();
    this.returnData(this.itcastUUIDs);
    this.getLiveUseAll({
      currentPage: 1,
      pageSize: 10,
      liveId: this.liveId,
      type: "ALL"
    });
  },
  methods: {
    ...mapActions(["getLiveCourse"]),
    handleCurrentChange(num) {
      this.leftInit.currentPage = num;
      this.getLiveUseAll(this.leftInit);
    },
    handlePageSize(size) {
      this.leftInit.pageSize = size;
      this.getLiveUseAll(this.leftInit);
    },
    async getMenuIds() {
      //获取学科
      await api.fetchMenus().then(ref => {
        if (ref.status === 200) {
          if (ref.result) {
            this.menus = ref.result;
          }
        } else {
          this.$Message.error(ref.message);
        }
      });
    },
    async getLeftCourseIds(id) {
      this.$store.state.liveku.course = [];
      //获取课程
      let params = {
        menuIds: id
      };
      this.getLiveCourse(params);
    },
    search() {
      this.getLiveUseAll(this.leftInit);
    },
    searchInit(type) {
      //清空
      this.leftInit = {
        currentPage: 1,
        pageSize: 10,
        liveId: this.liveId,
        type: "ALL",
        menuIds: [],
        courseIds: [],
        userSearchCondition: ""
      };
      this.getLiveUseAll(this.leftInit);
    },
    leftChangeData(selection) {
      //勾选
      this.pitchOn = selection;
    },
    rightChangeData(selection) {
      this.pitchOn1 = selection;
    },
    dataDisabled() {
      for (var i = 0; this.leftData.items.length > i; i++) {
        var leftUid = this.leftData.items[i].itcastUUID;
        for (var k = 0; this.rightData.length > k; k++) {
          var rightUid = this.rightData[k].itcastUUID;
          if (rightUid === leftUid) {
            this.$set(this.leftData.items[i], "_disabled", true);
          }
        }
      }
    },
    leftMoveRight() {
      this.rightData = this.rightData.concat(this.pitchOn);
      this.dataDisabled();
    },
    rightMoveLeft() {
      // 右侧到左侧
      for (var i = 0; this.leftData.items.length > i; i++) {
        var leftUid = this.leftData.items[i].itcastUUID;
        for (var k = 0; this.pitchOn1.length > k; k++) {
          var rightUid = this.pitchOn1[k].itcastUUID;
          if (rightUid === leftUid) {
            this.leftData.items[i]._disabled = false;
            for (var y = 0; this.rightData.length > y; y++) {
              if (this.rightData[y].itcastUUID === rightUid) {
                this.rightData.splice(y, 1);
              }
            }
          } else {
            for (var y = 0; this.rightData.length > y; y++) {
              if (this.rightData[y].itcastUUID === rightUid) {
                this.rightData.splice(y, 1);
              }
            }
          }
        }
      }
    },
    getLiveUseAll(params) {
      //获取用户数据
      api.getLiveUseAll(params).then(ref => {
        if (ref.status === 200) {
          if (ref.result) {
            this.leftData = ref.result;
            this.dataDisabled();
          } else {
            this.leftData = {
              items: []
            };
          }
        } else {
          this.$Message.error(ref.message);
        }
      });
    },
    returnData(params) {
      let param = params;
      let data = {
        itcastUUIDs: param.join(",")
      };
      api.getLiveUseAll(data).then(ref => {
        if (ref.status === 200) {
          if (ref.result) {
            this.rightData = ref.result;
          }
        }
      });
    }
  },
  computed: {
    course() {
      return (this.courseIds = this.$store.state.liveku.course);
    }
  }
};
</script>

<style lang="less">
.ShuttleBoxTabLeft,
.ShuttleBoxTabFight {
  display: inline-block;
}
/* 
.Option {
  width: 83px;
  overflow: hidden;
  text-overflow: ellipsis;
} */
.active-box {
  margin-top: 112px;
  position: relative;
  .ivu-table-header {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 111;
  }
  .ivu-table-body {
    margin-top: 40px;
    height: 480px;
    overflow: auto;
  }
  .ivu-table-tip {
    padding-top: 40px;
  }
}
</style>
