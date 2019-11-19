<template>
	<div class="feedbackwrap">
		<div v-if="show" class="mark">
			<div class="Popupbox">
				<div class="PopupTit1">谢谢您的建议，</div>
				<div class="PopupTit2">我们将持续为您改进！</div>
				<div class="PopupTit3"></div>
				<div class="PopupTit4" @click="Mark_hide">确定</div>
			</div>
		</div>
    <div v-if="imges_up" class="mint-indicator-wrapper">
      <span class="mint-indicator-spin">
        <div class="mint-spinner-snake" style="border-top-color: rgb(204, 204, 204); border-left-color: rgb(204, 204, 204); border-bottom-color: rgb(204, 204, 204); height: 32px; width: 32px;">
        </div>
      </span>
      <span class="mint-indicator-text">上传中</span>
    </div>
    <div v-if="getpull_up" class="mint-indicator-wrapper">
      <span class="mint-indicator-spin">
        <div class="mint-spinner-snake" style="border-top-color: rgb(204, 204, 204); border-left-color: rgb(204, 204, 204); border-bottom-color: rgb(204, 204, 204); height: 32px; width: 32px;">
        </div>
      </span>
      <span class="mint-indicator-text">提交中</span>
    </div>
    <div class="feedbackbox">
      <header :class="headerB ?'header iPad': 'header'">
        <div class="headericonLeft" @click="Back"><i class="el-icon-arrow-left"></i></div>
        <div class="headericonCenter">意见反馈</div>
        <div class="headericonRight" @click="getpull">提交</div>
      </header>
      <div class="main">
        <div class="title1">
          <p class="wenti1">(必填)请选择您想反馈的问题点</p>
        </div>
        <div class="title1Wrap">
          <mt-radio v-model="value" :options="options"></mt-radio>
        </div>
        <div class="title1">
          <p class="wenti1">(必填)请补充详细问题和意见</p>
        </div>
        <div class="qingkuang">
          <textarea maxlength="500" minlength="0" @input.prevent="desInput" @blur.prevent="blurInput" v-model="desc" rows="4" class="textadess" placeholder="请填写具体内容帮助我们了解您的问题和意见~"/>
          <div class="limit">{{remnant}}/500</div>
        </div>
        <div class="title3">
          <p class="wenti3"><span class="xinxi3Left">请提供相关问题的截图或照片</span> <span class="xinxi3Right">{{imgs.length}}/4</span></p>
        </div>
        <div class="Imgupload">
          <div class="images" v-for="(item, index) in imgs" :key="index">
            <img :src="item.url">
            <i class="el-icon-circle-close" @click="clearImg(index)"></i>
          </div>
          <div v-if="imgs.length<4" class="loadboxs">
            <input ref="fileelm" class="upload" @change='add_img' type="file">
            <div class="jiashag">
              <i class="el-icon-plus"></i>
              <p class="zhaopians">上传照片</p>
            </div>
          </div>
        </div>
        <div class="title1">
          <p class="wenti1">为方便解决您反馈的问题，请留下联系方式</p>
        </div>
        <div class="phoneBox"><input type="text" v-model="contact" placeholder="请留下真实联系方式（QQ、邮箱）方便我们答疑解惑！" class="phonex" /></div>
      </div>
    </div>
	</div>

