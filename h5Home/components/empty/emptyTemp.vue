<template>
  <div class="emptyData">
  	<div class="imgWarp">
	  	<img v-if="imgUrl==undefined" src='/web/images/defaultImg/courseEmpty.png' alt=''/>
	    <img v-else :src='imgUrl' alt=''/>
	    <p v-if="desc">{{desc}}</p>
	    <p v-if="description_link">{{description_link}}，<a href="/share/shareList">马上邀请</a></p>
	    <p v-if="!description_link && !desc">暂无数据</p>
  	</div>
  </div>
</template>

<script>
    export default {
        name: 'empty',
        props:['imgUrl','desc','description_link']
    }
</script>

<style>

</style>
