<template>
    <!--
        searchObj:{
            placeholder:"请输入项目名称关键字",   输入框提示
            url:"/api/projects/getProjectListByStatus",    接口提示
            name:"projectName",   下拉显示字段
            obj:{}   接口传参
        },
     -->
    <div class="searchInp">
        <el-autocomplete
            v-model="searchObj.input"
            :fetch-suggestions="querySearchAsync"
            :placeholder="searchObj.holder"
            value-key="smartInfo"
            @keyup.enter.native="handleKeyEnter"
            @mouseenter.native="selectTooltip"
            @select="handleSelect">
        </el-autocomplete>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props:["searchObj"],
    data() {
      return {
        searchVal:""
      }
    },
    methods:{
        querySearchAsync(queryString,callback){
            var _this=this,dataObj={showLoading:false};
            // projectName 项目名称   createUser 申请人    responsible 部门    groupName 承做机构
            if(queryString==""){
                return callback([])
            }
            if(this.searchObj.key==="projectName"){
                this.searchObj.formData.showLoading=false;
                this.searchObj.formData[this.searchObj.key]=queryString;
                this.$http.post(this.searchObj.url, this.searchObj.formData).then(response => {
                    var data=response.data.map(function(item){
                        return {"smartInfo":item.projectName,"id":item.projectId || item.pId || item.id};
                    })
                    callback(data)
                }).catch(function(error) {
                    _this.$messageError(error);
                })
                // this.$http.post("/api/projects/getProjectListByStatus", dataObj).then(response => {
                //     var data=response.data.map(function(item){
                //         return {"smartInfo":item.projectName,"id":item.id};
                //     })
                //     callback(data)
                // }).catch(function(error) {
                //     _this.$messageError(error);
                // })
            }else{
                dataObj[this.searchObj.key]=queryString;
                this.$http.post("/api/project/smartTips", dataObj).then(response => {
                    callback(response.data)
                }).catch(function(error) {
                    _this.$messageError(error);
                })
            }
        },
        // 选中下拉项后进入项目
        handleSelect(item){
            if(this.searchObj.key==="projectName"){
                this.$store.state.projectId = item.id;
                this.$setCookie('projectId', item.id, 24 * 60 * 60);
                this.$router.push({
                    path: '/zlpg/project/projectCont'
                })
            }
        //   this.$store.state.lookInto(item.smartInfo);
            // this.$emit("selectVal",item.smartInfo)
        },
        // 回车键进行搜索
        handleKeyEnter(){
          this.$store.state.searchInfo();
        },
        //Tooltip
        selectTooltip(){
          $('.el-autocomplete-suggestion__list').on('mouseenter',"li",function(){
            this.title = this.innerText;
          })
        },

    },
    watch:{
        "searchObj.input"(newD,oldD){
            this.$emit("selectVal",newD,this.searchObj.name)
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.searchInp{
    position: relative;
}
</style>

