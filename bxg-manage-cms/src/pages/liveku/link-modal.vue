<template>
     <Modal
        v-model="modal"
        class-name="vertical-center-modal"
        :mask-closable="false" 
        @on-ok="asyncOK"  
         @on-cancel="cancel">
         <h3 slot="header" style="color:#f60;">
           直播间名称：{{title}}
        </h3>
            <Row>
                <Col span="24" style="margin-bottom:20px;">
                    <span>讲师端：</span> <Input id="teacherLoginUrl" disabled :value="linkData.teacherLoginUrl" style="width:260px"></Input>
                    <Button 
                    class="tag-read" type="primary" 
                    data-clipboard-target="#teacherLoginUrl"  
                    @click="copyFn">复制链接</Button>
                    <Button type="primary" @click="openLink(linkData.teacherLoginUrl)">打开链接</Button>
                </Col>
            </Row>
                <Row>
                <Col span="24" style="margin-bottom:20px;">
                    <span>助教端：</span> <Input id="assistantLoginUrl" disabled :value="linkData.assistantLoginUrl" style="width:260px"></Input>
                    <Button 
                    class="tag-read" type="primary" 
                    data-clipboard-target="#assistantLoginUrl"  
                    @click="copyFn">复制链接</Button>
                    <Button type="primary" @click="openLink(linkData.assistantLoginUrl)">打开链接</Button>
                </Col>
            </Row>
            <Row>
                <Col span="24" style="margin-bottom:20px;">
                      <span>分享端：</span> <Input id="viewUrl" disabled :value="linkData.liveRoomUrl" style="width:260px"></Input>
                     <Button 
                    class="tag-read" type="primary" 
                    data-clipboard-target="#viewUrl"  
                    @click="copyFn">复制链接</Button>
                    <Button type="primary" @click="openLink(linkData.liveRoomUrl)">打开链接</Button>
                </Col>
            </Row>
            <Card style="width:100%" class="zbjinfo">
                <h4 slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    直播间信息
                </h4>
                <p>讲师密码:{{linkData.teacherPassword}}</p>
                <p>助教密码:{{linkData.assistantPassword}}</p>
                <p>观看密码:{{linkData.viewPassword}}</p>
            </Card>
             <p style="color:red">注：还未设置权限，打开链接后，可能会无学员</p>
     </Modal>
</template>

<script>
import api from "@/api/index";
export default {
  data() {
    return {
      modal: this.isLinkFlag,
      loading: true,
      linkData: {},
      title: ""
    };
  },
  props: {
    isLinkFlag: Boolean,
    liveId: Number
  },
  methods: {
    copyFn() {
      var clipboard = new this.Clipboard(".tag-read");
      clipboard.on("success", e => {
        this.$Message.success("复制成功");
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        this.$Message.error("复制失败，可能浏览器不支持");
        // 释放内存
        clipboard.destroy();
      });
    },
    openLink(url) {
      window.open(url);
    },
    asyncOK() {},
    cancel() {},
    async fetchRooms(liveId, title) {
      let result = await api.getRooms({
        liveId: liveId
      });
      this.linkData = result;
      this.title = title;
    }
  },
  watch: {
    isLinkFlag(val) {
      this.modal = val;
    },
    modal(val) {
      this.$emit("update:isLinkFlag", val);
    }
  }
};
</script>

<style lang="less">
.zbjinfo {
  p {
    line-height: 1.5;
    margin: 10px 0;
  }
}
</style>
