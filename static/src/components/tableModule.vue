<template>
  <div class="tableModule">
    <div class="zlpg-content">
      <div class="zlpg-content-header">
        <i class="iconfont icon-renwuxiangqing"></i> 自定义关联
        <a href="javascript:;" class="header-btn search-btn" @click="confirmFun">确认关联</a>
      </div>
      <div class="asset-based-box">
        <asset-based :customDisplay="customDisplay"></asset-based>
      </div>
    </div>
  </div>
</template>
<script>
import assetBased from "@/page/fullPageModule/assetBased";
export default {
  data() {
    return {
      customDisplay: {
        investorId: this.$store.state.investorId,
        projectId: this.$store.state.projectId,
        disabled: true, //是否可编辑   true不能编辑  false能编辑   默认可编辑
        disoperation: true, //是否可操作   true不能操作  false能操作   默认可操作
        checkedBG: true, //表格有选中色块   true有选中色块   false无选中色块   默认无选中色块
        tableHeight: window.screen.availHeight - 140, //表格高度
        selectName: this.$store.state.dataObj.tabName || "资产负债表" //选中table页
      }
    };
  },
  mounted() {},
  components: { assetBased },
  methods: {
    // tab切换类型【备用，当前只有资产基础法】
    // filterTabSatus(val){
    //   switch(val){
    //     case '':
    //       return '1'
    //       break;
    //     case '':
    //       return '2'
    //       break;
    //     case '':
    //       return '3'
    //       break;
    //     case '':
    //       return '4'
    //       break;
    //     case '':
    //       return '5'
    //       break;
    //   }
    // },
    // 确认关联按钮方法
    confirmFun() {
      if(this.$store.state.CheckedTable && this.$store.state.CheckedTable.val != ''){
        let tabId = this.$store.state.CheckedTable.tableName,   //sheet页签名称
            /* 选中值的id【通过计算得来的】
              计算方式：a + md5(项目id+投资单位id+tab切换类型+sheet标签+横向坐标+竖向坐标+当前时间的毫秒数【防止同一段落中存在两个相同的值】)
              tab切换类型：1项目信息，2资产占有方，3资产基础法，4收益法，5市场法
            */
            id = 'a' + hex_md5(this.$store.state.projectId + this.$store.state.investorId + '3' + tabId + this.$store.state.CheckedTable.id + this.$store.state.CheckedTable.key + new Date().getTime()),
            type = "3";  //数据来源，【当前为默认资产基础法，具体值由前端自己定义，与openRelationDetail中的过滤器相同即可】

        this.$http.post("/api/reportRelation/customAssociation",{
          oldUniqueId : this.$store.state.dataObj.id,   //原始Id
          newUniqueId : id,   //新id
          sign : this.$store.state.Relationsign,    //章节id
          projectId : this.$store.state.projectId,
          investorId : this.$store.state.investorId,
          type : this.$store.state.CheckedTable.type,     //  1项目信息，2资产占有方信息，3资产占有方，4收益法，5市场法
          sheet : tabId,   //sheet页签名称
          transverse : this.$store.state.CheckedTable.id,    //选中数据的横坐标.
          vertical : this.$store.state.CheckedTable.key,    //选中数据的纵坐标
          value : this.$store.state.CheckedTable.val,    //选中的值
          reportId : this.$store.state.reportId,    //报告说明目录Id
        }).then(res => {
          if(this.$store.state.dataObj.id){
            this.$store.state.changeRelationFun(this.$store.state.dataObj.id,id,tabId,type,this.$store.state.CheckedTable.val);
          }else{
            this.$store.state.insertRelationFun('<span_'+id+' contenteditable="false" class="blankSpaceC"><danger tabId="'+ tabId +'" id="'+ id +'" type="'+ type +'">'+this.$store.state.CheckedTable.val+'</danger></span_'+id+'>');
          }
          this.$store.commit('changeShowCommon');
          this.$store.state.CheckedTable = null;
        }).catch(err => {
          this.$messageError(err);
        })
      }else{
        this.$messageError("未选择关联的数据或选择的数据为空");
      }
    }
  }
};
</script>
<style scoped="scoped" lang="scss">
.tableModule {
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  .zlpg-content {
    height: 100%;
    border: 1px solid #ECECEC;
    .zlpg-content-header {
      background: #fafafa;
      border-radius: 2px 2px 0px 0px;
      border: 1px solid rgba(236, 236, 236, 1);
      border-top: none;
      height: 35px;
      line-height: 35px;
      padding-left: 15px;
      box-sizing: border-box;
      .icon-renwuxiangqing {
        color: #f7b543;
      }
      .header-btn {
        float: right;
        margin-right: 10px !important;
        margin-top: 4px;
      }
    }
    .asset-based-box {
      // height: 100%;
      position:absolute;
      left:10px; top:45px; bottom:0; right:10px;
      box-sizing: border-box;
      border-radius: 2px;
    }
  }
}
</style>

