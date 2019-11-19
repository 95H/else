<template>
<div>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
      <img :src="slide" alt=""></swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</div>
</template>

<script>
  export default {
    name: 'carrousel',
    props:['swiperSlides'],
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          }
        },
        // swiperSlides: [1, 2, 3, 4, 5]
      }
    }

  }
</script>
<style scoped lang="scss">
  .swiper-slide{
    height: 200px;
    border: 1px solid violet;
    box-sizing: border-box;
    img{
      width: 100%;
      height: 100%;
    }
  }
</style>