</template>
<script>
import { zhugeTrack } from "~/plugins/filter";
import { appBaseUrl, noTarget } from "~/api/apiurl";
import axios from "axios";
export default {
  data() {
    return {
      headerB: "",
      routers: "", //query 参数
      paramsData: {}, //params参数
      show: false,
      value: "",
      options: [
        {
          value: "0",
          label: "功能异常：功能故障或者不能用"
        },
        {
          value: "1",
          label: "产品建议：用着不爽，我有意见"
        },
        {
          value: "2",
          label: "课程反馈：课程问题或资料不完"
        },
        {
          value: "3",
          label: "视频反馈：视频不清晰、声音太小"
        },
        {
          value: "4",
          label: "其他"
        }
      ],
      imgs: [],
      desc: "",
      remnant: 500,
      source: "",
      contact: "", //联系方式
      imges_up: false,
      getpull_up: false
    };
  },
  mounted() {
    this.routers = (function() {
      let qs = decodeURIComponent(
        location.search.length > 0 ? location.search.substring(1) : ""
      ),
        args = {},
        items = qs.length ? qs.split("&") : [],
        item = null,
        name = null,
        value = null,
        i = 0,
        len = items.length;
      for (i = 0; i < len; i++) {
        item = items[i].split("=");
        name = decodeURIComponent(item[0]);
        value = decodeURIComponent(item[1]);
        if (name.length) {
          args[name] = value;
        }
      }
      return args;
    })();
    let header = this.$refs.header,
      a = this.$refs.a;
    if (this.routers.platform === "iPad") {
      this.headerB = "iPad";
    }
    // console.log(this.routers);
  },
  methods: {
    //返回上一级
    Back() {
      this.finishFeedback();
    },
    //判断输入字数
    desInput() {
      var txtVal = this.desc.length;
      this.remnant = 500 - txtVal;
    },
    blurInput() {
      document.body.scrollTop =0
    },
    //添加图片
    add_img(e) {
      let filebtn = e.target.files[0];
      let format = e.target.value,
        fileFormat = /(\.png|\.jpg|\.jpeg|\.gif)$/i,
        fileSizeKb = Math.ceil(filebtn.size / 1024);
      // 文件类型检查
      if (!fileFormat.test(format)) {
        this.imges_up = false;
        this.$toast("图片格式不正确");
        return;
      }
      //图片大小检测
      if (fileSizeKb > 500) {
        this.imges_up = false;
        this.$toast("图片大小超过500KB");
        return;
      }
      //params 参数
      let params = new FormData();
      params.append("file", filebtn);
      params.append("projectName", "online");
      params.append("fileType", 1);
      params.append("sign", localStorage.getItem("sign") || this.routers.sign);
      this.imges_up = true;
      axios({
        method: "post",
        url: "/bxg/attachment/upload4Feedback",
        data: params,
        config: { headers: { "Content-Type": "multipart/form-data" } }
      })
        .then(response => {
          if (response.status === 200) {
            if (response.data.status === 200) {
              this.imges_up = false;
              let imgObj = {
                name: response.data.result.fileName,
                url: response.data.result.url
              };
              this.$toast("图片上传成功");
              this.imgs.push(imgObj);
              this.$refs.fileelm.value = "";
              return;
            } else if (response.data.status === 401) {
              window.location = "/loginRegister/phoneLogin";
              window.localStorage.setItem("redirectUrl", window.location.href);
              return;
            }
          }
        })
        .catch(error => {
          //网络错误
          this.imges_up = false;
          this.$refs.fileelm.value = "";
          this.$toast("网络好像有点问题，请检查后重试~");
        });
    },
    //清空图片
    clearImg(index) {
      this.imgs.splice(index, 1);
    },
    //提交信息
    getpull() {
      if (this.getpull_up) {
        return;
      }
      let patt = /[\ud800-\udbff][\udc00-\udfff]/g;
      if (!this.value) {
        this.$toast("请选择问题类型");
        return false;
      }
      if (!this.desc || !this.desc.trim()) {
        //textarea内容检测
        this.$toast("内容不能为空！");
        return false;
      } else if (patt.test(this.desc)) {
        this.$toast("暂不支持输入表情呦！");
        return false;
      }
      if (this.contact) {
        //检测联系方式
        let contactReg = /^[1-9][0-9]{5,10}$/;
        let emailReg = new RegExp(
          "^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$"
        );
        if (contactReg.test(this.contact) || emailReg.test(this.contact)) {
        } else {
          this.$toast("请输入正确联系方式");
          return false;
        }
      }
      this.getpull_up = true;
      if (this.routers.platform === "h5") {
        this.paramsData = {
          type: this.value,
          content: this.desc,
          contactWay: this.contact,
          sign: localStorage.getItem("sign"),
          attachment: JSON.stringify(this.imgs)
        };
      } else {
        this.paramsData = {
          sign: this.routers.sign,
          courseId: this.routers.courseId,
          phaseType: this.routers.phaseType,
          phaseId: this.routers.phaseId,
          moduleId: this.routers.moduleId,
          sectionId: this.routers.sectionId,
          videoId: this.routers.videoId,
          type: this.value,
          content: this.desc,
          contactWay: this.contact,
          attachment: JSON.stringify(this.imgs),
          collectInfo: this.routers.collectInfo
        };
      }
      // console.log(this.routers, this.paramsData);
      //向服务器发送内容
      axios({
        headers: {
          "bxg-platform": this.routers.platform
        },
        method: "post",
        url: `${noTarget}/bxg/fb/submitFeedback`,
        params: this.paramsData
      })
        .then(response => {
          // console.log(response);
          if (response.status === 200) {
            if (response.data.status === 200) {
              this.getpull_up = false;
              this.show = true;
            } else {
              this.getpull_up = false;
              this.$toast("提交失败！");
            }
          }
        })
        .catch(error => {
          this.getpull_up = false;
          this.$toast("网络好像有点问题，请检查后重试~");
        });
    },
    //点击确定返回上一个路由
    Mark_hide() {
      this.show = false;
      this.finishFeedback();
    },
    //完成反馈后 H5回调App 的接口
    finishFeedback() {
      if (this.routers.platform === "Android") {
        try {
          app.finishFeedback();
        } catch (error) {}
      } else if (
        this.routers.platform === "iPhone" ||
        this.routers.platform === "iPad"
      ) {
        try {
          window.webkit.messageHandlers.app.postMessage({
            name: "finishFeedback",
            para: {}
          });
        } catch (error) {}
      } else {
        this.$router.go(-1);
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../static/css/variable.less";
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  font-size: unit(24 / @u, @uu);
}
.feedbackwrap{
  height: 100%;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
  background: #f5f5f5;
   /*遮罩*/
  .mark {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 9999;
    .Popupbox {
      width: 84.27%;
      background-color: #fff;
      position: fixed;
      z-index: 999;
      text-align: center;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: unit(22 / @u, @uu);
      padding: unit(43 / @u, @uu) 0 0 0;
      .PopupTit1 {
        font-family: PingFangSC-Regular;
        font-size: unit(36 / @u, @uu);
        color: #333333;
        text-align: center;
        line-height: unit(54 / @u, @uu);
      }
      .PopupTit2 {
        font-family: PingFangSC-Regular;
        font-size: unit(36 / @u, @uu);
        color: #333333;
        text-align: center;
        line-height: unit(54 / @u, @uu);
      }
      .PopupTit3 {
        width: 100%;
        border-bottom: 2px solid #f5f5f5;
        margin: unit(43 / @u, @uu) auto 0;
      }
      .PopupTit4 {
        font-family: PingFangSC-Regular;
        font-size: unit(36 / @u, @uu);
        color: #38adff;
        padding: unit(25 / @u, @uu) 0;
      }
    }
  }
  .mint-indicator-wrapper {
    padding: unit(30 / @u, @uu) unit(46 / @u, @uu);
    z-index: 10000;
  }
}
.title1Wrap {
  display: flex;
  flex-direction: column;
}
.title1Wrap /deep/ .mint-cell {
  font-family: PingFangSC-Regular;
  font-size: unit(30 / @u, @uu);
  color: #333333;
  line-height: unit(30 / @u, @uu);
}
.title1Wrap /deep/ .mint-radio-input:checked + .mint-radio-core {
  &:after {
    top: 20%;
    left: 10%;
    content: "";
    border: 2px solid #fff;
    border-top-width: 0;
    border-right-width: 0;
    width: 70%;
    height: 35%;
    border-radius: 0;
    background: rgba(0, 0, 0, 0);
    transform: rotate(-50deg);
  }
}
.feedbackwrap .feedbackbox {
  display: flex;
  flex-direction: column;
  padding-top: unit(100 / @u, @uu);
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: unit(100 / @u, @uu);
    background: #38adff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4%;
    z-index: 998;
    .headericonLeft {
      color: #ffffff;
      i {
        font-size: unit(40 / @u, @uu);
        color: #fff;
      }
    }
    .headericonCenter {
      font-family: PingFangSC-Regular;
      font-size: unit(36 / @u, @uu);
      color: #ffffff;
    }
    .headericonRight {
      font-family: PingFangSC-Regular;
      font-size: unit(30 / @u, @uu);
      color: #ffffff;
    }
  }
  .iPad {
    background: #fff;
    box-shadow: 0px 1px 5px #ccc;
    .headericonLeft i {
      color: #333;
    }
    .headericonCenter {
      color: #333;
    }
    .headericonRight {
      color: #333;
    }
  }
  .main {
    .title1 {
      background: #f5f5f5;
      width: 100%;
      .wenti1 {
        font-family: PingFangSC-Regular;
        font-size: unit(26 / @u, @uu);
        color: #999999;
        line-height: unit(39 / @u, @uu);
        margin-left: 4%;
        padding: unit(31 / @u, @uu) 0 unit(11 / @u, @uu) 0;
      }
    }
    .qingkuang {
      background: #fff;
      margin-top: unit(16 / @u, @uu);
      padding: 0 unit(20 / @u, @uu) unit(24 / @u, @uu) unit(30 / @u, @uu);
      .textadess {
        width: 100%;
        font-family: PingFangSC-Regular;
        font-size: unit(30 / @u, @uu);
        color: #333333;
        line-height: unit(45 / @u, @uu);
        text-align: left;
        outline: none;
        border: none;
        padding-bottom: unit(5 / @u, @uu);
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
      }
      .limit {
        width: 100%;
        display: inline-block;
        font-family: PingFangSC-Regular;
        font-size: unit(24 / @u, @uu);
        color: #999999;
        text-align: right;
        line-height: unit(24 / @u, @uu);
      }
    }
    .title3 {
      background: #f5f5f5;
      width: 100%;
      .wenti3 {
        display: flex;
        justify-content: space-between;
        font-family: PingFangSC-Regular;
        font-size: unit(26 / @u, @uu);
        color: #999999;
        line-height: unit(39 / @u, @uu);
        margin-left: 4%;
       padding: unit(31 / @u, @uu) unit(31 / @u, @uu) unit(11 / @u, @uu) 0;

      }
    }
    .Imgupload {
      display: flex;
      background: #fff;
      margin-top: unit(16 / @u, @uu);
      padding: unit(32 / @u, @uu) unit(32 / @u, @uu) unit(32 / @u, @uu)
        unit(32 / @u, @uu);
      div {
        position: relative;
        width: 20%;
        margin-right: 6.5%;
        &:last-of-type {
          margin-right: 0;
        }
      }
      .images {
        position: relative;
        width: 20% !important;
        height: 19vw;
        img {
          display: block;
          width: 100%;
          height: 19vw;
        }
        i {
          position: absolute;
          color: #666;
          top: -0.8vw;
          right: -0.95vw;
          z-index: 998;
          font-size: 3vw;
        }
      }
      .loadboxs {
        position: relative;
        width: 20%;
        border: 1px solid #cccccc;
        border-radius: unit(4 / @u, @uu);
        .jiashag {
          position: relative;
          width: 100%;
          height: 19vw;
          font-size: unit(56 / @u, @uu);
          color: #cccccc;
          i {
            position: absolute;
            top: 20%;
            left: 50%;
            font-size: 5.6vw;
            transform: translateX(-50%);
          }
          .zhaopians {
            width: 100%;
            text-align: center;
            position: absolute;
            bottom: 20%;
            left: 50%;
            transform: translateX(-50%);
            font-family: PingFangSC-Regular;
            font-size: 2.6vw;
            color: #999999;
          }
        }
        .upload {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 20vw;
          opacity: 0;
          z-index: 10;
        }
      }
      // .size {
      //   position: absolute;
      //   width: 120%;
      //   bottom: 0;
      //   font-size: unit(24 / @u, @uu);
      //   left: unit(23 / @u, @uu);
      //   color: red;
      // }
    }
    .phoneBox {
      padding: unit(22 / @u, @uu) unit(30 / @u, @uu);
      margin-bottom: unit(40 / @u, @uu);
      margin-top: unit(18 / @u, @uu);
      background: #fff;
      .phonex {
        width: 100%;
        font-family: PingFangSC-Regular;
        font-size: unit(30 / @u, @uu);
        color: #000;
        height: unit(45 / @u, @uu);
        line-height: unit(45 / @u, @uu);
        text-align: left;
      }
    }
  }
}
</style>