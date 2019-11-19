<template>
  <div class="container">
    <div class="nav-container zlpg-content">
      <!-- <nav-list :navoptions="pageOptions.tabOptions">
        <div slot="navName">
          <span class="titleName">项目管理</span>
        </div>
      </nav-list> -->
      <div class="zlpg-content-header">
          <ul class="list-group">
              <li><span class="titleName">项目管理</span></li>
              <li v-for="(item,index) in glMenu" :key="index"><router-link :to="'/zlpg' + item.functionUrl">{{item.functionName}}</router-link></li>
          </ul>
      </div>
      <!-- <ul class="list-group-item padding020">
				<li><span class="titleName">项目管理</span></li>
				<el-tabs v-model="activeName">
					<el-tab-pane v-for="(item,index) in glMenu" :label="item.functionName" :name="index" :key="index">
						<projectmessage v-if="refresh && activeName==index && refreshT"></projectmessage>
					</el-tab-pane>
				</el-tabs>
			</ul> -->
      <span class="search-btn submit" v-if="$store.state.showSubmit && /projectProjectReportNumber/.test($route.path)" @click="submitNumber">提交</span>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        pageOptions: {
          tabOptions: [
            {label: '审核签发分配管理', href: 'projectProjectAuditing', name: 'first'},
            {label: '报告号分配管理', href: 'projectProjectReportNumber', name: 'first'},
            {label: '报告盖章管理', href: 'projectProjectSeal', name: 'first'}
          ]
        },
        glMenu : this.$store.state.projectMenu.child[localStorage.getItem('index')].children
      }
    },
    created(){

    },
    methods: {
      submitData() {
        console.log(this.dataSource);
      },

      submitNumber(){
        this.$store.state.SubmitReportNumber();
      }
    }
  }
</script>
<style lang="scss" scoped>
  .container{border:1px solid rgba(236,236,236,1);}
  .nav-container{
    display:flex;
    height:35px;
    line-height: 35px;
    background:rgba(250,250,250,1);
    position: relative;
    .submit{position: absolute; right:20px; top:5px;}
    .list-group{
        li:first-child>span{position: relative;}
        li:first-child>span:after{content:"";position: absolute;right: -14px;top: -1px;height: 20px;width: 2px;background: #C8C8C8;}
        li:nth-child(2){margin-left:30px;}
    }
  }
  .nav-list-container{padding:0 0 0 20px!important;}
  .titleName{font-size:13px; font-weight:400; color:rgba(38,38,40,1);}
  .submintBtn{
    position: absolute;
    right: 0;
    top: -2px;
  }

  /deep/ .zlpg-content .zlpg-content-header .list-group{
    border:none !important;
  }
</style>


