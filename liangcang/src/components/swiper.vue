<template>
  <div class="box">
     <mt-swipe :auto="4000">
     <mt-swipe-item v-for="item in ImgUrl" :key="item">
       <img :src="item.imgUrl" alt="">
     </mt-swipe-item>

</mt-swipe>
  </div>
</template>
<script>
import { Swipe, SwipeItem } from 'mint-ui';
export default {
  name:'',
  data() {
    return {

    }
  },
  created(){

  },
  props:{
    ImgUrl:{
      type: Array
    }
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.box{
  width:10rem;
  height:5.066667rem;
    img{
        width: 100%;
        height: 100%;
      }
}
</style>
