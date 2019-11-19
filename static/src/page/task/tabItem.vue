<template>
  <div class="ulBox">
    <ul class="clear leftItem">
      <li
        ref="tabItem"
        :title="item.title?item.title:item.typeName"
        v-for="(item,index) in tabs"
        :key="index"
        :class="{active:index == num}"
        @click="tabItem(index, item.id, item.fId)"
      >{{item.title?item.title:item.typeName}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num: 0,
      tabs: [],
      topNav: this.$store.state.topList
    };
  },
  props: ["componentsType", "leftListArr"],
  methods: {
    tabItem(index, id, fId) {
      this.num = index;
      this.$emit("tabItem", id, fId);
    },
    listFunc() {
      var _this = this;
      //侧边导航赋值
      this.$http
        .post("/api/fieldinvestigation/getTitleList", {
          investigationId: this.$store.state.dataObj.fId,
          surveyContent: this.componentsType
        })
        .then(function(data) {
          if (data.data.count == 0) {
            _this.$emit("tabItem", "");
          } else {
            for (const key in data.data) {
              switch (key) {
                case "bankList":
                  _this.tabs = data.data.bankList;
                  break;
                case "cashList":
                  _this.tabs = data.data.cashList;
                  break;
                case "investigacreditorList":
                  _this.tabs = data.data.investigacreditorList;
                  break;
                case "investigageneralequipmentList":
                  _this.tabs = data.data.investigageneralequipmentList;
                  break;
                case "investigaHouseList":
                  _this.tabs = data.data.investigaHouseList;
                  break;
                case "investigaimportedequipmentList":
                  _this.tabs = data.data.investigaimportedequipmentList;
                  break;
                case "investigaindustrialboilerList":
                  _this.tabs = data.data.investigaindustrialboilerList;
                  break;
                case "investigainventoryList":
                  _this.tabs = data.data.investigainventoryList;
                  break;
                case "investigalargequipmentList":
                  _this.tabs = data.data.investigalargequipmentList;
                  break;
                case "investigaliftingequipmentList":
                  _this.tabs = data.data.investigaliftingequipmentList;
                  break;
                case "investigaparcelstatusList":
                  _this.tabs = data.data.investigaparcelstatusList;
                  break;
                case "investigapressurevesselList":
                  _this.tabs = data.data.investigapressurevesselList;
                  break;
                case "investigastructureList":
                  _this.tabs = data.data.investigastructureList;
                  break;
                case "investigavehicleList":
                  _this.tabs = data.data.investigavehicleList;
                  break;
                default:
              }
            }
            for (var j = 0; j < _this.tabs.length; j++) {
              if (_this.tabs[j].typeName) {
                _this.tabs[j].title = _this.tabs[j].typeName;
              } else {
                if (!_this.tabs[j].title) {
                  _this.tabs[j].title =
                    _this.topNav[_this.componentsType] + (j + 1);
                }
              }
            }
            _this.$emit("tabItem", _this.tabs[0].id);
          }
        })
        .catch(function(error) {
          _this.$messageError(error);
        });
    }
  },
  watch: {
    componentsType: {
      handler(n, o) {
        if (this.$store.state.dataObj.listType != "manuscript") {
          this.listFunc();
        } else {
          for (var i = 0; i < this.leftListArr.length; i++) {
            this.leftListArr[i].title = this.leftListArr[i].userName;
          }
          this.tabs = this.leftListArr;
          this.$emit("tabItem", this.tabs[0].id, this.tabs[0].fId);
        }
      },
      immediate: true
    }
  }
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.ulBox {
  border: 1px solid rgba(229, 229, 229, 1);
  background: rgba(248, 248, 248, 1);
  margin-top: 5px;
  margin-right: 5px;
  .leftItem {
    li {
      width: 82px;
      height: 24px;
      border: solid 1px #e5e5e5;
      border-left: none;
      border-bottom: none;
      line-height: 24px;
      background: #f8f8f8;
      font-size: 12px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(38, 38, 40, 1);
      color: #262628;
      text-align: center;
      border-right: none;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    li:first-child {
      border-top: none;
    }
    li:last-child {
      border-bottom: solid 1px #e5e5e5;
    }
    li.active {
      background: #5fa9ec;
      color: #fff;
    }
    li:hover {
      background: #5fa9ec;
      color: #fff;
      cursor: pointer;
    }
  }
}
</style>