<template>
  <div class="shareImgBody" id="shareImgBody">
    <div class="shareWrap" v-if="list!=''">
      <div class="shareImg" id="shareImg">
        <img :src="list.posterUrl" id="myImg">
      </div>
      <div class="shareBottom" id="shareBottom">
        <div class="topText" v-if="list.showStatus==1">
          <p>长按保存邀请卡为图片，邀请好友购买课程</p>
          <p>
            您将获得
            <span>￥{{list.bonus}}</span>的奖励金
          </p>
          <p class="explain">*本活动最终解释权归博学谷所有</p>
        </div>
      </div>
    </div>
    <div class="shareWrap" v-show="list==''">
      <emptyTemp imgUrl="/web/images/defaultImg/courseEmpty.png" style="position:absolute;top:0;"></emptyTemp>
    </div>
  </div>
</template>
<style lang="less">
@import "shareImg.less";
html,
body {
  background-color: #f5f5f5 !important;
  overflow: auto;
  background: url(/web/images/myBursary/imgBg.png) no-repeat center center;
  background-size: contain;
}
/*分享图片自适应*/
@media screen and (max-height: 480px) {
  .shareImgBody {
    .shareImg {
      width: unit(308 / @u, @uu);
      height: unit(547 / @u, @uu);
    }
  }
}
@media (min-height: 481px) and (max-height: 568px) {
  .shareImgBody {
    .shareImg {
      width: unit(409 / @u, @uu);
      height: unit(727 / @u, @uu);
    }
  }
}
@media (min-height: 569px) and (max-height: 667px) {
  .shareImgBody {
    .shareImg {
      width: unit(479 / @u, @uu);
      height: unit(852 / @u, @uu);
    }
  }
}
@media (min-height: 668px) and (max-height: 736px) {
  .shareImgBody {
    .shareImg {
      width: unit(529 / @u, @uu);
      height: unit(914 / @u, @uu);
    }
  }
}
@media (min-height: 737px) and (max-height: 812px) {
  .shareImgBody {
    .shareImg {
      width: unit(563 / @u, @uu);
      height: unit(1002 / @u, @uu);
    }
  }
}
@media (min-height: 813px) {
  .shareImgBody {
    .shareImg {
      width: unit(750 / @u, @uu);
      height: unit(1334 / @u, @uu);
    }
  }
}
.shareImgBody {
  width: 100%;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
  .shareImg {
    margin: 0 auto;
    img {
      width: 100%;
      -webkit-touch-callout: default;
    }
  }
  .shareBottom {
    width: 100%;
    background-color: #fff;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    .topText {
      padding-top: unit(42 / @u, @uu);
      text-align: center;
      p {
        color: #333;
        font-size: unit(30 / @u, @uu);
        line-height: unit(40 / @u, @uu);
        span {
          color: #ff544c;
          font-size: unit(36 / @u, @uu);
        }
        &:nth-child(2) {
          margin-bottom: unit(40 / @u, @uu);
        }
      }
      .explain {
        text-align: center;
        width: 90%;
        height: unit(85 / @u, @uu);
        line-height: unit(85 / @u, @uu);
        margin: 0 auto;
        border-top: unit(1 / @u, @uu) solid #e7e7e7;
        font-size: unit(26 / @u, @uu);
        line-height: unit(26 / @u, @uu);
        padding: unit(30 / @u, @uu) 0px;
        color: #999;
      }
    }
  }
}
</style>
<script>
import axios from "axios";
import { appBaseUrl } from "~/api/apiurl";
import { Toast, MessageBox, Loadmore, Indicator } from "mint-ui";
import { zhugeTrack, getCookie, wxShare, shareInfo } from "~/plugins/filter";
export default {
  name: "shareImg",
  head: {
    title: "",
    meta: [
      {
        name: "description",
        content:
          "博学谷云课堂为传智播客旗下在线教育品牌，将积累10年的实体班线下课程和教学方法引到线上。课程大纲全新优化，内容有广度、有深度，顶尖讲师全程直播授课。专注整合传智优势教学资源、打造适合在线学习并能保证教学结果的优质教学产品，同时打造和运营一整套教育生态软件体系，为用户提供满足自身成长和发展要求的有效服务。"
      }
    ]
  },
  data() {
    return {
      list: {},
      zhugeTrack: zhugeTrack,
      courseName: "",
      dec: ""
    };
  },
  mounted() {
    var shareUrl = window.location.href.split("#")[0];
    wxShare(shareUrl);
    Indicator.open();
    var data = {
      code: this.$route.query.code || "",
      courseId: this.$route.query.courseId,
      userId: this.$route.query.userId,
      sign: localStorage.getItem("sign") || ""
    };
    axios({
      url: appBaseUrl + "/bxg/distribution/getCourseShareInfo",
      method: "POST",
      params: data
    }).then(res => {
      Indicator.close();
      if (res.data.status == 200) {
        this.list = res.data.result;
        this.courseName = res.data.result.courseName;
        this.dec = res.data.result.courseDescription;
        if (getCookie("_uc_t_")) {
          var uId = getCookie("_uc_t_").split(";")[0];
          if (this.list.courseType == 0) {
            zhugeTrack("H5_进入生成邀请卡页", {
              课程类型: "就业课",
              课程id: this.list.courseId,
              课程名称: this.list.courseName,
              邀请人uid: uId
            });
          } else {
            zhugeTrack("H5_进入生成邀请卡页", {
              课程类型: "微课",
              课程id: this.list.courseId,
              课程名称: this.list.courseName,
              邀请人uid: uId
            });
          }
        }
        if (res.data.result.bonus != null) {
          document.title = "长按保存图片";
        } else {
          document.title = "推荐你一起学习";
        }
        this.$nextTick(function() {
          this.INVITE();
        });
        var _this = this;
        var nickName = "";
        if (localStorage.getItem("disAuthName")) {
          nickName = localStorage.getItem("disAuthName")
            ? localStorage.getItem("disAuthName")
            : "";
        } else {
          nickName = localStorage.getItem("nickName")
            ? localStorage.getItem("nickName")
            : "";
        }
        var obj = {
          title: nickName + "推荐你学习" + "《" + _this.courseName + "》", // 分享标题
          desc: _this.dec, // 分享描述
          link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: document.location.origin + "/web/images/defaultImg/share.png", // 分享图标
          fail: function(res) {
            alert(JSON.stringify(res));
          }
        };
        shareInfo(obj);
      } else {
      }
    });
  },
  methods: {
    INVITE: function() {
      document.getElementById("__nuxt").style.height = "100%";
      let clientH = window.innerHeight;
      let clientW = window.innerWidth;
      let imgH = document.getElementById("shareImg");
      if (this.list.showStatus == 1) {
        let bottomH = document.getElementsByClassName("shareBottom")[0]
          .offsetHeight;
        let emptyDivH = clientH - imgH.offsetHeight - bottomH;
        imgH.style.marginTop = emptyDivH / 2 + "px";
        if (emptyDivH <= 0) {
          imgH.style.marginTop = "0px";
        } else {
          imgH.style.marginTop = emptyDivH / 2 + "px";
        }
      } else {
        let imgWarp = document.getElementById("shareImgBody");
        imgH.style.height = "auto";
        imgH.style.width = clientW + "px";
        imgH.style.padding = "0px";
        imgWarp.style.overflow = "auto";
      }
    }
  }
};
</script>
