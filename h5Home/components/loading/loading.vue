<template>
	<div class="loading_container" v-if="loading">
		<img src="../../static/web/images/common/loading.svg">	
	</div>
</template>
<style lang="less">
	@import "../../static/css/variable.less";
	.loading_container {
	    position: fixed;
	    top: 40%;
	    left: 50%;
	    z-index: 9999;
	    width: 54px;
	    height: 54px;
	    margin: -27px 0 0 -27px;
	    border-radius: 3px;
	    background-color: rgba(0, 0, 0, .6);
	    text-align: center;
	    img{
	    	display: inline-block;
    		margin: 8px 0;
	    }
	}
</style>
<script>
 export default {
 	 data: () => ({
	    loading: false
	  }),
	  methods: {
	    start () {
	      this.loading = true
	    },
	    finish () {
	      this.loading = false
	    }
	  }
 }
</script>