<template>
<div class="workingHoursList zlpg-home">
	<div class="zlpg-content">
		<div class="zlpg-content-header">
			<ul class="list-group">
				<li v-for="(item,key) in routerLink" :key="key"><router-link :to="'/zlpg'+item.jump">{{item.title}}</router-link></li>
			</ul>
		</div>
	</div>
	<div class="zlpg-home-content">
		<router-view></router-view>
	</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      routerLink: [],
    };
  },
  created() {
    this.$store.state.queryUserSysFunction.forEach((val, key) => {
      if (val.title == "工时") {
        this.routerLink = val.list;
      }
    });
  },
  methods: {
    
  },
  components: {}
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
/deep/ a:hover {
  display: block;
  color: #145fd2;
}
.zlpg-home {height: 100%;flex-direction:column;display: -webkit-flex;display: flex;
  .zlpg-home-header {
    width: 100%;
    height: 35px;
    .list-group {
      line-height: 34px;
      border: 1px solid #ececec;
      overflow: hidden;
      background: #fff;
      li {
        float: left;
        margin-left: 30px;
      }
      .list-right {
        float: right;
        cursor: pointer;
        height: 27px;
        background: rgba(58, 128, 236, 1);
        border-radius: 2px;
        line-height: 27px;
        font-size: 13px;
        color: rgba(255, 255, 255, 1);
        text-align: right;
        padding: 0 5px;
        margin-top: 4px;
        margin-right: 5px;
      }
    }
  }
  .zlpg-home-content {
  	flex: 1;
  	-ms-flex:1 0 auto;
    .search-btn,
    .reset-btn {
      padding: 0;
      width: 70px;
      height: 25px;
      border-radius: 2px;
      font-size: 13px;
      font-weight: 400;
      cursor: pointer;
    }
    .p20 {
      padding: 0 20px;
    }
    .btnFr {
      float: right;
    }
    /deep/ .ipt-wrap {
      height: 25px;
    }
    .displayIbP {
      padding-top: 10px;
      padding-bottom: 10px;
      > * {
        display: inline-block;
      }
    }
    /deep/ .workHoursTime {
      vertical-align: top;
    }
    /* 头部 */
    .container {
      background: #fff;
    }
    .workingHoursList-table {
      margin-top: 10px;
    }
  }
}
</style>
