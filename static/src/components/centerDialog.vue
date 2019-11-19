<template>
	<div v-if="dialogFlag">
		<div class="centerDialog" :style="{'width':dialogWidth,'height': dialogHeight}">
			<div class="center-title">
				<div :style="{'text-align':titlePosition}">
					{{dialogTitle}}
				</div>
				<a class="closeBtn" @click="closeDialog">
					<i class="iconfont icon-caidan gray fw600" v-if="dialogTitle == '意见详情'"></i>
					<a class="iconfont icon-shanchu" v-else ></a>
				</a>
			</div>
			<div class="center-body">
				<slot name="dialogContent"></slot>
			</div>
		</div>
		<div class="mask"></div>
	</div>
</template>

<script>
export default {
  name: "centerDialog",
  props: {
    titlePosition: {
      type: String,
      default: "center"
    },
    dialogTitle: {
      type: String,
      default: "提示信息"
    },
    dialogWidth: {
      type: String,
      default: "500px"
    },
    dialogHeight: {
      type: String,
      default: "300px"
    }
  },
  data() {
    return {
      dialogFlag: false
    };
  },
  created() {},
  methods: {
    showDialog(callback) {
      this.dialogFlag = true;
      setTimeout(function() {
        callback && callback();
      });
    },
    closeDialog() {
      this.dialogFlag = false;
      if (this.dialogTitle == "意见详情") {
        this.$emit("openOpinionDetail");
      } else if (this.dialogTitle == "选择人员") {
        this.$emit("centerCanclePreson");
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.centerDialog {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  z-index: 1011;
  box-sizing: border-box;
}
.mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1010;
  content: "";
}
.center-title {
  height: 40px;
  background: #f6faff;
  border: 1px solid #e5e5e5;
  position: relative;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  color: #262628;
  padding: 0 20px;
}
.closeBtn {
  position: absolute;
  right: 10px;
  top: 11px;
  cursor: pointer;
  width: 18px;
  height: 18px;
  line-height: normal;
}
.icon-caidan:hover {
  color: #3a80ec !important;
}
.icon-shanchu {
  cursor: pointer;
  width: 18px;
  height: 18px;
  color: #c0c0c0;
}
.icon-shanchu:hover {
  color: #f09237 !important;
}
.center-body {
  padding: 20px;
  background: #fff;
  border: 1px solid #e5e5e5;
  margin-top: -1px;
  box-sizing: border-box;
  overflow: hidden;
  position: absolute;
  top: 40px;
  bottom: 0;
  width: 100%;
}


</style>
